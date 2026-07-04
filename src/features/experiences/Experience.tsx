import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';

const experiences = [
  {
    title: "OpenTalk Public Chatroom",
    company: "DataLand",
    location: "Remote",
    period: "Group Work Project",
    description: "Worked on a public real-time chatroom with authentication, global rooms, Firebase realtime sync, and an Express backend.",
    stack: ["Python", "Firebase", "Express", "OAuth"]
  },
  {
    title: "React Landing Page",
    company: "DataLand",
    location: "Remote",
    period: "Group Work Project",
    description: "Built a responsive React landing page with Bootstrap styling, Express API support, fast-loading UI, and modern component-based layout.",
    stack: ["React", "Bootstrap", "Express"]
  },
  {
    title: "Independent Web Project",
    company: "One-Month Project",
    location: "Remote",
    period: "One-month project",
    description: "Completed a focused web development project from planning to implementation, practicing responsive UI, backend integration, and deployment-ready structure.",
    stack: ["React", "Laravel", "MySQL", "Bootstrap"]
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="bg-white py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Experience & learning"
              title="An honest project journey with visible growth."
              description="This section avoids fake employment claims. It frames group work and one-month builds as evidence of collaboration, learning pace, and practical implementation."
            />

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-5 w-5 text-teal-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-950">Growth signal</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The timeline shows a practical path: collaborate in group projects, build independently, and improve the product quality of each iteration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-slate-200 sm:block" />
            <div className="grid gap-5">
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06 }}
                  className="relative sm:pl-14"
                >
                  <div className="absolute left-0 top-6 hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm sm:grid">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <div className="soft-card p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Step 0{index + 1}</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-slate-950">{exp.title}</h3>
                      </div>
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {exp.period}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <Briefcase className="h-4 w-4" aria-hidden="true" />
                        {exp.company}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-600">{exp.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.stack.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
