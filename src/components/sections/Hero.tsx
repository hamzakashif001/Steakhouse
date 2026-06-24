import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { site } from '@/data/site';
import { images } from '@/data/images';
import { ButtonLink } from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Progressive enhancement: only load the hearth video on larger screens
  // with motion allowed and no data-saver. Mobile / reduced-motion / save-data
  // keep the lightweight steak still below.
  useEffect(() => {
    if (reduce) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    if (wide && !saveData) setShowVideo(true);
  }, [reduce]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background: steak still (always) with the hearth video enhancing it. */}
      <div className="absolute inset-0">
        <img
          src={images.heroPoster}
          alt="A hearth-charred, dry-aged ribeye resting under low light"
          className={`h-full w-full object-cover ${reduce ? '' : 'animate-ken-burns'}`}
        />
        {showVideo && (
          <video
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.55] transition-opacity duration-[1200ms] ease-luxe ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-fire-poster.webp"
            aria-hidden="true"
            ref={(el) => {
              if (el && el.readyState >= 2) setVideoReady(true);
            }}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
          >
            <source src="/video/hero-fire.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Cinematic overlays for depth + legibility (kept strong so hero text
          stays readable even at the fire video's brightest frames) */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/45 to-obsidian" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(11,11,12,0.65)_100%)]" />

      {/* Content */}
      <div className="container-luxe relative flex h-full flex-col justify-center pb-20 pt-24">
        <motion.p {...rise(0.5)} className="eyebrow mb-6">
          Pioneer Square · Est. {site.established}
        </motion.p>

        <motion.h1
          {...rise(0.65)}
          className="max-w-4xl font-serif text-[3.4rem] font-semibold leading-[0.95] tracking-tight text-bone text-balance sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          Ember <span className="italic text-brass">&amp;</span> Oak
        </motion.h1>

        <motion.p
          {...rise(0.82)}
          className="mt-7 max-w-xl font-serif text-xl italic text-bone/85 sm:text-2xl"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          {...rise(0.95)}
          className="mt-5 max-w-md text-sm leading-relaxed text-ash"
        >
          A coal-fired chophouse in a converted 1907 ironworks — dry-aged beef,
          Cascade ranches, and the cold Pacific.
        </motion.p>

        <motion.div {...rise(1.1)} className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="#reserve" size="lg">
            Reserve a Table
          </ButtonLink>
          <ButtonLink href="#menu" size="lg" variant="outline">
            View the Menu
          </ButtonLink>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ash"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Discover</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-brass" />
        </motion.span>
      </motion.a>
    </section>
  );
}
