import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

const PosterModal = memo(({ poster, onClose }) => {
    return (
        <AnimatePresence>
            {poster && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <motion.button
                        className="absolute top-8 right-8 text-white text-4xl hover:text-barbie-hot transition-colors z-[1001]"
                        onClick={onClose}
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
                                src={poster.image}
                                alt={poster.title}
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
                                {poster.category}
                            </motion.span>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                            >
                                {poster.title}
                            </motion.h3>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="prose dark:prose-invert"
                            >
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    {poster.description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default PosterModal;
