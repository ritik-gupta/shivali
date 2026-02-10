import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaHeart, FaMoon, FaSun } from 'react-icons/fa';

const NAV_LINKS = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Playground', to: 'playground' },
];

const Navbar = ({ darkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 70
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 70
            }
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-md bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-pink-100 dark:border-gray-800' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold font-display text-barbie-ruby dark:text-barbie-hot flex items-center gap-2 cursor-pointer"
                >
                    <span className="text-3xl">B</span>
                    <span className="hidden sm:inline">Designer</span>
                    <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link, index) => (
                        <motion.div
                            key={link.to}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={link.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                offset={-70}
                                activeClass="active-nav"
                                className={`font-medium cursor-pointer transition-all duration-300 relative group ${scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-white'} hover:text-barbie-hot dark:hover:text-barbie-hot`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-barbie-hot transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Dark Mode Toggle Desktop */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-pink-100 dark:bg-gray-800 text-barbie-ruby dark:text-yellow-400 hover:scale-110 transition-transform focus:outline-none"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: darkMode ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                        </motion.div>
                    </button>

                    <Link to="contact" smooth={true} duration={500} offset={-70}>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-barbie-hot to-barbie-ruby text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all inline-block cursor-pointer"
                        >
                            Contact
                        </motion.span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden z-50 flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-pink-100 dark:bg-gray-800 text-barbie-ruby dark:text-yellow-400 focus:outline-none"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: darkMode ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </motion.div>
                    </button>
                    <button onClick={toggleMenu} className={`text-2xl focus:outline-none ${scrolled ? 'text-barbie-ruby dark:text-barbie-hot' : 'text-barbie-ruby dark:text-white'}`}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                offset={-70}
                                activeClass="text-barbie-ruby font-bold scale-110"
                                onClick={toggleMenu}
                                className="text-2xl font-display font-medium text-gray-800 dark:text-gray-200 hover:text-barbie-hot dark:hover:text-barbie-hot cursor-pointer transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="contact" smooth={true} duration={500} offset={-70} onClick={toggleMenu}>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 bg-barbie-hot text-white px-8 py-3 rounded-full text-lg shadow-lg font-bold inline-block cursor-pointer"
                            >
                                Let's Talk
                            </motion.span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
