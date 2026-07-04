import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Github, Linkedin, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { cn } from '../../utils/cn';

const RECIPIENT_EMAIL = 'ares295821@gmail.com';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [composeLink, setComposeLink] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedSubject = (formData.subject || 'New inquiry from portfolio').replace(/\r?\n/g, ' ').trim();
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      '',
      'Message:',
      formData.message,
    ]
      .join('\n')
      .replace(/\r?\n/g, '\n');

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(cleanedSubject)}&body=${encodeURIComponent(body)}`;
    const fallbackMailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(cleanedSubject)}&body=${encodeURIComponent(body)}`;

    setComposeLink(gmailComposeUrl);
    setStatus('Opening Gmail compose...');

    const popup = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

    if (!popup) {
      window.location.href = fallbackMailtoLink;
    }

    window.setTimeout(() => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(fallbackMailtoLink).catch(() => undefined);
      }
      setStatus('If Gmail did not open, use the link below or copy the fallback mailto address.');
    }, 1000);
  };

  return (
    <section id="contact" className="bg-slate-50 py-24 sm:py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="surface-card overflow-hidden"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-slate-950 p-7 text-white sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Available for new projects
              </div>

              <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Have a role, project, or collaboration in mind?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Send a clear note and I’ll reply with next steps. I’m especially interested in React frontend work, Laravel or Express integration, and product-focused web builds.
              </p>

              <div className="mt-10 grid gap-3">
                <ContactMethod icon={<Mail className="h-5 w-5" />} label="Email" value={RECIPIENT_EMAIL} href={`mailto:${RECIPIENT_EMAIL}`} />
                <ContactMethod icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" value="yethu-dev" href="https://www.linkedin.com/in/ye-thu-7b125a33a/" />
                <ContactMethod icon={<Github className="h-5 w-5" />} label="GitHub" value="akk143" href="https://github.com/akk143/" />
                <ContactMethod icon={<MapPin className="h-5 w-5" />} label="Location" value="Remote / Worldwide" />
              </div>

              <a
                href={`mailto:${RECIPIENT_EMAIL}?subject=Meeting%20Invitation&body=Hi%20Ye%20Thu,%0D%0AI'd%20like%20to%20invite%20you%20to%20a%20meeting.%0D%0A`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Invite to meeting
              </a>
            </div>

            <form className="bg-white p-7 sm:p-10 lg:p-12" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput label="Full name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                <FormInput label="Email address" name="email" placeholder="you@example.com" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="mt-5">
                <FormInput label="Subject" name="subject" placeholder="Project inquiry" value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="mt-5 space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    'min-h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 transition',
                    'placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100'
                  )}
                  placeholder="Tell me what you are building, what role you need, or what I should review."
                  required
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Send inquiry
                <Send className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>

              {status ? (
                <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800" aria-live="polite">
                  {status}
                </p>
              ) : null}

              {composeLink ? (
                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Gmail compose link</p>
                  <a href={composeLink} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm leading-6 text-blue-800 underline underline-offset-4">
                    {composeLink}
                  </a>
                </div>
              ) : null}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactMethod = ({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) => {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-blue-100">{icon}</span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-white">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">{content}</div>;
};

const FormInput = ({ label, id, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) => {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={cn(
          'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 transition',
          'placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100'
        )}
      />
    </div>
  );
};
