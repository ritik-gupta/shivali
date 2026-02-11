import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { posters } from '../data/posters';
import PosterModal from '../components/PosterModal';

const FullGallery = () => {
    const [selectedPoster, setSelectedPoster] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-24 px-4 transition-colors duration-300">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center">
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-barbie-hot dark:hover:text-barbie-hot mb-8 transition-colors"
                        >
                            <FaArrowLeft /> Back to Home
                        </motion.button>
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white text-center"
                    >
                        Complete <span className="text-barbie-hot italic">G</span>allery
                    </motion.h1>
                    <p className="text-gray-500 mt-4 text-center max-w-2xl">
                        Explore the full collection of creative works, from social media posts to corporate branding.
                    </p>
                </div>

                {/* Pinterest-style Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {posters.map((poster, index) => (
                        <motion.div
                            key={poster.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            onClick={() => setSelectedPoster(poster)}
                            className="break-inside-avoid mb-6 group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-zoom-in transition-all duration-300 border border-gray-100 dark:border-gray-800"
                        >
                            <img
                                src={poster.image}
                                alt={poster.title}
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-barbie-hot text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {poster.category}
                                </span>
                                <h3 className="text-white font-bold text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                    {poster.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
        </div>
    );
};

export default FullGallery;
