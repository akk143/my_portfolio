import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'home');
  const depsKey = sectionIds.join('|');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const offset = 160;
      const scrollPosition = window.scrollY + offset;
      const viewportBottom = window.innerHeight + window.scrollY - 120;

      let nextSection = sectionIds[0] ?? 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          nextSection = section.id;
        }
      });

      if (viewportBottom >= document.documentElement.scrollHeight - 120) {
        nextSection = sections[sections.length - 1].id;
      }

      setActiveSection((current) => (current === nextSection ? current : nextSection));

      const nextHash = nextSection === 'home' ? '' : `#${nextSection}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [depsKey, sectionIds]);

  return activeSection;
};
