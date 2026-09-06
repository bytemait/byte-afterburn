import fs from 'node:fs';

let html = fs.readFileSync('reference/portx/rendered/_.html', 'utf8');

// 1. Asset path routing
html = html.replaceAll('https://framerusercontent.com/assets/', '/byte-assets/framerusercontent.com/assets/');
html = html.replaceAll('https://framerusercontent.com/modules/', '/byte-assets/framerusercontent.com/modules/');
html = html.replaceAll('https://framerusercontent.com/sites/', '/byte-assets/framerusercontent.com/sites/');
html = html.replaceAll('https://framerusercontent.com/third-party-assets/', '/byte-assets/framerusercontent.com/third-party-assets/');
html = html.replaceAll('https://app.framerstatic.com/', '/byte-assets/app.framerstatic.com/');

// Logo replacement
html = html.replace('https://framerusercontent.com/images/7DxEQJZyMH75MGHNGk6E7oWsws.svg', '/byte-assets/byte-logo.svg');

// 2. Global CSS reset to fix horizontal overflow
const framerGlobalStyles = `
<style is:global>
  html, body, #main {
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  *, *:before, *:after {
    box-sizing: border-box !important;
    -webkit-font-smoothing: inherit;
  }
  html {
    overflow-x: clip !important;
  }
  body {
    overflow-x: clip !important;
    position: relative !important;
    width: 100% !important;
    max-width: 100vw !important;
    min-height: 100vh;
    background: var(--token-66a26379-6d6b-499c-b756-de1c7c6934a8, rgb(17, 17, 17));
  }
  .framer-wjfetz-container,
  .framer-497eb2-container,
  .framer-r0gejm {
    display: none !important;
  }
</style>
`;
html = html.replace('<head>', `<head>\n${framerGlobalStyles}`);

// 3. Reorder Sections (swap Services and About)
// Original order: Services (sec3) -> Works (sec4) -> About (sec5) -> Facts (sec6)
// New order: About -> Works -> Services -> Facts
const s_sec_start = html.indexOf('<section class="framer-r0my2z" data-framer-name="Services-Section">');
const w_sec_start = html.indexOf('<section class="framer-irdoz6" data-framer-name="Works-Section">');
const a_sec_start = html.indexOf('<section class="framer-1pwcsen" data-framer-name="About-Section"');
const f_sec_start = html.indexOf('<section class="framer-1l1y4uy" data-framer-name="Facts-Section">');

const servicesBlock = html.slice(s_sec_start, w_sec_start);
const worksBlock = html.slice(w_sec_start, a_sec_start);
const aboutBlock = html.slice(a_sec_start, f_sec_start);

html = html.slice(0, s_sec_start) + aboutBlock + worksBlock + servicesBlock + html.slice(f_sec_start);

// 4. Update Section Headings & Text Content in HTML
html = html.replace('>WHO AM I</h6>', '>WHO ARE WE</h6>');
html = html.replace('>FEATURED WORKS</h6>', '>OUR ACHIEVEMENTS</h6>');
html = html.replace('>SERVICES</h6>', '>DEPARTMENTS</h6>');

// Update Department Items
html = html.replace('>BRANDING</h2>', '>DEVELOPMENT</h2>');
html = html.replace('>Logo Design</p>', '>Web & Mobile</p>');
html = html.replace('>Graphic</p>', '>Software Systems</p>');

html = html.replace('>UI/UX</h2>', '>AI/ML</h2>');
html = html.replace('>Web & App Design</p>', '>Machine Learning</p>');
html = html.replace('>UX Research</p>', '>Intelligent Systems</p>');

html = html.replace('>FRAMER</h2>', '>MECHATRONICS</h2>');
html = html.replace('>Web Development</p>', '>Robotics & Hardware</p>');

html = html.replace('>ANIMATION</h2>', '>CYBERSECURITY</h2>');
html = html.replace('>Motion Video</p>', '>Network Security</p>');
html = html.replace('>Interactive</p>', '>Infrastructure & Audits</p>');

// Add 5th Department: OUTREACH to HTML
const p4AnchorEnd = html.indexOf('CYBERSECURITY</h2></div></a><!--/$-->');
if (p4AnchorEnd !== -1) {
  const insertPos = p4AnchorEnd + 'CYBERSECURITY</h2></div></a><!--/$-->'.length;
  const p5Html = `<!--$--><a class="framer-c9wfz0 framer-fnoon7" data-framer-name="Point 5" href="./services/outreach" style="opacity: 1;"><div class="framer-1kjpvta" data-highlight="true" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><h2 class="framer-text framer-styles-preset-d6ofy9" data-styles-preset="kzUSIwReW" style="--framer-text-alignment:center">OUTREACH</h2></div><div class="framer-zku36l" data-framer-name="Text" style="opacity: 1;"><div class="framer-1cr6g4y" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5777202a-0ea6-448f-b785-3c665721a4a8, rgb(46, 46, 46)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-h0wt6i" data-styles-preset="ZCD3JCImn" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5777202a-0ea6-448f-b785-3c665721a4a8, rgb(46, 46, 46)))">Creative & Community</p></div></div></a><!--/$-->`;
  html = html.slice(0, insertPos) + p5Html + html.slice(insertPos);
}

// 5. Replace Portx with Byte across the entire HTML
html = html.replace(/PORTX/g, 'BYTE');
html = html.replace(/Portx/g, 'Byte');
html = html.replace(/portx/g, 'byte');

const astroPage = `---
// Render original Portx site at /new-landing
---
<!DOCTYPE html>
${html.replace('<!DOCTYPE html>', '')}
`;

fs.writeFileSync('src/pages/new-landing.astro', astroPage);
console.log('src/pages/new-landing.astro cleanly generated with hydration module active.');
