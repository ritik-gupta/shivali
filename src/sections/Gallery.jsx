import { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PosterMarquee = memo(({ posters, onSelect }) => {
    return (
        <div className="w-full overflow-hidden relative group mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: "-50%" }}
                initial={{ x: "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40
                }}
                whileHover={{ scale: 0.98, opacity: 0.8 }}
            >
                {[...posters, ...posters].map((poster, i) => (
                    <motion.div
                        key={`${poster.id}-${i}`}
                        onClick={() => onSelect(poster)}
                        className="h-96 aspect-[3/4] rounded-xl overflow-hidden relative shadow-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 group/item cursor-zoom-in"
                        whileHover={{ y: -5 }}
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
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
});

const Gallery = () => {
    const [selectedPoster, setSelectedPoster] = useState(null);

    const posters = useMemo(() => [
        {
            id: 1,
            title: "Movie Time Challenge",
            category: "Poster Design",
            image: "/assets/posters/Black and Red Minimalist Movie Poster Landscape.png",
            description: "Minimalist black and red movie poster for a weekly challenge."
        },
        {
            id: 2,
            title: "Labour Day Post",
            category: "Social Media",
            image: "/assets/posters/Black and Yellow Construction Instagram Post.png",
            description: "Bold black and yellow Labour Day social media design."
        },
        {
            id: 3,
            title: "South Indian Special",
            category: "Food Design",
            image: "/assets/posters/1dec411d-cd9b-4d24-946b-13fab31e9aa6.png",
            description: "Appetizing South Indian combo platter catering poster."
        },
        {
            id: 4,
            title: "RMC Award Grand Prize",
            category: "Corporate",
            image: "/assets/posters/35f3d177-80f2-4af7-af42-3d3bdbe613ad.png",
            description: "Informational poster for Quarter 1 Grand Prize award details."
        },
        {
            id: 5,
            title: "Dragonfly Illustration",
            category: "Digital Art",
            image: "/assets/posters/53eca2df-8176-4269-b86a-5e312a57a5b9.png",
            description: "Whimsical digital illustration of a dragonfly with magical sparkles."
        },
        {
            id: 6,
            title: "Sizzling Pakode",
            category: "Food Design",
            image: "/assets/posters/639f421c-52a4-4f6f-90f0-4df69a182098.png",
            description: "Vibrant green poster promoting a sizzling mix pakode platter."
        },
        {
            id: 7,
            title: "World HR Day",
            category: "Social Media",
            image: "/assets/posters/7641c771-e3e9-4799-b66a-e0236676eea9.png",
            description: "Colorful illustrative graphic celebrating World HR Day."
        },
        {
            id: 8,
            title: "Lunch Menu",
            category: "Menu Design",
            image: "/assets/posters/933624b7-0077-4307-9f39-9176d874a5d6.png",
            description: "Elegant maroon and cream lunch menu showcasing veg thali options."
        },
        {
            id: 9,
            title: "We Are Hiring",
            category: "Corporate",
            image: "/assets/posters/Blue Modern Bold Business Company Flyer.png",
            description: "Modern blue corporate recruitment flyer for sales positions."
        },
        {
            id: 10,
            title: "POA Award",
            category: "Internal Comms",
            image: "/assets/posters/ab0dbba7-1bdc-44d7-9b72-6604d54104a6.png",
            description: "Competition announcement for the 'Maximum CVs Sent' award."
        },
        {
            id: 11,
            title: "8th Anniversary Invite",
            category: "Event Design",
            image: "/assets/posters/b283cc4d-6d1c-42f1-b757-6b848f24b2ef.png",
            description: "Beautiful floral invitation card for the 8th anniversary party."
        },
        {
            id: 12,
            title: "RMC Award Details",
            category: "Corporate",
            image: "/assets/posters/bada2388-0c58-4536-8190-48de93763bd9.png",
            description: "Detailed poster outlining criteria and rewards for RMC awards."
        }
    ], []);

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
                        Portfolio
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

                <PosterMarquee posters={posters} onSelect={handleSelectPoster} />
            </div>

            {/* Poster Modal */}
            <AnimatePresence>
                {selectedPoster && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPoster(null)}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.button
                            className="absolute top-8 right-8 text-white text-4xl hover:text-barbie-hot transition-colors z-[1001]"
                            onClick={() => setSelectedPoster(null)}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            &times;
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            {/* Image Side */}
                            <div className="md:w-3/5 bg-gray-100 dark:bg-black/50 flex items-center justify-center p-6 md:p-12 relative overflow-hidden group">
                                <motion.img
                                    src={selectedPoster.image}
                                    alt={selectedPoster.title}
                                    className="max-h-full max-w-full object-contain shadow-xl rounded-lg"
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
                            </div>

                            {/* Info Side */}
                            <div className="md:w-2/5 p-8 flex flex-col justify-center bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-barbie-hot font-bold uppercase tracking-widest text-xs mb-3 inline-block px-3 py-1 bg-pink-50 dark:bg-pink-900/20 rounded-full w-fit"
                                >
                                    {selectedPoster.category}
                                </motion.span>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                                >
                                    {selectedPoster.title}
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="prose dark:prose-invert"
                                >
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                        {selectedPoster.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
