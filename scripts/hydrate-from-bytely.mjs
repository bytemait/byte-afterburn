#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const membersDir = join(root, 'src/content/members');
const BASE = process.env.BYTELY_BASE_URL ?? 'https://bytely.nyahost.in';

const APPLY = process.argv.includes('--apply');
const INCLUDE_DRAFTS = process.argv.includes('--include-drafts');

const env = loadEnv();
if (!env.email || !env.password) {
  console.error(
    'Missing credentials. Set BYTELY_ADMIN_EMAIL and BYTELY_ADMIN_PASSWORD\n' +
      '(or put them in a .env file at the repo root that is NOT committed).',
  );
  process.exit(1);
}

const cookie = await login(env.email, env.password);
const submissions = await fetchSubmissions(cookie);

const stats = submissions.reduce(
  (acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1;
    return acc;
  },
  {},
);
console.log(`bytely submissions by status: ${JSON.stringify(stats)}`);

const OVERRIDES = [{ name: 'yash', github: 'yashbhu', file: 'yash-bahuguna.md' }];

const index = indexMemberFiles();
const perFile = new Map();
const unmatched = [];
const candidates = [];
const ambiguous = [];

for (const submission of submissions) {
  const d = submission.data ?? {};
  if (!d.fullName || typeof d.fullName !== 'string' || !d.fullName.trim()) continue;
  if (submission.status === 'draft' && !INCLUDE_DRAFTS) continue;

  const slug = slugify(d.fullName);
  const matches = index.bySlug.get(slug) ?? [];
  if (matches.length === 0 && index.byName.has(fullNormalize(d.fullName))) {
    matches.push(...index.byName.get(fullNormalize(d.fullName)));
  }
  if (matches.length === 0) {
    const override = OVERRIDES.find(
      (o) => fullNormalize(o.name) === fullNormalize(d.fullName) && (d.githubUsername ?? '').toLowerCase() === o.github,
    );
    if (override) matches.push(override.file);
  }

  if (matches.length === 0) {
    const close = rankCandidates(d.fullName, index.allNames).slice(0, 3);
    if (close.length) candidates.push({ name: d.fullName, slug, status: submission.status, matches: close });
    else unmatched.push({ name: d.fullName, slug, status: submission.status });
    continue;
  }
  if (matches.length > 1) {
    ambiguous.push({ name: d.fullName, slug, files: matches });
    continue;
  }

  for (const file of matches) {
    const list = perFile.get(file) ?? [];
    list.push(submission);
    perFile.set(file, list);
  }
}

const STATUS_PRIORITY = { approved: 0, submitted: 1, review: 1, changes_requested: 2, archived: 3, draft: 4 };

function submissionScore(s) {
  const d = s.data ?? {};
  let score = 0;
  if (Array.isArray(d.experiences)) score += d.experiences.length * 2;
  if (Array.isArray(d.projects)) score += d.projects.length;
  if (Array.isArray(d.writing)) score += d.writing.length;
  if (Array.isArray(d.achievements)) score += d.achievements.length;
  if (d.linkedin) score += 1;
  if (d.githubUsername) score += 1;
  if (d.quickHighlights) score += 1;
  if (d.profilePhoto) score += 1;
  return score;
}

const proposed = [];
for (const [file, list] of perFile) {
  const chosen = [...list].sort((a, b) => {
    const score = submissionScore(b) - submissionScore(a);
    if (score !== 0) return score;
    const status = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (status !== 0) return status;
    return new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime();
  })[0];
  const diff = planUpdates(file, chosen.data ?? {}, chosen.status);
  if (diff.changes > 0) proposed.push(diff);
}

for (const diff of proposed) {
  console.log('\n' + diff.slug + `  [${diff.status}]`);
  console.log(`  career ${diff.career?.length ?? 0} entries`);
  console.log(`  publications ${diff.publications?.length ?? 0}`);
  console.log(`  contributions ${diff.contributions?.length ?? 0}`);
  console.log(`  awards ${diff.awards?.length ?? 0}`);
  if (diff.github) console.log(`  github ${diff.github}`);
  if (diff.linkedin) console.log(`  linkedin ${diff.linkedin}`);
  if (diff.portfolio) console.log(`  portfolio ${diff.portfolio}`);
  if (diff.quote) console.log(`  quote ${diff.quote}`);
}

