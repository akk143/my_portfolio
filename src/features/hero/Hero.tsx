import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Download, MonitorSmartphone } from 'lucide-react';
import chatroomPreview from '../projects/images/chatroomimg/chatroom.png';

const proofPoints = [
  { value: '03', label: 'focused project builds' },
  { value: '02', label: 'group work projects' },
  { value: 'React', label: 'frontend focus' },
];

export const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 pt-32 sm:pt-36 lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
      <div className="section-shell">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid min-h-[calc(100vh-8rem)] items-center gap-14 pb-20 lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
              Available for junior developer roles and project work
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl"
            >
              I build clean web products with practical full-stack thinking.
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              I’m Ye Thu Aung, a developer focused on React interfaces, Laravel and Express backends, and project work that feels polished, usable, and easy to understand.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/projects"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState({}, '', '/projects');
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                View selected projects
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="/yethuaungcv.pdf"
                download="yethuaungcv.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{point.value}</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{point.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative lg:pl-4">
            <div className="surface-card overflow-hidden p-3">
              <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-teal-400" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Project preview</span>
              </div>
              <div className="relative aspect-[1.12/1] overflow-hidden rounded-[1.15rem] bg-slate-100">
                <img
                  src={chatroomPreview}
                  alt="OpenTalk real-time chatroom interface screenshot"
                  className="h-full w-full object-cover object-left-top"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">OpenTalk Public Chatroom</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">Realtime chat, auth, global rooms, and Firebase sync.</p>
                    </div>
                    <MonitorSmartphone className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-2 hidden max-w-[18rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:block">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-slate-700" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-950">Built from real project work</p>
                  <p className="text-xs leading-5 text-slate-500">Source links, live demos, and screenshots are visible.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
