export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function getFramerName(node) {
    if (!node || node.type !== 'CallExpression') return null;
    const propsArg = node.arguments[1];
    if (!propsArg || propsArg.type !== 'ObjectExpression') return null;
    for (const prop of propsArg.properties) {
      if (prop.key && (prop.key.value === 'data-framer-name' || prop.key.name === 'data-framer-name')) {
        return prop.value.value;
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
      console.log(`Found sections at indices: Services=${sIdx}, Works=${wIdx}, About=${aIdx}`);
      const services = elements[sIdx];
      const works = elements[wIdx];
      const about = elements[aIdx];

      // New order: About, Works, Services
      elements[sIdx] = about;
      elements[wIdx] = works;
      elements[aIdx] = services;
      console.log('Swapped sections in AST ArrayExpression successfully!');
    }
  });

  // 2. Titles replacement
  root.find(j.Literal).forEach(path => {
    if (path.node.value === 'WHO AM I') path.node.value = 'WHO ARE WE';
    else if (path.node.value === 'FEATURED WORKS') path.node.value = 'OUR ACHIEVEMENTS';
    else if (path.node.value === 'SERVICES') path.node.value = 'DEPARTMENTS';
  });

  // 3. Remove HIRE US
  root.find(j.ObjectExpression).forEach(path => {
    const hasClass = path.node.properties.some(p =>
      p.key && (p.key.name === 'className' || p.key.value === 'className') &&
      p.value && p.value.value === 'framer-r0gejm'
    );
    if (hasClass) {
      const call = path.parent;
      if (call && call.node.type === 'CallExpression') {
        j(call).replaceWith(j.nullLiteral());
      }
    }
  });

  // 4. Remove CV button
  root.find(j.ObjectExpression).forEach(path => {
    const hasId = path.node.properties.some(p =>
      p.key && (p.key.name === 'nodeId' || p.key.value === 'nodeId') &&
      p.value && p.value.value === 'PdDHdt2oA'
    );
    if (hasId) {
      let current = path;
      while (current && current.node.type !== 'CallExpression') {
        current = current.parent;
      }
      if (current) {
        let parentCall = current.parent;
        while (parentCall && !(parentCall.node.type === 'CallExpression' && parentCall.node.arguments[0]?.name === 'ComponentViewportProvider')) {
          parentCall = parentCall.parent;
        }
        if (parentCall) {
          j(parentCall).replaceWith(j.nullLiteral());
        }
      }
    }
  });

  // 5. Remove PricingSection
  root.find(j.ObjectExpression).forEach(path => {
    const hasId = path.node.properties.some(p =>
      p.key && (p.key.name === 'nodeId' || p.key.value === 'nodeId') &&
      p.value && p.value.value === 'iXKKHXkJv'
    );
    if (hasId) {
      let current = path;
      while (current && !(current.node.type === 'CallExpression' && current.node.arguments[0]?.name === 'ComponentViewportProvider')) {
        current = current.parent;
      }
      if (current) {
        j(current).replaceWith(j.nullLiteral());
      }
    }
  });

  return root.toSource();
}
