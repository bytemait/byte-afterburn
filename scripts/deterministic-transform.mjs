import fs from 'node:fs';
import path from 'node:path';

const augiPath = 'reference/portx/recovered-sources/framerusercontent.com/modules/qcl52zUWK6KE32UaGLKl/AkHBSp12Xf4bCNS0ZnZq/augiA20Il.js';
const xfPath = 'reference/portx/recovered-sources/framerusercontent.com/modules/cLb8ZVio14TUaNKkZ9y0/1lGKV0WQCuBnTEXqK5bz/xf5I4_Lbn.js';

let augiCode = fs.readFileSync(augiPath, 'utf8');
let xfCode = fs.readFileSync(xfPath, 'utf8');

// 1. In xf5I4_Lbn.js (Department card component)
// Clean text replacements
xfCode = xfCode.replaceAll('"BRANDING"', '"DEVELOPMENT"');
xfCode = xfCode.replaceAll('"Logo Design"', '"Web & Mobile"');
xfCode = xfCode.replaceAll('"Graphic"', '"Software Systems"');

xfCode = xfCode.replaceAll('"UI/UX"', '"AI/ML"');
xfCode = xfCode.replaceAll('"Web & App Design"', '"Machine Learning"');
xfCode = xfCode.replaceAll('"UX Research"', '"Intelligent Systems"');

xfCode = xfCode.replaceAll('"FRAMER"', '"MECHATRONICS"');
xfCode = xfCode.replaceAll('"Web Development"', '"Robotics & Hardware"');

xfCode = xfCode.replaceAll('"ANIMATION"', '"CYBERSECURITY"');
xfCode = xfCode.replaceAll('"Motion Video"', '"Network Security"');
xfCode = xfCode.replaceAll('"Interactive"', '"Infrastructure & Audits"');

// Duplicate Point 3 to create Point 5 (OUTREACH)
const p3Marker = 'pathVariables: { zuPXbKjY1: "framer" },';
const p4Marker = 'pathVariables: { zuPXbKjY1: "animation" },';

const p3Idx = xfCode.indexOf(p3Marker);
const p4Idx = xfCode.indexOf(p4Marker);
if (p3Idx === -1 || p4Idx === -1) throw new Error('Could not find Point 3/4 in xf5I4_Lbn.js');

const p3Start = xfCode.lastIndexOf('/*#__PURE__*/ _jsx(ResolveAnchor, {', p3Idx);
const p4Start = xfCode.lastIndexOf('/*#__PURE__*/ _jsx(ResolveAnchor, {', p4Idx);

const point3Block = xfCode.slice(p3Start, p4Start);
let point5Block = point3Block;
point5Block = point5Block.replaceAll('"Point 3"', '"Point 5"');
point5Block = point5Block.replaceAll('"MECHATRONICS"', '"OUTREACH"');
point5Block = point5Block.replaceAll('"Robotics & Hardware"', '"Creative & Community"');
point5Block = point5Block.replaceAll('O3Al_bcfz', 'O3Al_bcfz5');
point5Block = point5Block.replaceAll('uBz1EgfBw', 'uBz1EgfBw5');
point5Block = point5Block.replaceAll('yPV7BkiXa', 'yPV7BkiXa5');
point5Block = point5Block.replaceAll('KFvBDXiha', 'KFvBDXiha5');
point5Block = point5Block.replaceAll('"framer"', '"outreach"');

// Find Point 4 closing:
const p4CloseMarker = '              ],\n            }),\n            isDisplayed() &&';
const p4CloseIdx = xfCode.indexOf(p4CloseMarker, p4Start);
if (p4CloseIdx === -1) throw new Error('Could not find Point 4 closing in xf5I4_Lbn.js');

xfCode = xfCode.slice(0, p4CloseIdx) + '                ' + point5Block.trim() + ',\n' + xfCode.slice(p4CloseIdx);

