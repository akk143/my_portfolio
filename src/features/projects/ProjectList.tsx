import { ProjectCard } from './ProjectCard';
import type { Project } from '../../types/project';

// Chartroom Img
import chatroomImg from './images/chatroomimg/chatroom.png'
import loginImg from './images/chatroomimg/login.png'
import profileImg from './images/chatroomimg/profile.png'

// Landing Page Img
import homeImge from './images/landingpageimg/homeImg-preview.jpg'
import searchImg from './images/landingpageimg/searchImg-preview.jpg'
import serviceImg from './images/landingpageimg/serviceImg-preview.jpg'

const PROJECTS: Project[] = [
    {
    id: 'opentalk',
    title: 'OpenTalk Real-time Chat',
    description: 'Real-time chat with auth + global rooms.',
    techStack: ['Python', 'Firebase', 'Express'],
    architecture: 'Realtime sync with Firebase',
    challenge: 'OAuth + state sync',
    link: 'https://opentalk-a57p.onrender.com',
    github: 'https://github.com/akk143/publicchatroom',
    image: chatroomImg,
    gallery: [loginImg, chatroomImg, profileImg],
    highlights: [
      'Google OAuth 2.0',
      'Real-time messaging',
      'less than 1s sync latency'
    ]
  },
  {
    id: 'reactlandingpage',
    title: 'React Landing Page',
    description: 'A polished, responsive landing page built with React and modern UI patterns.',
    techStack: ['React', 'Bootstrap', 'Express'],
    architecture: 'Responsive single-page frontend',
    challenge: 'Conversion-focused layout + visual polish',
    link: 'https://rejslandingpage.netlify.app/',
    github: 'https://github.com/akk143/reactjslandingpage',
    image: homeImge,
    gallery: [homeImge, searchImg, serviceImg],
    highlights: [
      'Responsive design',
      'Fast-loading UI',
      'Modern component-based layout'
    ]
  }
];

export const ProjectList = () => {
  return (
    <section id="projects" className="bg-slate-950 py-24 sm:py-32">
      <div className="section-shell">
        <header className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Selected work</p>
            <h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Projects are the proof, so they get the most room.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Each project card shows what was built, what made it challenging, the technology involved, and enough screenshots for a reviewer to evaluate the product quickly.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-sm leading-7 text-slate-200">
            <span className="font-semibold text-white">Hiring-manager lens:</span> these cards prioritize shipped evidence over buzzwords, with live links, source links, screenshots, and concise impact bullets.
          </div>
        </header>

        <div className="mt-14 grid gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