if (unmatched.length) {
  console.log('\nNo member file and no candidates for these dossiers:');
  for (const u of unmatched) console.log(`  ${u.name}  (slug: ${u.slug}, ${u.status})`);
}

if (candidates.length) {
  console.log('\nPossible but fuzzy matches (name differs — confirm before hydrating):');
  for (const c of candidates) console.log(`  ${c.name} (${c.status}) ~> ${c.matches.map((m) => `${m.file} ("${m.name}")`).join(' | ')}`);
}

if (ambiguous.length) {
  console.log('\nAmbiguous slug, skipped (pick manually):');
  for (const a of ambiguous) console.log(`  ${a.name} -> ${a.slug} could be ${a.files.join(' or ')}`);
}

console.log(`\n${proposed.length} member(s) would be updated, ${unmatched.length} unmatched, ${candidates.length} fuzzy, ${ambiguous.length} ambiguous.`);
if (!APPLY) {
  console.log('Dry run only — re-run with --apply to write the files.');
  process.exit(0);
}

let written = 0;
for (const diff of proposed) {
  writeFileSync(join(membersDir, diff.file), render(diff));
  written++;
}
console.log(`Wrote ${written} file(s).`);

function loadEnv() {
  try {
    for (const line of readFileSync(join(root, '.env'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
    }
  } catch {}
  return {
    email: process.env.BYTELY_ADMIN_EMAIL,
    password: process.env.BYTELY_ADMIN_PASSWORD,
  };
}

async function login(email, password) {
  const res = await fetch(`${BASE}/api/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: HTTP ${res.status}`);
  }
  const setCookie = res.headers.get('set-cookie');
  const cookie = setCookie ? setCookie.split(';')[0] : '';
  if (!cookie) throw new Error('Login succeeded but no session cookie was set');
  return cookie;
}

async function fetchSubmissions(cookie) {
  const items = [];
  let page = 1;
  const limit = 100;
  for (;;) {
    const res = await fetch(`${BASE}/api/admin/submissions?limit=${limit}&page=${page}`, {
      headers: { cookie },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch submissions: HTTP ${res.status}`);
    }
    const body = await res.json();
    const batch = body.items ?? [];
    items.push(...batch);
    if (batch.length === 0 || items.length >= (body.total ?? items.length)) break;
    page++;
  }
  return items;
}

function indexMemberFiles() {
  const bySlug = new Map();
  const byName = new Map();
  const allNames = [];
  for (const file of readdirSync(membersDir)) {
    if (!file.endsWith('.md')) continue;
    const base = file.replace(/\.md$/, '');
    bySlug.set(base, [...(bySlug.get(base) ?? []), file]);
    const name = memberName(file);
    allNames.push({ file, name, normalized: fullNormalize(name) });
    if (name) byName.set(fullNormalize(name), [...(byName.get(fullNormalize(name)) ?? []), file]);
  }
  return { bySlug, byName, allNames };
}

function memberName(file) {
  try {
    const { frontmatter } = splitFrontmatter(file);
    const fm = yaml.load(frontmatter.join('\n'));
    return typeof fm?.name === 'string' ? fm.name.trim() : '';
  } catch {
    return '';
  }
}

function fullNormalize(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function rankCandidates(name, allNames) {
  const target = fullNormalize(name);
  const scored = allNames
    .map((m) => {
      let score = Infinity;
      const norm = m.normalized;
      if (target === norm) score = 0;
      else if (target.includes(norm) || norm.includes(target)) score = Math.abs(target.length - norm.length) + 1;
      else {
        const d = levenshtein(target, norm);
        const max = Math.max(target.length, norm.length);
        if (d <= Math.max(2, max / 4)) score = d;
      }
      return { ...m, score };
    })
    .filter((m) => m.score < Infinity)
    .sort((a, b) => a.score - b.score);
  return scored;
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function planUpdates(file, d, status) {
  const { frontmatter } = splitFrontmatter(file);
  const changes = { file, slug: file.replace(/\.md$/, ''), status, career: [], portfolio: undefined, portfolioReplace: false, linkedin: undefined, github: undefined, twitter: undefined, contributions: [], awards: [], quote: undefined, publications: [], changes: 0 };

  const career = (d.experiences ?? []).map((e) => {
    const org = typeof e.organization === 'string' ? e.organization.trim() : '';
    const title = typeof e.roleTitle === 'string' ? e.roleTitle.trim() : '';
    const period = joinPeriod(e.startDate, e.endDate);
    return { org, title, period };
  }).filter((e) => e.org || e.title);

  if (career.length && !hasKey(frontmatter, 'career')) {
    changes.career = career;
    changes.changes++;
  }

  const publications = (d.writing ?? [])
    .map((w) => {
      const title = typeof w.title === 'string' ? w.title.trim() : '';
      const venue = typeof w.format === 'string' ? w.format.trim() : '';
      const url = typeof w.url === 'string' && w.url.trim() ? toUrl(w.url.trim()) : undefined;
      return url || title ? { title: title || (url ?? ''), venue, url } : undefined;
    })
    .filter(Boolean);

  if (publications.length && !hasKey(frontmatter, 'publications')) {
    changes.publications = publications;
    changes.changes++;
  }

  const site = typeof d.website === 'string' ? d.website.trim() : '';
  const linkedinUrl =
    typeof d.linkedin === 'string' && d.linkedin.trim() ? toUrl(d.linkedin.trim()) : undefined;
  const githubUrl =
    typeof d.githubUsername === 'string' && d.githubUsername.trim()
      ? `https://github.com/${d.githubUsername.trim().replace(/^@/, '')}`
      : undefined;
  const professionalUrl = site ? toUrl(site) : linkedinUrl ?? githubUrl;

  const existingPortfolio = readKey(frontmatter, 'portfolio');
  if (professionalUrl && existingPortfolio === null) {
    changes.portfolio = professionalUrl;
    changes.changes++;
  } else if (professionalUrl && site && existingPortfolio !== professionalUrl) {
    changes.portfolio = professionalUrl;
    changes.portfolioReplace = true;
    changes.changes++;
  }

  const linkedin =
    typeof d.linkedin === 'string' && d.linkedin.trim() ? toUrl(d.linkedin.trim()) : undefined;
  if (linkedin && !hasKey(frontmatter, 'linkedin')) {
    changes.linkedin = linkedin;
    changes.changes++;
  }

  const github =
    typeof d.githubUsername === 'string' && d.githubUsername.trim()
      ? `https://github.com/${d.githubUsername.trim().replace(/^@/, '')}`
      : undefined;
  if (github && !hasKey(frontmatter, 'github')) {
    changes.github = github;
    changes.changes++;
  }

  const twitter = typeof d.twitter === 'string' && d.twitter.trim() ? toTwitterUrl(d.twitter.trim()) : undefined;
  if (twitter && !hasKey(frontmatter, 'twitter')) {
    changes.twitter = twitter;
    changes.changes++;
  }

  const contributions = (d.projects ?? [])
    .map((p) => {
      const title = typeof p.title === 'string' ? p.title.trim() : '';
      const description = typeof p.description === 'string' && p.description.trim() ? p.description.trim() : undefined;
      const raw = p.primaryUrl
        ? p.primaryUrl.trim()
        : Array.isArray(p.links)
          ? (p.links.find((l) => l && l.url)?.url ?? undefined)
          : undefined;
      let url;
      if (raw) {
        try {
          url = new URL(toUrl(raw)).href;
        } catch {
          url = undefined;
        }
      }
      return title ? { title, description, url: url ?? undefined } : undefined;
    })
    .filter(Boolean);

  if (contributions.length && !hasKey(frontmatter, 'contributions')) {
    changes.contributions = contributions;
    changes.changes++;
  }

  const awards = (d.achievements ?? [])
    .map((a) => {
      const title = typeof a.name === 'string' ? a.name.trim() : '';
      const date = typeof a.date === 'string' && a.date.trim() ? a.date.trim() : undefined;
      const detail =
        [a.prize, a.result]
          .filter((x) => typeof x === 'string' && x.trim())
          .map((x) => x.trim())
          .join(' \u00b7 ') || undefined;
      let url;
      if (typeof a.url === 'string' && a.url.trim()) {
        try {
          url = new URL(toUrl(a.url.trim())).href;
        } catch {
          url = undefined;
        }
      }
      return title ? { title, date, detail, url: url ?? undefined } : undefined;
    })
    .filter(Boolean);

  if (awards.length && !hasKey(frontmatter, 'awards')) {
    changes.awards = awards;
    changes.changes++;
  }

  if (typeof d.quickHighlights === 'string' && d.quickHighlights.trim() && !hasKey(frontmatter, 'quote')) {
    changes.quote = d.quickHighlights.trim();
    changes.changes++;
  }

  return changes;
}

function render(diff) {
  const { frontmatter, body } = splitFrontmatter(diff.file);
  const lines = ['---', ...frontmatter];

  if (diff.career.length && !hasKey(lines, 'career')) lines.push('', 'career:', ...dumpBlock(diff.career));
  if (diff.publications.length && !hasKey(lines, 'publications')) lines.push('', 'publications:', ...dumpBlock(diff.publications));
  if (diff.contributions.length && !hasKey(lines, 'contributions')) lines.push('', 'contributions:', ...dumpBlock(diff.contributions));
  if (diff.awards.length && !hasKey(lines, 'awards')) lines.push('', 'awards:', ...dumpBlock(diff.awards));
  if (diff.linkedin && !hasKey(lines, 'linkedin')) lines.push(`linkedin: ${JSON.stringify(diff.linkedin)}`);
  if (diff.github && !hasKey(lines, 'github')) lines.push(`github: ${JSON.stringify(diff.github)}`);
  if (diff.twitter && !hasKey(lines, 'twitter')) lines.push(`twitter: ${JSON.stringify(diff.twitter)}`);
  if (diff.portfolio) {
    const idx = lines.findIndex((line) => line.startsWith('portfolio:'));
    if (idx === -1) lines.push(`portfolio: ${JSON.stringify(diff.portfolio)}`);
    else if (diff.portfolioReplace) lines[idx] = `portfolio: ${JSON.stringify(diff.portfolio)}`;
  }
  if (diff.quote && !hasKey(lines, 'quote')) lines.push(`quote: ${JSON.stringify(diff.quote)}`);

  return ['---', ...lines.slice(1), '---', '', body].join('\n');
}

function splitFrontmatter(file) {
  const raw = readFileSync(join(membersDir, file), 'utf8');
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') {
    throw new Error(`No opening frontmatter delimiter in ${file}`);
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }
  if (end < 0) {
    throw new Error(`No closing frontmatter delimiter in ${file}`);
  }
  return {
    frontmatter: lines.slice(1, end),
    body: lines.slice(end + 1).join('\n').replace(/^\n+/, ''),
  };
}

function hasKey(frontmatter, key) {
  return frontmatter.some((line) => /^[A-Za-z0-9_.-]+:/.test(line) && line.startsWith(`${key}:`));
}

function readKey(frontmatter, key) {
  const line = frontmatter.find((l) => l.startsWith(`${key}:`));
  if (line === undefined) return null;
  return line
    .slice(line.indexOf(':') + 1)
    .trim()
    .replace(/^"(.*)"$/, '$1')
    .replace(/^'(.*)'$/, '$1');
}

function dumpBlock(value) {
  return yaml
    .dump(value, { lineWidth: -1 })
    .trimEnd()
    .split('\n')
    .map((line) => (line === '' ? line : `  ${line}`));
}

function joinPeriod(start, end) {
  const s = clean(start);
  const e = clean(end);
  if (!s && !e) return '';
  if (s && e) return `${s} \u2013 ${e}`;
  return s || e;
}

function clean(value) {
  const v = String(value ?? '').trim().replace(/^Pr3s?ent$/i, 'Present');
  return v;
}

function toUrl(value) {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function toTwitterUrl(value) {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://twitter.com/${v.replace(/^@/, '')}`;
}