import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApi } from '@marketing/hooks/useApi';

const TeamShowcaseSection = ({ section }) => {
  const { data, loading } = useApi('/team-members');
  const [activeIndex, setActiveIndex] = useState(0);

  const members = useMemo(() => data?.data || [], [data?.data]);

  useEffect(() => {
    if (members.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % members.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [members.length]);

  useEffect(() => {
    if (activeIndex >= members.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, members.length]);

  if (!loading && members.length === 0) {
    return null;
  }

  const activeMember = members[activeIndex] || null;

  if (!activeMember) {
    return null;
  }

  return (
    <section id="team" className="next-section-padding">
      <div className="next-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Our Team
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {section?.section_heading || 'The people behind your digital success'}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
              {section?.section_subheading ||
                'Our team blends strategy, design, engineering, and growth thinking so every project feels intentional from the first brief to launch day.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {members.map((member, index) => (
                <button
                  key={member.id || member.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition ${
                    activeIndex === index
                      ? 'w-14 bg-primary'
                      : 'w-8 bg-border hover:bg-primary/40'
                  }`}
                  aria-label={`Show ${member.name}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden border border-border/60 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id || activeMember.name}
                    initial={{ opacity: 0, x: 16, scale: 0.985 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -16, scale: 0.985 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {activeMember.photo_url ? (
                      <img
                        src={activeMember.photo_url}
                        alt={activeMember.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#2a2540,transparent_45%),linear-gradient(135deg,#111827,#1f2937,#312e81)] text-white">
                        <span className="text-7xl font-semibold tracking-[0.18em]">
                          {activeMember.name
                            .split(' ')
                            .map((part) => part.charAt(0))
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 border border-white/10 bg-black/45 p-5 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
                      <p className="text-2xl font-semibold">{activeMember.name}</p>
                      <p className="mt-1 text-sm uppercase tracking-[0.18em] text-white/75">
                        {activeMember.title}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {!loading && activeMember?.bio && (
              <AnimatePresence mode="wait">
                <motion.p
                  key={`bio-${activeMember.id || activeMember.name}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mx-auto mt-5 min-h-[3.5rem] max-w-xl text-center text-sm leading-7 text-muted-foreground"
                >
                  {activeMember.bio}
                </motion.p>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamShowcaseSection;
