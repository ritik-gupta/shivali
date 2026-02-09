import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen-dvh flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50 to-barbie-light dark:from-gray-900 dark:via-black dark:to-purple-900">

            {/* Background Shapes */}
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 rounded-full bg-barbie-soft dark:bg-pink-900 blur-3xl opacity-60 will-change-transform transform-gpu"
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-purple-subtle dark:bg-purple-900 blur-3xl opacity-50 will-change-transform transform-gpu"
                animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/20 blur-3xl md:blur-[100px] opacity-30 z-0 will-change-transform transform-gpu"
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="block text-barbie-ruby dark:text-barbie-hot font-medium text-xl mb-4 tracking-widest uppercase">
                        Hello World, I'm
                    </span>
                    <div className="mb-6 flex justify-center">
                        <img
                            src="/assets/Shivali_Gaur.png"
                            alt="Shivali Gaur"
                            loading="eager"
                            className="w-full max-w-[600px] md:max-w-[800px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto h-20"
                >
                    <TypeAnimation
                        sequence={[
                            'Crafting seamless experiences.',
                            1000,
                            'Designing with creativity & precision.',
                            1000,
                            'Just a hint of caffeine!',
                            1000,
                        ]}
                        wrapper="p"
                        speed={50}
                        repeat={Infinity}
                    />
                    <p className="mt-2">
                        <span className="text-barbie-hot font-semibold">
                            UX/UI Designer
                        </span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="flex justify-center gap-4"
                >
                    <Link to="projects" smooth={true} duration={500} offset={-70} className="cursor-pointer">
                        <span className="bg-barbie-ruby text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-barbie-deep transition-all hover:scale-105 inline-block">
                            View My Work
                        </span>
                    </Link>
                    <Link to="contact" smooth={true} duration={500} offset={-70} className="cursor-pointer">
                        <span className="bg-white text-barbie-ruby border-2 border-barbie-ruby px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-pink-50 transition-all hover:scale-105 inline-block">
                            Contact Me
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-barbie-ruby cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <Link to="about" smooth={true} duration={500}>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
                        <FaArrowDown />
                    </div>
                </Link>
            </motion.div>

        </section>
    );
};

export default Hero;
