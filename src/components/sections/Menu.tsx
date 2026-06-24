import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { menu } from '@/data/menu';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export function Menu() {
  const [active, setActive] = useState(menu[0].id);
  const reduce = useReducedMotion();
  const section = menu.find((s) => s.id === active) ?? menu[0];

  return (
    <section id="menu" className="relative bg-char py-24 md:py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">The Cuts</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-bone md:text-5xl lg:text-6xl">
              A menu written by <span className="italic text-brass">fire</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-ash">
              A seasonal selection. Steaks are dry-aged in house and priced by the cut.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Menu sections"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {menu.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={active === s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'relative cursor-pointer pb-2 font-sans text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-300',
                  active === s.id ? 'text-brass' : 'text-ash hover:text-bone'
                )}
              >
                {s.title}
                {active === s.id && (
                  <motion.span
                    layoutId="menu-underline"
                    className="absolute -bottom-px left-0 h-px w-full bg-brass"
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Items */}
        <div className="mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {section.note && (
                <p className="mb-8 text-center font-serif text-base italic text-ash">
                  {section.note}
                </p>
              )}
              <ul className="flex flex-col">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-baseline gap-4 border-b border-white/[0.06] py-5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-xl text-bone md:text-2xl">{item.name}</h3>
                        {item.signature && (
                          <span className="rounded-sm border border-brass/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-brass">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-ash">{item.description}</p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-white/15 sm:block"
                    />
                    <span className="shrink-0 font-serif text-xl text-brass-soft md:text-2xl">
                      ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
