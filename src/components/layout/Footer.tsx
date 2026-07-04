import { Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'GitHub', href: 'https://github.com/akk143/', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ye-thu-7b125a33a/', icon: Linkedin },
  { label: 'Email', href: 'mailto:ares295821@gmail.com', icon: Mail },
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="section-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">Ye Thu Aung</p>
          <p className="mt-1 text-sm text-slate-500">Full-stack developer focused on polished, practical web products.</p>
        </div>
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
