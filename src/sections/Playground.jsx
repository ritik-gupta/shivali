import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSync, FaPalette, FaStar, FaHeart, FaSmile, FaCloud } from 'react-icons/fa';

// Generate non-overlapping positions for stickers
const generatePositions = () => {
    const positions = [];
    const gridSize = 80; // Minimum spacing between stickers
    const maxAttempts = 50;

    for (let i = 0; i < 6; i++) {
        let attempts = 0;
        let newPos;
        let overlapping;

        do {
            newPos = {
                top: Math.random() * 180,
                left: Math.random() * 280
            };

            overlapping = positions.some(pos =>
                Math.abs(pos.top - newPos.top) < gridSize &&
                Math.abs(pos.left - newPos.left) < gridSize
            );

            attempts++;
        } while (overlapping && attempts < maxAttempts);

        positions.push(newPos);
    }
    return positions;
};

const Playground = () => {
    const [colors, setColors] = useState(['#FF69B4', '#FFC0CB', '#E0115F', '#C71585', '#BA55D3']);
    const [copiedColor, setCopiedColor] = useState(null);
    const [stickerPositions, setStickerPositions] = useState(generatePositions());
    const constraintsRef = useRef(null);

    const generateColors = () => {
        const newColors = [];

        while (newColors.length < 5) {
            // Generate random color
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

            // Convert hex to RGB to check brightness
            const r = parseInt(randomColor.slice(1, 3), 16);
            const g = parseInt(randomColor.slice(3, 5), 16);
            const b = parseInt(randomColor.slice(5, 7), 16);

            // Calculate brightness (0-255)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Only accept colors that aren't too light (brightness < 200)
            if (brightness < 200) {
                newColors.push(randomColor);
            }
        }

        setColors(newColors);
        setStickerPositions(generatePositions()); // Reshuffle only on "Generate Magic"
    };

    const handleCopyColor = (color) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const stickers = [
        { id: 1, icon: <FaStar />, colorIndex: 0, ...stickerPositions[0] },
        { id: 2, icon: <FaHeart />, colorIndex: 1, ...stickerPositions[1] },
        { id: 3, icon: <FaSmile />, colorIndex: 2, ...stickerPositions[2] },
        { id: 4, icon: <FaCloud />, colorIndex: 3, ...stickerPositions[3] },
        { id: 5, icon: '👠', colorIndex: 4, ...stickerPositions[4] },
        { id: 6, icon: '🎀', colorIndex: 0, ...stickerPositions[5] },
    ];

    return (
        <section id="playground" className="py-20 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:opacity-10 dark:invert"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-barbie-ruby dark:text-barbie-hot font-bold uppercase tracking-widest text-sm"
                    >
                        Interactive Zone
                    </motion.span>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mt-2"
                    >
                        Pla<span className="text-barbie-hot italic">y</span>ground
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Color Generator */}
                    <div className="bg-pink-50 dark:bg-gray-800 p-8 rounded-3xl shadow-lg border-2 border-pink-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                            <FaPalette className="text-barbie-hot" /> Palette Generator
                        </h3>
                        <div className="flex rounded-xl overflow-hidden shadow-inner mb-6 h-32 relative">
                            {colors.map((color, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 flex items-end justify-center pb-2 text-xs font-mono uppercase bg-white/10 backdrop-blur-sm cursor-pointer hover:flex-[1.5] transition-all duration-300"
                                    style={{ backgroundColor: color }}
                                    whileHover={{ scale: 1.05, zIndex: 10 }}
                                    onClick={() => handleCopyColor(color)}
                                >
                                    <span className="bg-black/20 text-white px-1 rounded backdrop-blur-md">{color}</span>
                                </motion.div>
                            ))}

                            {/* Copy Toast Notification */}
                            {copiedColor && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-2 left-1/2 -translate-x-1/2 bg-barbie-ruby text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm flex items-center gap-2 z-50"
                                >
                                    ✨ Copied {copiedColor}!
                                </motion.div>
                            )}
                        </div>
                        <button
                            onClick={generateColors}
                            className="w-full py-3 bg-barbie-ruby text-white rounded-xl font-bold hover:bg-barbie-deep transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <FaSync className="animate-spin-slow" /> Generate Magic
                        </button>
                    </div>

                    {/* Sticker Board */}
                    <div className="bg-purple-50 dark:bg-gray-900 p-8 rounded-3xl shadow-lg border-2 border-purple-100 dark:border-gray-800 relative min-h-[400px] overflow-hidden">
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-white">
                            <FaStar className="text-yellow-400" /> Sticker Board
                        </h3>
                        <p className="text-gray-500 mb-6 text-sm">Drag stickers around to create your vibe!</p>

                        <div ref={constraintsRef} className="bg-white/50 border-2 border-dashed border-purple-200 rounded-xl h-80 relative overflow-hidden">
                            {stickers.map((sticker) => (
                                <motion.div
                                    key={sticker.id}
                                    drag
                                    dragConstraints={constraintsRef}
                                    dragElastic={0.1}
                                    dragMomentum={true}
                                    whileDrag={{ scale: 1.2, rotate: 10 }}
                                    whileHover={{
                                        scale: 1.1,
                                        cursor: 'grab',
                                        rotate: [0, -5, 5, -5, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ cursor: 'grabbing' }}
                                    className="absolute p-4 text-4xl shadow-sm rounded-full bg-white select-none"
                                    style={{
                                        color: colors[sticker.colorIndex],
                                        top: sticker.top,
                                        left: sticker.left
                                    }}
                                >
                                    {sticker.icon}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Playground;
