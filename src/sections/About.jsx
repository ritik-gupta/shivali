import { motion } from 'framer-motion';
import { FaDownload, FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiAdobepremierepro, SiNotion } from 'react-icons/si';

const About = () => {
    const skills = [
        { name: 'Figma', icon: <FaFigma /> },
        { name: 'Photoshop', icon: <SiAdobephotoshop /> },
        { name: 'Illustrator', icon: <SiAdobeillustrator /> },
        { name: 'InDesign', icon: <SiAdobeindesign /> },
        { name: 'Premiere Pro', icon: <SiAdobepremierepro /> },
        { name: 'Notion', icon: <SiNotion /> },
    ];



    return (
        <section id="about" className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Image */}
                    <motion.div
                        className="w-64 h-64 md:w-80 md:h-80 relative group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-barbie-hot rounded-full blur-xl opacity-20 transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden transform hover:rotate-3 transition-transform duration-500">
                            <img
                                src="/assets/shivali_pic.jpeg"
                                alt="Shivali Gaur"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="flex-1 text-center md:text-left"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.span
                            variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                            transition={{ duration: 0.3 }}
                            className="text-barbie-ruby uppercase tracking-wider font-semibold mb-2 block"
                        >
                            Who I Am
                        </motion.span>
                        <motion.h2
                            variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
                        >
                            Designing with Passion & Purpose
                        </motion.h2>
                        <motion.p
                            variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                            transition={{ duration: 0.3 }}
                            className="text-lg text-gray-600 mb-8 leading-relaxed"
                        >
                            I'm a designer based in Delhi, creating meaningful and visually strong digital experiences. I work on UX/UI design, website design, brand identity, and logo design, blending art and strategy to make designs that stand out.
                            <br /><br />
                            I focus on intuitive user journeys, clean visuals, and thoughtful details that enhance usability. My goal is to create designs that feel seamless, purposeful, and aligned with brand vision.
                        </motion.p>

                        {/* Skills */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="flex flex-wrap gap-3 justify-center md:justify-start mb-8"
                        >
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    className="bg-pink-50 text-barbie-ruby px-4 py-2 rounded-full font-medium flex items-center gap-2 border border-pink-100 shadow-sm cursor-default hover:shadow-md transition-shadow"
                                >
                                    {skill.icon}
                                    {skill.name}
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                            <a
                                href="/assets/shivali_resume.pdf"
                                download="Shivali_Gaur_Resume.pdf"
                                className="inline-block"
                            >
                                <button className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group">
                                    <FaDownload className="group-hover:animate-bounce" />
                                    Download Resume
                                </button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>



            </div>
        </section>
    );
};

export default About;
