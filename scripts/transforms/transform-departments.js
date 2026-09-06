export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // 1. Literal replacements
  const mapping = {
    'BRANDING': 'DEVELOPMENT',
    'Logo Design': 'Web & Mobile',
    'Graphic': 'Software Systems',
    'UI/UX': 'AI/ML',
    'Web & App Design': 'Machine Learning',
    'UX Research': 'Intelligent Systems',
    'FRAMER': 'MECHATRONICS',
    'Web Development': 'Robotics & Hardware',
    'ANIMATION': 'CYBERSECURITY',
    'Motion Video': 'Network Security',
    'Interactive': 'Infrastructure & Audits'
  };

  root.find(j.Literal).forEach(path => {
    if (mapping[path.node.value]) {
      path.node.value = mapping[path.node.value];
    }
  });

  // 2. Clone Point 3 to create Point 5 (OUTREACH) in the children array of Content
  root.find(j.ArrayExpression).forEach(path => {
    const elements = path.node.elements;
    if (!elements || elements.length !== 4) return;

    let p3Idx = -1;
    let p4Idx = -1;

    elements.forEach((el, idx) => {
      if (!el) return;
      const src = j(el).toSource();
      if (src.includes('"Point 3"')) p3Idx = idx;
      if (src.includes('"Point 4"')) p4Idx = idx;
    });

    if (p3Idx !== -1 && p4Idx !== -1) {
      console.log(`Found Point 3 at ${p3Idx}, Point 4 at ${p4Idx}`);
      const p3Source = j(elements[p3Idx]).toSource();
      let p5Source = p3Source;
      p5Source = p5Source.replaceAll('"Point 3"', '"Point 5"');
      p5Source = p5Source.replaceAll('"MECHATRONICS"', '"OUTREACH"');
      p5Source = p5Source.replaceAll('"Robotics & Hardware"', '"Creative & Community"');
      p5Source = p5Source.replaceAll('O3Al_bcfz', 'O3Al_bcfz5');
      p5Source = p5Source.replaceAll('uBz1EgfBw', 'uBz1EgfBw5');
      p5Source = p5Source.replaceAll('yPV7BkiXa', 'yPV7BkiXa5');
      p5Source = p5Source.replaceAll('KFvBDXiha', 'KFvBDXiha5');
      p5Source = p5Source.replaceAll('"framer"', '"outreach"');

      const p5Ast = j(p5Source).find(j.CallExpression).nodes()[0];
      if (p5Ast) {
        elements.push(p5Ast);
        console.log('Added Point 5 (OUTREACH) to AST ArrayExpression!');
      }
    }
  });

  return root.toSource();
}
