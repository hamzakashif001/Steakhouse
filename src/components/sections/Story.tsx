import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { site } from '@/data/site';
import { images } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section id="story" className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">The House</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight text-bone text-balance md:text-5xl lg:text-6xl">
              A chophouse built in an old <span className="italic text-brass">ironworks</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ash md:text-lg">
              {site.intro}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ash">
              The bones of the room are original — riveted steel, brick fired the
              year the building went up. We kept the fire and added a cellar. What
              comes out of the hearth is the rest of the story.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex items-center gap-4">
              <div className="h-px w-12 bg-brass/60" />
              <p className="font-serif text-lg italic text-bone/80">
                Est. {site.established} · {site.city}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              src={images.story}
              alt="The Ember & Oak dining room — dark wood, leather, and warm light"
              style={{ y }}
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          {/* Brass corner accent */}
          <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b border-l border-brass/50" />
        </Reveal>
      </div>
    </section>
  );
}
