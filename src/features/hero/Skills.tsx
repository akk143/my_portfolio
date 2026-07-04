import { motion } from 'framer-motion';
import { Braces, Database, LayoutDashboard, ServerCog } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';

const skillGroups = [
  {
    title: 'Frontend interfaces',
    icon: LayoutDashboard,
    summary: 'Building responsive pages, reusable components, and clean user flows.',
    proof: 'Used in React Landing Page and portfolio UI',
    skills: ['React', 'Vite', 'Bootstrap', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend integration',
    icon: ServerCog,
    summary: 'Connecting UI to APIs, auth flows, contact forms, and project data.',
    proof: 'Used with Express, Laravel practice, and payment/contact flows',
    skills: ['Express', 'Laravel', 'REST APIs', 'Authentication', 'Stripe basics'],
  },
  {
    title: 'Data and realtime',
    icon: Database,
    summary: 'Working with app state, persistence, realtime updates, and structured data.',
    proof: 'Used in public chatroom and frontend state management',
    skills: ['Firebase', 'MySQL', 'Redux Toolkit', 'Form data', 'Uploads'],
  },
  {
    title: 'Developer workflow',
    icon: Braces,
    summary: 'Keeping projects organized, deployable, and understandable for collaborators.',
    proof: 'Practiced through short project cycles and group builds',
    skills: ['GitHub', 'Deployment', 'Responsive QA', 'Code organization', 'Documentation'],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="bg-slate-50 py-24 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Skills"
            title="A practical stack, organized by how it supports real projects."
            description="Instead of inflated proficiency bars, this section shows the areas I can contribute to and the project context behind each skill."
          />
          <div className="rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 text-sm leading-6 text-teal-900 lg:max-w-xs">
            Recruiter signal: I can move between interface details, API integration, and project delivery without losing sight of usability.
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05 }}
              className="group soft-card p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_70px_rgba(37,99,235,0.1)]"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-blue-700">
                  <group.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{group.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{group.summary}</p>
                </div>
              </div>

              <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700">{group.proof}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
