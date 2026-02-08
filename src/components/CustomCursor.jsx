import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);

        // Add listeners to interactive elements
        const links = document.querySelectorAll('a, button, .cursor-hover');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []); // Note: in a real app, you'd want to use MutationObserver or Context to handle dynamic content

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            width: 20,
            height: 20,
            backgroundColor: 'transparent',
            borderColor: '#FF69B4',
        },
        hover: {
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255, 105, 180, 0.2)',
            borderColor: 'transparent',
            mixBlendMode: 'difference',
        }
    };

    return (
        <motion.div
            className="custom-cursor fixed top-0 left-0 border-2 rounded-full pointer-events-none z-[9999]"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        />
    );
};

export default CustomCursor;
