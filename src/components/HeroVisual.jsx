import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroVisual = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    // Responsive size: smaller on mobile, larger on desktop
    const size = 200; // Base size (mobile)
    const halfSize = size / 2;

    const faceStyle = "absolute w-full h-full border border-white/40 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] rounded-3xl flex items-center justify-center text-6xl font-bold text-white/10 overflow-hidden";
    const glowingEdge = "absolute inset-0 bg-gradient-to-tr from-barbie-hot/20 to-transparent opacity-50";

    // 3D Cube Construction
    return (
        <div ref={ref} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible perspective-[1200px]">
            <motion.div
                className="relative md:scale-150 transform-gpu" // Default size mobile, scaled up desktop
                style={{
                    width: size,
                    height: size,
                    transformStyle: "preserve-3d",
                    y,
                    rotateX: rotate,
                }}
                animate={{
                    rotateY: [0, 360],
                    rotateZ: [0, 360],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Front */}
                <div className={faceStyle} style={{ transform: `translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-barbie-hot rounded-full blur-[60px] md:blur-[80px] opacity-40"></div>
                </div>
                {/* Back */}
                <div className={faceStyle} style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-purple-500 rounded-full blur-[60px] md:blur-[80px] opacity-40"></div>
                </div>
                {/* Right */}
                <div className={faceStyle} style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                </div>
                {/* Left */}
                <div className={faceStyle} style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                </div>
                {/* Top */}
                <div className={faceStyle} style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                {/* Bottom */}
                <div className={faceStyle} style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}>
                    <div className={glowingEdge} />
                </div>

                {/* Inner Core (The "Heart") */}
                <div className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 md:w-40 md:h-40 md:-ml-20 md:-mt-20 bg-barbie-hot rounded-full blur-md opacity-80 animate-pulse shadow-[0_0_50px_#ff007f]"></div>
            </motion.div>
            <style jsx>{`
                .perspective-[1200px] {
                    perspective: 1200px;
                }
             `}</style>
        </div>
    );
};

export default HeroVisual;
