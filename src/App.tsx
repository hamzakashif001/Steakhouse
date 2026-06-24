import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Placeholder beyond the fold so scroll + nav state can be tested.
            Replaced by real sections in the next build phase. */}
        <section
          id="story"
          className="flex min-h-[60vh] items-center justify-center border-t border-white/5 bg-char"
        >
          <p className="eyebrow">More sections coming next…</p>
        </section>
      </main>
    </>
  );
}
