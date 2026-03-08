'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  fetchGithubRepos,
  fetchMultipleRepos,
  GithubRepo,
} from '@/services/github-service';
import ProjectCard from '../card/ProjectCard';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

import { BorderBeam } from '../magicui/border-beam';

import ProjectSkeleton from '../skeleton/ProjectSkeleton';

import { PINNED_REPOS } from '@/constant/projectConfig';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      const response = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);

      if (response.isRateLimited) {
        setIsRateLimited(true);
      }

      // If no data returned and rate limited, use PINNED_REPOS as fallback
      if (response.data.length === 0 && response.isRateLimited) {
        const fallbackRepos: GithubRepo[] = PINNED_REPOS.map((name, index) => ({
          id: index,
          name,
          description:
            'API rate limit exceeded. View repository directly on GitHub.',
          html_url: `https://github.com/shahadathhs/${name}`,
          stargazers_count: 0,
          forks_count: 0,
          language: '',
          updated_at: new Date().toISOString(),
          fork: false,
        }));
        setRepos(fallbackRepos);
      }
      // If no pinned repos found (fallback to all), fetch latest
      else if (response.data.length === 0 && !response.isRateLimited) {
        const fallbackResponse = await fetchGithubRepos('shahadathhs');
        setRepos(
          fallbackResponse.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5),
        );
        setIsRateLimited(!!fallbackResponse.isRateLimited);
        setError(fallbackResponse.error || null);
      } else {
        setRepos(response.data);
        setError(response.error || null);
      }
      setLoading(false);
    };
    loadRepos();
  }, []);

  console.error(error, 'error in project section');

  return (
    <div
      id="projects"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col max-w-4xl mb-10 gap-4">
            <div>
              <h2 className="text-4xl mb-4 font-bold dark:text-white text-black">
                Open Source Projects
              </h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300  text-base max-w-2xl">
                A collection of my recent backend tools, infrastructure
                templates, and full-stack experiments.
              </p>
            </div>
          </div>

          {isRateLimited && (
            <div className="mb-10 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-4">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  GitHub API Rate Limit Reached
                </h3>
                <p className="mt-1 text-amber-800 dark:text-amber-200 text-sm">
                  The projects below are currently being served from cache. New
                  updates will be visible once the rate limit resets (usually in
                  less than an hour). This happens because unauthenticated
                  requests are limited by GitHub.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col max-w-7xl mx-auto border-t border-border/50">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))
              : repos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      name={repo.name}
                      description={repo.description}
                      url={repo.html_url}
                      stars={repo.stargazers_count}
                      forks={repo.forks_count}
                      language={repo.language}
                    />
                  </motion.div>
                ))}
          </div>

          <div className="flex justify-center mt-16">
            <Button asChild variant="outline" className="font-bold">
              <Link
                href="https://github.com/shahadathhs?tab=repositories"
                target="_blank"
              >
                View All Repositories
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
