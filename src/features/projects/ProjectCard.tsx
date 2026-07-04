import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Github, Zap } from 'lucide-react';
import type { Project } from '../../types/project';
import { cn } from '../../utils/cn';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const imageFirst = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_90px_rgba(2,6,23,0.32)]"
    >
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <figure className={cn('relative min-h-[320px] bg-slate-900 p-3 sm:p-4', !imageFirst && 'lg:order-2')}>
          <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
              </div>
              <span className="text-xs font-semibold text-slate-400">Live product screenshot</span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover object-left-top transition duration-700 group-hover:scale-[1.025]"
              />
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-6 hidden gap-2 sm:grid sm:grid-cols-3">
            {project.gallery.map((img, galleryIndex) => (
              <img
                key={img}
                src={img}
                alt={`${project.title} gallery ${galleryIndex + 1}`}
                loading="lazy"
                className="h-20 rounded-xl border border-white/70 bg-white object-cover object-left-top shadow-lg"
              />
            ))}
          </div>
        </figure>

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Project 0{index + 1}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{project.architecture}</span>
          </div>

          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">{project.title}</h3>
          <p className="mt-4 text-base leading-8 text-slate-600">{project.description}</p>

          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex gap-3">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Challenge</p>
                <p className="mt-1 text-sm font-medium leading-6 text-amber-950">{project.challenge}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                <span className="text-sm leading-6 text-slate-700">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                View live
                <ArrowUpRight className="h-4 w-4 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Source code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
