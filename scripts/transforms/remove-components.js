export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // 1. Remove HIRE US: find object with properties className: "framer-r0gejm"
  root.find(j.ObjectExpression).forEach(path => {
    const hasClass = path.node.properties.some(p =>
      p.key && (p.key.name === 'className' || p.key.value === 'className') &&
      p.value && p.value.value === 'framer-r0gejm'
    );
    if (hasClass) {
      // Find the CallExpression that uses this object
      const call = path.parent;
      if (call && call.node.type === 'CallExpression') {
        j(call).replaceWith(j.nullLiteral());
      }
    }
  });

  // 2. Remove CV button: find nodeId: "PdDHdt2oA"
  root.find(j.ObjectExpression).forEach(path => {
    const hasId = path.node.properties.some(p =>
      p.key && (p.key.name === 'nodeId' || p.key.value === 'nodeId') &&
      p.value && p.value.value === 'PdDHdt2oA'
    );
    if (hasId) {
      // Ascend to the ComponentViewportProvider call
      let current = path;
      while (current && current.node.type !== 'CallExpression') {
        current = current.parent;
      }
      if (current) {
        // ascend to parent ComponentViewportProvider
        let parentCall = current.parent;
        while (parentCall && !(parentCall.node.type === 'CallExpression' && parentCall.node.arguments[0]?.name === 'ComponentViewportProvider')) {
          parentCall = parentCall.parent;
        }
        if (parentCall) {
          j(parentCall).replaceWith(j.nullLiteral());
        } else {
          j(current).replaceWith(j.nullLiteral());
        }
      }
    }
  });

  // 3. Remove PricingSection: find nodeId: "iXKKHXkJv"
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
