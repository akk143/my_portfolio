import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useActiveSection } from '../../hooks/useActiveSection';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Journey', href: 'experience' },
  { name: 'Contact', href: 'contact' },
];

const sectionIds = navLinks.map((link) => link.href);

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const [isDarkBg, setIsDarkBg] = useState(false);

  const navigateTo = (e: MouseEvent<HTMLAnchorElement> | null, id: string) => {
    if (e) e.preventDefault();

    const section = document.getElementById(id);

    if (section) {
      const nextPath = id === 'home' ? '/' : `/#${id}`;
      window.history.pushState({}, '', nextPath);

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const handlePop = () => {
      const hash = window.location.hash.replace('#', '');
      const id = hash || 'home';
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    handlePop();
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const parseRgb = (rgb: string) => {
      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return null;
      return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
    };

    const luminance = (r: number, g: number, b: number) => {
      const [R, G, B] = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };

    const findLuminanceFromPoint = (x: number, y: number): number => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = parseRgb(bg);
          if (rgb) return luminance(rgb[0], rgb[1], rgb[2]);
        }
        node = node.parentElement;
      }

      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const rgb = parseRgb(bodyBg || 'rgb(255,255,255)');
      return rgb ? luminance(rgb[0], rgb[1], rgb[2]) : 1;
    };

    const checkNavbarBg = () => {
      const header = document.querySelector('header');
      if (!header) return;
      const rect = header.getBoundingClientRect();
      // sample a few points just below the header so we get the section background
      const y = Math.min(Math.max(rect.bottom + 8, 4), window.innerHeight - 4);
      // try to sample under the avatar center first (more accurate for name visibility)
      const avatarImg = document.querySelector('img[alt="Ye Thu Aung"]') as HTMLElement | null;
      let used = false;
      if (avatarImg) {
        const avatarSpan = avatarImg.closest('span');
        const aRect = avatarSpan?.getBoundingClientRect();
        if (aRect) {
          const ax = aRect.left + aRect.width / 2;
          if (ax >= 0 && ax <= window.innerWidth) {
            const L = findLuminanceFromPoint(ax, y);
            setIsDarkBg(L < 0.18);
            used = true;
          }
        }
      }

      if (!used) {
        const sampleXs = [Math.max(rect.left + 16, 8), rect.left + rect.width / 2, Math.min(rect.right - 16, window.innerWidth - 8)];

        const darkVotes = sampleXs.reduce((votes, x) => {
          if (x < 0 || x > window.innerWidth) return votes;
          const L = findLuminanceFromPoint(x, y);
          return votes + (L < 0.18 ? 1 : 0);
        }, 0);

        setIsDarkBg(darkVotes >= 2);
      }
    };

    checkNavbarBg();
    window.addEventListener('scroll', checkNavbarBg, { passive: true });
    window.addEventListener('resize', checkNavbarBg);

    const mo = new MutationObserver(checkNavbarBg);
    mo.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', checkNavbarBg);
      window.removeEventListener('resize', checkNavbarBg);
      mo.disconnect();
    };
  }, [activeSection]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6">
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 backdrop-blur-xl',
          isDarkBg
            ? 'border-slate-700/50 bg-slate-900/70 text-white shadow-[0_18px_60px_rgba(2,6,23,0.6)]'
            : isScrolled
            ? 'border-slate-200/80 bg-white/88 text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.12)]'
            : 'border-slate-200/40 bg-white/65 text-slate-950'
        )}
        aria-label="Primary navigation"
      >
        <a href="/" onClick={(e) => navigateTo(e, 'home')} className="group">
          <span className="flex items-center gap-3 px-0 py-0 transition-all bg-transparent border-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-semibold tracking-[-0.03em] transition group-hover:-translate-y-0.5">
              <img src="/images/yethuaung.jpg" alt="Ye Thu Aung" className="h-full w-full object-cover object-center" />
            </span>

            <span className="hidden leading-tight sm:block">
              <span className={cn('block text-sm font-semibold tracking-[-0.01em]', isDarkBg ? 'text-white' : 'text-slate-950')}>Ye Thu Aung</span>
              <span className={cn('block text-xs font-medium', isDarkBg ? 'text-slate-300' : 'text-slate-500')}>Full-stack developer</span>
            </span>
          </span>
        </a>

        <div className={cn('hidden items-center gap-1 rounded-full p-1 md:flex', isDarkBg ? 'bg-slate-800/30' : 'bg-slate-100')}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`/${link.href}`}
              onClick={(e) => navigateTo(e, link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                activeSection === link.href
                  ? isDarkBg
                    ? 'text-white'
                    : 'text-slate-950'
                  : isDarkBg
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-500 hover:text-slate-950',
                isDarkBg ? 'focus-visible:ring-white/60 focus-visible:ring-offset-slate-900' : 'focus-visible:ring-slate-300 focus-visible:ring-offset-white'
              )}
            >
                {activeSection === link.href ? (
                <motion.span
                  layoutId="active-pill"
                  className={cn(
                    'absolute inset-0 rounded-full shadow-sm',
                    isDarkBg ? 'bg-white/10 ring-1 ring-white/10' : 'bg-white'
                  )}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/akk143/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isDarkBg
                ? 'border border-slate-700 bg-slate-800 text-white focus-visible:ring-white/60 focus-visible:ring-offset-slate-900'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950 focus-visible:ring-slate-300 focus-visible:ring-offset-white'
            )}
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/ye-thu-7b125a33a/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isDarkBg
                ? 'border border-slate-700 bg-slate-800 text-white focus-visible:ring-white/60 focus-visible:ring-offset-slate-900'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950 focus-visible:ring-slate-300 focus-visible:ring-offset-white'
            )}
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="/contact"
            onClick={(e) => navigateTo(e, 'contact')}
            className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Hire me
          </a>
        </div>

        <button
          className={cn(
            'grid h-10 w-10 place-items-center rounded-full border bg-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            isDarkBg ? 'border-slate-700 text-white focus-visible:ring-white/60 focus-visible:ring-offset-slate-900' : 'border-slate-200 text-slate-700 focus-visible:ring-slate-300 focus-visible:ring-offset-white'
          )}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-xl md:hidden"
          >
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`/${link.href}`}
                  onClick={(e) => {
                    navigateTo(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm font-semibold',
                    activeSection === link.href ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
