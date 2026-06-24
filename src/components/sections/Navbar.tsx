import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-luxe',
        scrolled
          ? 'border-b border-white/10 bg-obsidian/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container-luxe flex items-center justify-between py-4 md:py-5">
        {/* Wordmark */}
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-bone md:text-[1.7rem]">
            Ember <span className="text-brass">&amp;</span> Oak
          </span>
          <span className="mt-1 hidden text-[0.6rem] uppercase tracking-[0.4em] text-ash md:block">
            Steakhouse · Seattle
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative font-sans text-sm tracking-wide text-bone/80 transition-colors duration-300 hover:text-bone after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <ButtonLink href="#reserve" size="md">
            Reserve
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center text-bone lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-obsidian/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-luxe flex flex-col gap-1 py-6">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-4 font-serif text-2xl text-bone/90 transition-colors hover:text-brass"
                >
                  {item.label}
                </a>
              ))}
              <ButtonLink
                href="#reserve"
                size="lg"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Reserve a Table
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
