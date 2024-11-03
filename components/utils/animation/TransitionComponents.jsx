import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useAnimation';

export const Reveal = ({ children, direction = 'up', delay = 0, duration = 0.5 }) => {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeTransition = ({ children, isVisible = true, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    exit={{ opacity: 0 }}
    {...props}
  >
    {children}
  </motion.div>
);

export const Collapse = ({ children, isOpen, duration = 0.3 }) => (
  <motion.div
    initial="collapsed"
    animate={isOpen ? "open" : "collapsed"}
    variants={{
      open: { height: "auto", opacity: 1 },
      collapsed: { height: 0, opacity: 0 }
    }}
    transition={{
      duration,
      ease: "easeInOut"
    }}
    style={{ overflow: "hidden" }}
  >
    {children}
  </motion.div>
);

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.3,
      type: "tween"
    }}
  >
    {children}
  </motion.div>
);

export const RotateTransition = ({ 
  children, 
  isActive, 
  degrees = 180 
}) => (
  <motion.div
    animate={{ rotate: isActive ? degrees : 0 }}
    transition={{
      duration: 0.3,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

export const LoadingSpinner = ({ size = 24, color = "currentColor" }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      width: size,
      height: size,
      border: `2px solid ${color}`,
      borderTopColor: "transparent",
      borderRadius: "50%"
    }}
  />
);