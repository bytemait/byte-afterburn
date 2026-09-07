import fs from 'node:fs';

const pagePath = 'src/pages/new-landing.astro';
let page = fs.readFileSync(pagePath, 'utf8');

if (!page.startsWith('---')) throw new Error('Expected Astro frontmatter in new-landing.astro');
if (!page.includes("import Departments from '../components/Departments';")) {
  page = page.replace(/^---[\\s\\S]*?---/, `---\nimport Departments from '../components/Departments';\n---`);
}

const servicesStart = page.indexOf('<section class="framer-r0my2z" data-framer-name="Services-Section">');
const servicesEnd = page.indexOf('</section>', servicesStart) + '</section>'.length;
if (servicesStart === -1 || servicesEnd <= servicesStart) {
  throw new Error(`Could not find Services boundary: ${servicesStart}, ${servicesEnd}`);
}

const replacement = `<section class="byte-departments-shell" aria-labelledby="byte-departments-title">
  <div class="byte-departments-heading">
    <span aria-hidden="true">//</span>
    <h2 id="byte-departments-title">DEPARTMENTS</h2>
    <span aria-hidden="true">//</span>
  </div>
  <Departments client:load />
</section>
<style is:global>
  .byte-departments-shell {
    width: 100%;
    overflow: hidden;
    background: transparent;
  }
  .byte-departments-heading {
    width: min(calc(100% - 144px), 1920px);
    margin: 0 auto;
    padding-top: 18px;
    border-top: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
  }
  .byte-departments-heading h2 {
    margin: 0;
    color: #fff;
    font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-transform: uppercase;
  }
  .byte-departments-heading span {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
  }
  @media (max-width: 1439px) {
    .byte-departments-heading { width: calc(100% - 80px); }
  }
  @media (max-width: 809px) {
    .byte-departments-heading { width: calc(100% - 40px); }
    .byte-departments-heading h2 { font-size: 16px; line-height: 20px; }
  }
</style>`;

page = page.slice(0, servicesStart) + replacement + page.slice(servicesEnd);
page = page.replace(/<script type="module" async="" data-framer-bundle="main"[^>]*><\/script>/, '');
fs.writeFileSync(pagePath, page, 'utf8');
console.log('Embedded Departments React component into /new-landing.');
