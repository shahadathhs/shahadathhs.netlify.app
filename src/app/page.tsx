import { heroData } from '@/constant/heroData';
import { aboutMeBio } from '@/constant/aboutMe';
import { experienceData } from '@/constant/experienceData';
import { skills } from '@/constant/skillsData';
import { contactEmail } from '@/constant/contactInfo';
import { repoCategories } from '@/constant/repoCategories';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-sans tracking-tight leading-tight">
          {heroData.secondLine}
        </h1>
        <p className="text-secondary text-lg font-sans">
          Backend Developer specializing in scalable systems.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/shahadathhs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-200"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/shahadathhs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors duration-200"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="text-secondary hover:text-white transition-colors duration-200"
          >
            <Mail size={20} />
          </a>
        </div>
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-xl font-sans font-medium">About</h2>
        <div className="text-secondary leading-relaxed font-sans space-y-4">
          <p>{aboutMeBio.split('\n\n')[0]}</p>
          <p>{aboutMeBio.split('\n\n')[1]}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-xl font-sans font-medium">Experience</h2>
        <div className="space-y-8">
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col sm:flex-row sm:justify-between items-start gap-1"
            >
              <div className="flex flex-col">
                <h3 className="text-md font-sans text-white hover:text-secondary group-hover:text-white transition-colors">
                  {exp.designation} at{' '}
                  <span className="font-medium underline decoration-neutral-800 underline-offset-4">
                    {exp.company}
                  </span>
                </h3>
                <p className="text-secondary text-sm mt-1 leading-relaxed max-w-md">
                  {exp.responsibilities[0]}
                </p>
              </div>
              <span className="text-neutral-500 text-xs font-mono sm:mt-1 whitespace-nowrap">
                {exp.title.split(' - ')[0]} &mdash;{' '}
                {exp.title.split(' - ')[1] || 'Present'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
          <h2 className="text-xl font-sans font-medium">Projects</h2>
          <a
            href="https://github.com/shahadathhs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:text-white flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={12} />
          </a>
        </div>
        <div className="space-y-12">
          {Object.entries(repoCategories).map(([category, repos]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo}
                    href={`https://github.com/shahadathhs/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-3 -mx-3 hover:bg-[#111] rounded-lg transition-all duration-200"
                  >
                    <span className="font-sans text-white group-hover:underline underline-offset-4 decoration-neutral-700">
                      {repo}
                    </span>
                    <span className="text-[10px] text-neutral-600 font-mono mt-1 truncate">
                      github.com/shahadathhs/{repo}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-xl font-sans font-medium">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {skills.map((category) => (
            <div key={category.title} className="space-y-2">
              <h3 className="text-xs font-mono text-neutral-600 uppercase tracking-tight">
                {category.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {category.description.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="pt-8 border-t border-neutral-900">
        <p className="text-secondary text-sm font-sans flex items-center gap-2">
          Get in touch &mdash;{' '}
          <a
            href={`mailto:${contactEmail}`}
            className="text-white hover:underline-offset-4 hover:underline transition-all"
          >
            {contactEmail}
          </a>
        </p>
      </section>
    </div>
  );
}
