import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { posters } from '../data/posters';
import PosterModal from '../components/PosterModal';

const PosterMarquee = memo(({ posters, onSelect, isPaused }) => {
    return (
        <div className="w-full overflow-hidden relative group mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

            <div
                className={`flex gap-6 w-max animate-marquee hover:pause-animation ${isPaused ? 'pause-animation' : ''}`}
            >
                {[...posters, ...posters].map((poster, i) => (
                    <div
                        key={`${poster.id}-${i}`}
                        onClick={() => onSelect(poster)}
                        className="h-96 aspect-[3/4] rounded-xl overflow-hidden relative shadow-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 group/item cursor-zoom-in transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                    >
                        <img
                            src={poster.image}
                            alt={poster.title}
                            className="h-full w-full object-cover filter grayscale group-hover/item:grayscale-0 transition-all duration-500 transform group-hover/item:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <span className="text-barbie-hot text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300 delay-75">
                                {poster.category}
                            </span>
                            <h4 className="text-white font-bold text-lg leading-tight translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300 delay-100">
                                {poster.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const Gallery = () => {
    const [selectedPoster, setSelectedPoster] = useState(null);

    const handleSelectPoster = useCallback((poster) => {
        setSelectedPoster(poster);
    }, []);

    return (
        <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:opacity-10 dark:invert"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-barbie-ruby dark:text-barbie-hot font-bold uppercase tracking-widest text-sm"
                    >
                        Showcase
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mt-2"
                    >
                        Design <span className="text-barbie-hot italic">G</span>allery
                    </motion.h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                        A collection of posters, flyers, and social media designs.
                    </p>
                </div>

                <PosterMarquee posters={posters} onSelect={handleSelectPoster} isPaused={!!selectedPoster} />

                <div className="flex justify-center mt-12">
                    <Link to="/gallery">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-barbie-hot text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                        >
                            View Full Gallery <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </div>

            <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
        </section>
    );
};

export default Gallery;
