import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/helpers';

// Common animation variants
export const fadeInVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUpVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const slideInRightVariants = {
  initial: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const scaleVariants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Main animation wrapper component
const AnimationWrapper = ({
  children,
  variants = fadeInVariants,
  className = "",
  duration = 0.2,
  delay = 0,
  type = "tween",
  isPresent = true,
  ...props
}) => {
  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{
            duration,
            delay,
            type
          }}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Specialized animation components
export const FadeIn = ({ children, ...props }) => (
  <AnimationWrapper variants={fadeInVariants} {...props}>
    {children}
  </AnimationWrapper>
);

export const SlideUp = ({ children, ...props }) => (
  <AnimationWrapper variants={slideUpVariants} {...props}>
    {children}
  </AnimationWrapper>
);

export const SlideInRight = ({ children, ...props }) => (
  <AnimationWrapper variants={slideInRightVariants} {...props}>
    {children}
  </AnimationWrapper>
);

export const Scale = ({ children, ...props }) => (
  <AnimationWrapper variants={scaleVariants} {...props}>
    {children}
  </AnimationWrapper>
);

// List animation component
export const AnimatedList = ({ 
  items, 
  renderItem, 
  staggerDelay = 0.05,
  ...props 
}) => (
  <AnimatePresence>
    {items.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.2,
          delay: index * staggerDelay,
          type: "tween"
        }}
        {...props}
      >
        {renderItem(item)}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default AnimationWrapper;