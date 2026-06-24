import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Menu } from '@/components/sections/Menu';
import { Craft } from '@/components/sections/Craft';
import { Gallery } from '@/components/sections/Gallery';
import { PrivateDining } from '@/components/sections/PrivateDining';
import { Reservation } from '@/components/sections/Reservation';
import { Press } from '@/components/sections/Press';
import { Footer } from '@/components/sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Menu />
        <Craft />
        <Gallery />
        <PrivateDining />
        <Reservation />
        <Press />
      </main>
      <Footer />
    </>
  );
}
