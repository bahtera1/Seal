import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({
    children,
    className = '',
    animation = 'fadeUp',
    delay = 0,
    duration = 0.6,
    ...props
}) => {
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 }
        },
        fadeRight: {
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
        },
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration,
                delay: delay * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            variants={variants[animation] || variants.fadeUp}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
