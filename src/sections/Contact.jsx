import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaLinkedin, FaBehance, FaEnvelope, FaPinterest, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfetti, setIsConfetti] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setIsSubmitted(true);
            setIsConfetti(true);
            setTimeout(() => setIsConfetti(false), 5000);
        }, 1000);
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-t from-pink-100 to-white relative overflow-hidden">

            {/* Decorative Blob */}
            <motion.div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4"
                    >
                        Let's <span className="text-barbie-hot">Connect</span>!
                    </motion.h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all w-64 group"
                            >
                                <div className={`p-3 rounded-full text-white ${social.color} group-hover:rotate-12 transition-transform`}>
                                    {social.icon}
                                </div>
                                <span className="font-bold text-gray-700">{social.name}</span>
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
                                    className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 relative"
                                >
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-pink-50 border-2 border-transparent focus:border-barbie-hot focus:bg-white transition-all outline-none"
                                            placeholder="Shivali Gaur"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-pink-50 border-2 border-transparent focus:border-barbie-hot focus:bg-white transition-all outline-none"
                                            placeholder="shivali@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6 group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                        <textarea
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-lg bg-pink-50 border-2 border-transparent focus:border-barbie-hot focus:bg-white transition-all outline-none resize-none"
                                            placeholder="Let's build something amazing together!"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-barbie-hot to-barbie-ruby text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        Send Message <FaPaperPlane />
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-12 rounded-3xl shadow-xl text-center border-2 border-green-100 flex flex-col items-center justify-center h-full min-h-[400px]"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-5xl mb-6"
                                    >
                                        ✓
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                                    <p className="text-gray-600">Thanks for reaching out! I'll get back to you faster than a pink convertible.</p>
                                    <button
                                        onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                                        className="mt-8 text-barbie-hot font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>

                                    {isConfetti && (
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ y: -20, opacity: 1, x: Math.random() * 400 - 200 }}
                                                    animate={{ y: 500, opacity: 0, rotate: 360 }}
                                                    transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
                                                    className="absolute top-0 left-1/2 w-4 h-4 bg-barbie-hot rounded-full"
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
