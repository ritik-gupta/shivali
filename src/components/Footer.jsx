import { motion } from 'framer-motion';
import { FaPenNib } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-white py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-barbie-hot to-barbie-ruby opacity-50"></div>
            <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-display font-bold mb-6">Thanks for visiting! 💖</h3>

                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Shivali Gaur. Designed with style & glitter.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
