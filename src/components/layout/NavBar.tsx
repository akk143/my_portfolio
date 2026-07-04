import React, { useEffect, useState } from 'react';
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

  const navigateTo = (e: React.MouseEvent<HTMLAnchorElement> | null, id: string) => {
    if (e) e.preventDefault();
    const path = `/${id}`;
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handlePop = () => {
      const id = window.location.pathname.replace('/', '') || 'home';
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

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6">
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300',
          isScrolled
            ? 'border-slate-200/80 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl'
            : 'border-transparent bg-white/65 backdrop-blur-md'
        )}
        aria-label="Primary navigation"
      >
        <a href="/home" onClick={(e) => navigateTo(e, 'home')} className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-semibold tracking-[-0.03em] text-white transition group-hover:-translate-y-0.5">
            YA
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-[-0.01em] text-slate-950">Ye Thu Aung</span>
            <span className="block text-xs font-medium text-slate-500">Full-stack developer</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`/${link.href}`}
              onClick={(e) => navigateTo(e, link.href)}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                activeSection === link.href ? 'text-slate-950' : 'text-slate-500 hover:text-slate-950'
              )}
            >
              {activeSection === link.href ? (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
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
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/ye-thu-7b125a33a/"
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
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
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
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
