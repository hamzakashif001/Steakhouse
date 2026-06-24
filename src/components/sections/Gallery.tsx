import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { galleryImages } from '@/data/gallery';
import { Reveal } from '@/components/ui/Reveal';

// Three.js + the WebGL gallery are code-split so they never touch the
// initial bundle — loaded only when this section nears the viewport.
const InfiniteGallery = lazy(() => import('@/components/ui/3d-gallery-photography'));

function StaticGrid() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 overflow-hidden p-1 sm:grid-cols-3 md:grid-cols-4">
      {galleryImages.slice(0, 8).map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="h-full min-h-[140px] w-full rounded-sm object-cover"
        />
      ))}
    </div>
  );
}

export function Gallery() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // Escape hatch: ?static forces the lightweight grid (debugging / very-low-end).
  const forceStatic =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('static');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="gallery" className="relative bg-char py-24 md:py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">The Gallery</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-bone md:text-5xl lg:text-6xl">
              Step <span className="italic text-brass">inside</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-ash">
              A drift through the room, the fire, and the plates. Let it play, or
              use the controls to move through.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <div
          ref={ref}
          tabIndex={0}
          aria-label="Photo gallery — autoplaying. Use the on-screen controls or arrow keys to navigate."
          className="relative mx-auto h-[68vh] min-h-[440px] w-full max-w-[1600px] overflow-hidden border-y border-white/10 bg-obsidian outline-none"
        >
          {reduce || forceStatic ? (
            <StaticGrid />
          ) : (
            <Suspense fallback={<StaticGrid />}>
              {inView ? <InfiniteGallery images={galleryImages} visibleCount={10} speed={1} className="h-full w-full" /> : <StaticGrid />}
            </Suspense>
          )}

          {/* Edge vignettes to blend the canvas into the page */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-char to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-char to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}
