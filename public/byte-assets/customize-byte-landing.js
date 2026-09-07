(() => {
  const setText = (root, from, to) => {
    for (const element of root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span')) {
      if (element.children.length === 0 && element.textContent.trim() === from) {
        element.textContent = to;
      }
    }
  };

  const customize = () => {
    const root = document.querySelector('[data-framer-root]');
    if (!root) return;

    // Keep the requested page order after Framer hydration and responsive rerenders.
    const about = root.querySelector('section[data-framer-name="About-Section"]');
    const works = root.querySelector('section[data-framer-name="Works-Section"]');
    const departments = root.querySelector('section[data-framer-name="Services-Section"]');
    const facts = root.querySelector('section[data-framer-name="Facts-Section"]');
    if (about && works && departments && facts) {
      const parent = facts.parentNode;
      const siblings = [...parent.children];
      const ordered = siblings.indexOf(about) < siblings.indexOf(works)
        && siblings.indexOf(works) < siblings.indexOf(departments)
        && siblings.indexOf(departments) < siblings.indexOf(facts);
      if (!ordered) {
        parent.insertBefore(about, facts);
        parent.insertBefore(works, facts);
        parent.insertBefore(departments, facts);
      }
      if (departments.getAttribute('data-framer-name') !== 'Departments-Section') {
        departments.setAttribute('data-framer-name', 'Departments-Section');
      }
    }

    // Remove obsolete portfolio-template controls and sections.
    root.querySelectorAll('.framer-wjfetz-container,.framer-497eb2-container,.framer-r0gejm').forEach(el => el.remove());

    setText(root, 'WHO AM I', 'WHO ARE WE');
    setText(root, 'FEATURED WORKS', 'OUR ACHIEVEMENTS');
    setText(root, 'SERVICES', 'DEPARTMENTS');
    setText(root, 'UI VISUAL DESIGNER AND FRAMER DEVELOPER', 'STUDENT INNOVATION & TECHNICAL SOCIETY');
    setText(root, 'I love creating captivating and functional interfaces that evoke emotions and establish a connection between the brand and the user.', 'A community of curious minds, builders, designers, and innovators creating impactful technology.');

    const section = root.querySelector('section[data-framer-name="Departments-Section"],section[data-framer-name="Services-Section"]');
    if (!section) return;
    const content = section.querySelector('[data-framer-name="Content"]');
    if (!content) return;

    const data = [
      ['DEVELOPMENT', 'Web & Mobile', 'Software Systems'],
      ['AI/ML', 'Machine Learning', 'Intelligent Systems'],
      ['MECHATRONICS', 'Robotics & Hardware', ''],
      ['CYBERSECURITY', 'Network Security', 'Infrastructure & Audits'],
      ['OUTREACH', 'Creative & Community', ''],
    ];

    let points = [...content.querySelectorAll(':scope > [data-framer-name^="Point "]')];
    // Framer ships four items; clone the structurally simple third item for Outreach.
    if (points.length === 4) {
      const outreach = points[2].cloneNode(true);
      outreach.setAttribute('data-framer-name', 'Point 5');
      outreach.removeAttribute('data-framer-page-link-current');
      content.appendChild(outreach);
      points = [...content.querySelectorAll(':scope > [data-framer-name^="Point "]')];
    }
    // Prevent duplicates if a responsive rerender and observer run overlap.
    points.slice(5).forEach(point => point.remove());
    points = points.slice(0, 5);

    points.forEach((point, index) => {
      const [title, first, second] = data[index];
      const name = `Point ${index + 1}`;
      if (point.getAttribute('data-framer-name') !== name) point.setAttribute('data-framer-name', name);
      if (point.tagName === 'A' && point.getAttribute('href') !== '/members') point.setAttribute('href', '/members');
      const heading = point.querySelector('h2');
      if (heading && heading.textContent !== title) heading.textContent = title;
      const descriptions = [...point.querySelectorAll('p')];
      if (descriptions[0] && descriptions[0].textContent !== first) descriptions[0].textContent = first;
      if (descriptions[1] && second && descriptions[1].textContent !== second) descriptions[1].textContent = second;
      if (!second && descriptions[1]) descriptions[1].remove();
    });
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      customize();
    });
  };

  let observer;
  const boot = () => {
    customize();
    if (!observer) {
      observer = new MutationObserver(schedule);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
