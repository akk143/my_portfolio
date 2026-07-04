import { motion } from 'framer-motion';
import { CheckCircle2, Layers3, Sparkles, UsersRound } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';

const strengths = [
  {
    icon: Sparkles,
    title: 'Product-minded UI',
    body: 'I care about clear hierarchy, responsive details, and interfaces that feel simple to use.',
  },
  {
    icon: Layers3,
    title: 'Full-stack foundations',
    body: 'I connect frontend work with practical backend APIs, data flow, auth, and deployment needs.',
  },
  {
    icon: UsersRound,
    title: 'Team project practice',
    body: 'Group builds helped me practice communication, ownership, and shipping usable features.',
  },
];

const principles = ['Readable code', 'Responsive layouts', 'Clear user flows', 'Practical backend integration'];

export const About = () => {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Building toward thoughtful, reliable web products.
              </>
            }
            description="I’m Ye Thu Aung, a developer focused on turning practical ideas into polished web experiences. My current work centers on React interfaces, Laravel or Express backends, and learning through focused real-world project builds."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="surface-card p-6 sm:col-span-2"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">What I optimize for</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {principles.map((principle) => (
                  <div key={principle} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-slate-700">{principle}</span>
                  </div>
                ))}
              </div>
            </motion.article>

            {strengths.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.06 }}
                className="soft-card p-6"
              >
                <item.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