const outDir = 'reference/portx/transformed';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'xf5I4_Lbn.js'), xfCode);
console.log('Transformed xf5I4_Lbn.js successfully.');

// 2. In augiA20Il.js (Main Home Page Component)
// Replace titles
augiCode = augiCode.replaceAll('cKc8R9lOZ: "WHO AM I"', 'cKc8R9lOZ: "WHO ARE WE"');
augiCode = augiCode.replaceAll('cKc8R9lOZ: "FEATURED WORKS"', 'cKc8R9lOZ: "OUR ACHIEVEMENTS"');
augiCode = augiCode.replaceAll('cKc8R9lOZ: "SERVICES"', 'cKc8R9lOZ: "DEPARTMENTS"');

// Reorder sections in augiA20Il.js:
// Services: line 1002 to line 1082
// Works: line 1083 to line 2353
// About: line 2354 to line 2718
const sMarker = '"data-framer-name": "Services-Section",';
const wMarker = '"data-framer-name": "Works-Section",';
const aMarker = '"data-framer-name": "About-Section",';
const fMarker = '"data-framer-name": "Facts-Section",';

const sStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx(motion.section, {', augiCode.indexOf(sMarker));
const wStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx(motion.section, {', augiCode.indexOf(wMarker));
const aStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx(motion.section, {', augiCode.indexOf(aMarker));
const fStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsxs(motion.section, {', augiCode.indexOf(fMarker));

const sBlock = augiCode.slice(sStart, wStart);
const wBlock = augiCode.slice(wStart, aStart);
const aBlock = augiCode.slice(aStart, fStart);

// New order: About -> Works -> Services -> Facts
augiCode = augiCode.slice(0, sStart) + aBlock + wBlock + sBlock + augiCode.slice(fStart);

// Remove HIRE US button
const hireMarker = 'nodeId: "uJE65IbOL",';
const hireIdx = augiCode.indexOf(hireMarker);
if (hireIdx !== -1) {
  const hireBlockStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx("div", {\n                    className: "framer-r0gejm",', hireIdx);
  const hireBlockEnd = augiCode.indexOf('}),\n              ],', hireIdx);
  if (hireBlockStart !== -1 && hireBlockEnd !== -1) {
    augiCode = augiCode.slice(0, hireBlockStart) + augiCode.slice(hireBlockEnd + '}),'.length);
    console.log('Removed HIRE US button from augiA20Il.js');
  }
}

// Remove CV button
const cvMarker = 'OIgPjc99W: "DOWNLOAD CV/RESUME",';
const cvIdx = augiCode.indexOf(cvMarker);
if (cvIdx !== -1) {
  const cvStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx(ComponentViewportProvider, {\n                  height: 48,', cvIdx);
  const cvEnd = augiCode.indexOf('}),\n              ],', cvIdx);
  if (cvStart !== -1 && cvEnd !== -1) {
    augiCode = augiCode.slice(0, cvStart) + augiCode.slice(cvEnd + '}),'.length);
    console.log('Removed CV button from augiA20Il.js');
  }
}

// Remove Pricing section
const pricingMarker = '/*#__PURE__*/ _jsx(PricingSection, {';
const pricingIdx = augiCode.indexOf(pricingMarker);
if (pricingIdx !== -1) {
  const pStart = augiCode.lastIndexOf('/*#__PURE__*/ _jsx(ComponentViewportProvider, {\n              height: 1180,', pricingIdx);
  const pEnd = augiCode.indexOf('/*#__PURE__*/ _jsx(ComponentViewportProvider, {\n              height: 610,', pricingIdx);
  if (pStart !== -1 && pEnd !== -1) {
    augiCode = augiCode.slice(0, pStart) + augiCode.slice(pEnd);
    console.log('Removed PricingSection from augiA20Il.js');
  }
}

fs.writeFileSync(path.join(outDir, 'augiA20Il.js'), augiCode);
console.log('Transformed augiA20Il.js successfully.');
