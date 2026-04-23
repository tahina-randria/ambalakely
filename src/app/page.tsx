import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { QuickBook } from '@/components/sections/QuickBook';
import { IndexList } from '@/components/sections/IndexList';
import { Stay } from '@/components/sections/Stay';
import { Dining } from '@/components/sections/Dining';
import { Experiences } from '@/components/sections/Experiences';
import { Reviews } from '@/components/sections/Reviews';
import { Trust } from '@/components/sections/Trust';
import { Location } from '@/components/sections/Location';
import { Journal } from '@/components/sections/Journal';
import { Contact } from '@/components/sections/Contact';
import { Book } from '@/components/sections/Book';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuickBook />
        <IndexList />
        <Stay />
        <Dining />
        <Experiences />
        <Reviews />
        <Trust />
        <Location />
        <Journal />
        <Contact />
        <Book />
      </main>
      <Footer />
    </>
  );
}
