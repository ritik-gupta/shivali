import { lazy, Suspense } from 'react';
import Reveal from '../components/Reveal';
import Hero from '../sections/Hero';
import About from '../sections/About';

// Lazy load non-critical sections
const Projects = lazy(() => import('../sections/Projects'));
const Gallery = lazy(() => import('../sections/Gallery'));
const Playground = lazy(() => import('../sections/Playground'));
const Contact = lazy(() => import('../sections/Contact'));

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-barbie-hot border-t-transparent animate-spin"></div></div>}>
                <Reveal>
                    <Projects />
                </Reveal>
                <Reveal>
                    <Gallery />
                </Reveal>
                <Reveal>
                    <Playground />
                </Reveal>
                <Reveal>
                    <Contact />
                </Reveal>
            </Suspense>
        </main>
    );
};

export default Home;
