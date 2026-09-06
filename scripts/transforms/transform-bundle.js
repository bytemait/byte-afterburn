export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function getStringVal(node) {
    if (!node) return null;
    if (node.type === 'Literal' || node.type === 'StringLiteral') return node.value;
    if (node.type === 'TemplateLiteral') return node.quasis?.[0]?.value?.raw || null;
    return null;
  }

  function getFramerName(node) {
    if (!node || node.type !== 'CallExpression') return null;
    const propsArg = node.arguments[1];
    if (!propsArg || propsArg.type !== 'ObjectExpression') return null;
    for (const prop of propsArg.properties) {
      const keyName = prop.key?.name || prop.key?.value;
      if (keyName === 'data-framer-name') {
        return getStringVal(prop.value);
      }
    }
    return null;
  }

  // 1. Reorder sections in main children array
  root.find(j.ArrayExpression).forEach(path => {
    const elements = path.node.elements;
    if (!elements || elements.length < 8) return;

    let sIdx = -1, wIdx = -1, aIdx = -1;

    elements.forEach((el, idx) => {
      const name = getFramerName(el);
      if (name === 'Services-Section') sIdx = idx;
      else if (name === 'Works-Section') wIdx = idx;
      else if (name === 'About-Section') aIdx = idx;
    });

    if (sIdx !== -1 && wIdx !== -1 && aIdx !== -1) {
      console.log(`[BUNDLE] Found sections at indices: Services=${sIdx}, Works=${wIdx}, About=${aIdx}`);
      const services = elements[sIdx];
      const works = elements[wIdx];
      const about = elements[aIdx];

      // New order: About, Works, Services
      elements[sIdx] = about;
      elements[wIdx] = works;
      elements[aIdx] = services;
      console.log('[BUNDLE] Swapped sections in AST ArrayExpression successfully!');
    }
  });

  // 2. Department Points in framer-g41w2 children array
  root.find(j.ArrayExpression).forEach(path => {
    const elements = path.node.elements;
    if (!elements || elements.length !== 4) return;

    let p3Idx = -1;
    let p4Idx = -1;

    elements.forEach((el, idx) => {
      if (!el) return;
      const src = j(el).toSource();
      if (src.includes('Point 3')) p3Idx = idx;
      if (src.includes('Point 4')) p4Idx = idx;
    });

    if (p3Idx !== -1 && p4Idx !== -1) {
      console.log(`[BUNDLE] Found Point 3 at ${p3Idx}, Point 4 at ${p4Idx}`);
      const p3Source = j(elements[p3Idx]).toSource();
      let p5Source = p3Source;
      p5Source = p5Source.replaceAll('Point 3', 'Point 5');
      p5Source = p5Source.replaceAll('FRAMER', 'OUTREACH');
      p5Source = p5Source.replaceAll('MECHATRONICS', 'OUTREACH');
      p5Source = p5Source.replaceAll('Web Development', 'Creative & Community');
      p5Source = p5Source.replaceAll('Robotics & Hardware', 'Creative & Community');
      p5Source = p5Source.replaceAll('O3Al_bcfz', 'O3Al_bcfz5');
      p5Source = p5Source.replaceAll('uBz1EgfBw', 'uBz1EgfBw5');
      p5Source = p5Source.replaceAll('yPV7BkiXa', 'yPV7BkiXa5');
      p5Source = p5Source.replaceAll('KFvBDXiha', 'KFvBDXiha5');
      p5Source = p5Source.replaceAll('zuPXbKjY1: `framer`', 'zuPXbKjY1: `outreach`');

      const p5Ast = j(p5Source).find(j.CallExpression).nodes()[0];
      if (p5Ast) {
        elements.push(p5Ast);
        console.log('[BUNDLE] Added Point 5 (OUTREACH) to AST ArrayExpression!');
      }
    }
  });

  // 3. Department literals and titles
  const mapping = {
    'WHO AM I': 'WHO ARE WE',
    'FEATURED WORKS': 'OUR ACHIEVEMENTS',
    'SERVICES': 'DEPARTMENTS',
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
    'Interactive': 'Infrastructure & Audits',
    'UI VISUAL DESIGNER AND FRAMER DEVELOPER': 'STUDENT INNOVATION & TECHNICAL SOCIETY',
    'I love creating captivating and functional interfaces that evoke emotions and establish a connection between the brand and the user.':
      'A community of curious minds, builders, designers, and innovators creating impactful technology.'
  };

  root.find(j.Literal).forEach(path => {
    if (mapping[path.node.value]) {
      path.node.value = mapping[path.node.value];
    }
  });

  root.find(j.TemplateElement).forEach(path => {
    const raw = path.node.value.raw;
    if (mapping[raw]) {
      path.node.value.raw = mapping[raw];
      path.node.value.cooked = mapping[raw];
    }
  });

  // 4. Remove HIRE US
  root.find(j.ObjectExpression).forEach(path => {
    const hasClass = path.node.properties.some(p => {
      const k = p.key?.name || p.key?.value;
      const v = getStringVal(p.value);
      return k === 'className' && v === 'framer-r0gejm';
    });
    if (hasClass) {
      const call = path.parent;
      if (call && call.node.type === 'CallExpression') {
        j(call).replaceWith(j.nullLiteral());
        console.log('[BUNDLE] Replaced HIRE US container with null');
      }
    }
  });

  // 5. Remove CV button
  root.find(j.ObjectExpression).forEach(path => {
    const hasId = path.node.properties.some(p => {
      const k = p.key?.name || p.key?.value;
      const v = getStringVal(p.value);
      return k === 'nodeId' && v === 'PdDHdt2oA';
    });
    if (hasId) {
      let current = path;
      while (current && current.node.type !== 'CallExpression') {
        current = current.parent;
      }
      if (current) {
        let parentCall = current.parent;
        while (parentCall && !(parentCall.node.type === 'CallExpression' && parentCall.node.arguments[0]?.name === 'J')) {
          parentCall = parentCall.parent;
        }
        if (parentCall) {
          j(parentCall).replaceWith(j.nullLiteral());
          console.log('[BUNDLE] Replaced CV ComponentViewportProvider (J) with null');
        }
      }
    }
  });

  // 6. Remove PricingSection
  root.find(j.ObjectExpression).forEach(path => {
    const hasId = path.node.properties.some(p => {
      const k = p.key?.name || p.key?.value;
      const v = getStringVal(p.value);
      return k === 'nodeId' && v === 'iXKKHXkJv';
    });
    if (hasId) {
      let current = path;
      while (current && !(current.node.type === 'CallExpression' && current.node.arguments[0]?.name === 'J')) {
        current = current.parent;
      }
      if (current) {
        j(current).replaceWith(j.nullLiteral());
        console.log('[BUNDLE] Replaced Pricing ComponentViewportProvider (J) with null');
      }
    }
  });

  return root.toSource();
}
