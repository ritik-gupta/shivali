import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaPalette, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, onClick }) => {
    const ref = useRef(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for rotation
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Map mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        // Custom property for spotlight
        ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
        ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer group border border-transparent dark:border-gray-700 isolate h-full flex flex-col"
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-50 mix-blend-soft-light"
                style={{
                    background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 105, 180, 0.4), transparent 40%)`
                }}
            />
            {/* 3D Depth Elements */}
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="relative h-48 overflow-hidden shrink-0">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${project.id === 4 ? 'object-top' : ''}`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-lg border-b-2 border-barbie-hot pb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
                </div>
            </div>

            <div style={{ transform: "translateZ(30px)" }} className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-barbie-hot uppercase tracking-wider mb-2 block">{project.category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md">{t}</span>
                    ))}
                </div>
                <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 bg-black dark:bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors w-full justify-center">
                        <FaExternalLinkAlt size={12} /> View Project
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = ['All', 'Web', 'Mobile', 'Branding'];

    const projects = useMemo(() => [
        {
            id: 1,
            title: 'Cosfem',
            category: 'Branding',
            desc: 'Crafted a cohesive visual identity for Cosfem through elegant brand labels, thoughtfully designed tags, and engaging content creation across social media, website visuals, and promotional materials.',
            tech: ['Figma', 'Adobe Illustrator', 'Brand Identity'],
            image: '/assets/project-cosfem.png',
            link: 'https://www.figma.com/proto/DXngk5MN7Kzq0ppc2fIQc3/Untitled?node-id=2-4&t=NU9HowIwmhA6lPlf-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1'
        },
        {
            id: 2,
            title: 'Shine',
            category: 'Mobile',
            desc: 'A sophisticated fashion application featuring elegant UI/UX design with a focus on luxury aesthetics. The app showcases premium fashion items with a refined user experience, incorporating modern design principles.',
            tech: ['Figma', 'Prototyping', 'UI/UX'],
            image: '/assets/project-shine.png',
            link: 'https://www.figma.com/proto/C3SfTBeqhHIj72HIUSbVDv'
        },
        {
            id: 3,
            title: 'Resource Mapping Consulting',
            category: 'Web',
            desc: 'A comprehensive website design and branding project for RMC, a specialized recruiting agency in the Freight Forwarding industry. The project includes complete design assets and a fully responsive website.',
            tech: ['Wix Studio', 'Web Design', 'Figma'],
            image: '/assets/project-rmc.png',
            link: 'https://resourcemappingconsultancy.com/'
        },
        {
            id: 4,
            title: 'Brand Identity & Visual Design',
            category: 'Branding',
            desc: 'Designed logos and cover pages with a strong focus on brand identity, visual consistency, and clean aesthetics. Applied principles of typography, color theory, and layout to ensure alignment with overall brand values.',
            tech: ['Brand Identity', 'Visual Design'],
            image: '/assets/Books.png',
            link: 'https://www.figma.com/design/43pUBZV014Z96mbb1rXNre/Green-logos-and-cover-pages'
        },
    ], []);

    const filteredProjects = projects.filter(project => filter === 'All' || project.category === filter);

    return (
        <section id="projects" className="py-20 bg-pink-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4"
                    >
                        My <span className="text-barbie-hot">Creations</span>
                    </motion.h2>

                    {/* Filters */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${filter === cat
                                    ? 'bg-barbie-ruby text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
                    style={{ perspective: "1000px" }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Project Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                            >
                                <div className="h-64 md:h-80 relative">
                                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black text-gray-800 dark:text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-barbie-hot font-bold uppercase tracking-wider text-sm">{selectedProject.category}</span>
                                            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mt-1">{selectedProject.title}</h2>
                                        </div>
                                        <div className="flex gap-3">
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="bg-gray-900 dark:bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                                                <FaExternalLinkAlt /> View Project
                                            </a>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                                        {selectedProject.desc} This project showcases modern design principles and robust engineering.
                                        Built with performance and user experience in mind.
                                    </p>

                                    <div className="mb-6">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t) => (
                                                <span key={t} className="bg-pink-100 dark:bg-pink-900/30 text-barbie-ruby dark:text-pink-300 px-3 py-1 rounded-full font-medium text-sm border border-pink-200 dark:border-pink-800">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Projects;
