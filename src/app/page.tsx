import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { IndexList } from '@/components/sections/IndexList';
import { Stay } from '@/components/sections/Stay';
import { Dining } from '@/components/sections/Dining';
import { Experiences } from '@/components/sections/Experiences';
import { Journal } from '@/components/sections/Journal';
import { Book } from '@/components/sections/Book';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IndexList />
        <Stay />
        <Dining />
        <Experiences />
        <Journal />
        <Book />
      </main>
      <Footer />
    </>
  );
}
