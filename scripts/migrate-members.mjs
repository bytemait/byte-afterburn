import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'src/data/members.json'), 'utf8'));
const outDir = join(root, 'src/content/members');
mkdirSync(outDir, { recursive: true });

const entries = [];
const seen = new Set();

const push = (member, extras) => {
  if (seen.has(member.slug)) {
    throw new Error(`Duplicate member slug: ${member.slug}`);
  }
  seen.add(member.slug);
  entries.push({ ...member, ...extras });
};

data.members.forEach((member, index) => push(member, { status: 'core', order: index }));

Object.entries(data.departmentMembers).forEach(([group, list]) => {
  list.forEach((member, index) =>
    push(member, {
      status: 'department',
      group,
      order: index,
      photo: member.photo ?? data.memberAvatarPhotos[member.name],
    }),
  );
});

data.alumni2025.forEach((member, index) =>
  push(member, { status: 'alumni', group: 'alumni-2025', order: index, batch: member.year }),
);

data.alumni2024.forEach((member, index) =>
  push(member, { status: 'alumni', group: 'alumni-2024', order: index, batch: member.year }),
);

for (const member of entries) {
  const lines = ['---'];
  const str = (key, value) => lines.push(`${key}: ${JSON.stringify(value)}`);

  str('name', member.name);
  if (member.short) str('short', member.short);
  str('role', member.role);
  str('group', member.group);
  str('status', member.status);
  lines.push(`order: ${member.order}`);
  if (member.photo) str('photo', member.photo);
  if (member.quote) str('quote', member.quote);
  if (member.tier) str('tier', member.tier);
  if (member.batch) str('batch', member.batch);
  lines.push('---', '');

  writeFileSync(join(outDir, `${member.slug}.md`), lines.join('\n'));
}

console.log(`Wrote ${entries.length} member files to src/content/members`);
