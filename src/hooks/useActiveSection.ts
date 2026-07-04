import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const ids = sectionIds.join('|');
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.08, 0.2, 0.4, 0.6],
      }
    );

    ids.split('|').forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
};
