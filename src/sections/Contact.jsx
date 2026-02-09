import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaLinkedin, FaBehance, FaEnvelope, FaPinterest, FaInstagram, FaHeart, FaCommentDots } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfetti, setIsConfetti] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const serviceID = "service_2w62vuk";
            const templateID = "template_l86fr43";
            const publicKey = "8D6A9v_tmOg8LVyS1";

            await emailjs.send(
                serviceID,
                templateID,
                {
                    subject: formData.subject,
                    message: formData.message,
                    email: formData.email,
                    name: formData.name,
                },
                publicKey
            );

            setIsSubmitted(true);
            setIsConfetti(true);
            setTimeout(() => setIsConfetti(false), 5000);
        } catch (error) {
            console.error('Error sending email:', error);
            alert("Oops! There was a problem sending your message. Please try again or reach out via LinkedIn.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-t from-pink-100 to-white dark:from-gray-900 dark:to-black relative overflow-hidden transition-colors duration-300">

            {/* Decorative Floating Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 text-barbie-soft/40 text-6xl"
                >
                    <FaEnvelope />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 left-20 text-purple-300/40 text-5xl"
                >
                    <FaHeart />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 right-10 text-barbie-hot/20 text-7xl"
                >
                    <FaCommentDots />
                </motion.div>
            </div>

            {/* Decorative Blob */}
            <motion.div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full blur-3xl opacity-30 pointer-events-none"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Let's <span className="text-barbie-hot">Connect</span>!
                    </motion.h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Got a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-center">

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                    >
                        {[
                            { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/shivali-gaur-25bb7030b/', color: 'bg-blue-600' },
                            { name: 'Instagram', icon: <FaInstagram />, link: 'https://www.instagram.com/artismyserotonin/', color: 'bg-pink-600' },
                            { name: 'Pinterest', icon: <FaPinterest />, link: 'https://pinterest.com/shivaligaur31', color: 'bg-red-600' },
                            { name: 'Behance', icon: <FaBehance />, link: 'https://www.behance.net/shivaligaur1', color: 'bg-blue-500' },
                        ].map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.link}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all w-64 group border border-transparent hover:border-barbie-light/50"
                            >
                                <div className={`p-3 rounded-full text-white ${social.color} group-hover:rotate-12 transition-transform shadow-md`}>
                                    {social.icon}
                                </div>
                                <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-barbie-ruby transition-colors">{social.name}</span>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <div className="w-full max-w-lg">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700 relative overflow-hidden"
                                >
                                    {/* Top decorative line */}
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-barbie-hot to-purple-500"></div>

                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-pink-50/50 dark:bg-gray-900/50 text-gray-800 dark:text-white border-2 border-transparent focus:border-barbie-hot dark:focus:border-barbie-hot focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:shadow-lg focus:shadow-barbie-hot/10"
                                            placeholder="Shivali Gaur"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-pink-50/50 dark:bg-gray-900/50 text-gray-800 dark:text-white border-2 border-transparent focus:border-barbie-hot dark:focus:border-barbie-hot focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:shadow-lg focus:shadow-barbie-hot/10"
                                            placeholder="shivali@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-pink-50/50 dark:bg-gray-900/50 text-gray-800 dark:text-white border-2 border-transparent focus:border-barbie-hot dark:focus:border-barbie-hot focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:shadow-lg focus:shadow-barbie-hot/10"
                                            placeholder="Project inquiry, collaboration, etc."
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Message</label>
                                        <textarea
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl bg-pink-50/50 dark:bg-gray-900/50 text-gray-800 dark:text-white border-2 border-transparent focus:border-barbie-hot dark:focus:border-barbie-hot focus:bg-white dark:focus:bg-gray-900 transition-all outline-none resize-none focus:shadow-lg focus:shadow-barbie-hot/10"
                                            placeholder="Let's build something amazing together!"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSending}
                                        className={`w-full bg-gradient-to-r from-barbie-hot to-barbie-ruby text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-barbie-hot/30 transition-all flex items-center justify-center gap-2 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSending ? (
                                            <>Sending... <span className="animate-spin text-xl">✨</span></>
                                        ) : (
                                            <>Send Message <FaPaperPlane className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-12 rounded-3xl shadow-xl text-center border-2 border-green-100 dark:border-green-900 flex flex-col items-center justify-center h-full min-h-[400px] relative overflow-hidden"
                                >
                                    {/* Confetti Background for Success State */}
                                    <div className="absolute inset-0 bg-green-50/50 dark:bg-green-900/10 z-0"></div>

                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500 dark:text-green-300 text-5xl mb-6 shadow-inner relative z-10"
                                    >
                                        ✓
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Message Sent!</h3>
                                    <p className="text-gray-600 dark:text-gray-300 relative z-10">Thanks for reaching out! I'll get back to you faster than a pink convertible.</p>
                                    <button
                                        onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                                        className="mt-8 text-barbie-hot font-bold hover:underline relative z-10"
                                    >
                                        Send another message
                                    </button>

                                    {isConfetti && (
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ y: -20, opacity: 1, x: Math.random() * 400 - 200 }}
                                                    animate={{ y: 500, opacity: 0, rotate: 360 }}
                                                    transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
                                                    className="absolute top-0 left-1/2 w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: ['#FF69B4', '#FFD700', '#00BFFF'][Math.floor(Math.random() * 3)] }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
