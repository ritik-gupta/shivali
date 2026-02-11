import { useEffect, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FullGallery from './pages/FullGallery';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Disable browser default restoration to avoid conflicts
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Save scroll position for home page
    const handleScroll = () => {
      if (window.location.pathname === '/') {
        sessionStorage.setItem('home_scroll_pos', window.scrollY.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use useLayoutEffect to restore scroll before browser paint
  useLayoutEffect(() => {
    if (pathname === '/gallery') {
      window.scrollTo(0, 0);
    } else if (pathname === '/') {
      const savedPos = sessionStorage.getItem('home_scroll_pos');
      if (savedPos) {
        window.scrollTo(0, parseInt(savedPos));
      }
    }
  }, [pathname]);

  return null;
};

const AppContent = ({ darkMode, toggleTheme }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      {isHome && <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<FullGallery />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show loader for a short time to mask initial layout shifts
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dark Mode Logic
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="antialiased selection:bg-barbie-hot selection:text-white overflow-x-hidden w-full relative">
      {/* Texture Overlay */}
      <div className="noise-overlay" />

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-barbie-hot flex flex-col items-center justify-center z-[10000]"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-8xl font-display font-bold mb-8"
            >
              B
            </motion.div>
            <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-white mt-4 font-bold tracking-widest uppercase text-sm animate-pulse">
              Loading Fabulousness...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-barbie-hot z-[10001] origin-left"
              style={{ scaleX }}
            />

            <Router>
              <AppContent darkMode={darkMode} toggleTheme={toggleTheme} />
            </Router>

            {/* Back to Top Button */}
            <AnimatePresence>
              {showTopBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-gray-800 transition-colors border-2 border-white/20"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaArrowUp />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
