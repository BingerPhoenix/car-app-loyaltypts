import { useState, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useAnimationState = (initialState = false, delay = 0) => {
  const [isAnimating, setIsAnimating] = useState(initialState);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
    }
  }, [delay]);

  return [isAnimating, setIsAnimating];
};

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return [ref, isVisible && (triggerOnce ? !hasAnimated : true)];
};

export const useSequenceAnimation = (steps = [], interval = 100) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, interval]);

  return {
    currentStep,
    isPlaying,
    play,
    stop,
    pause,
    progress: (currentStep / steps.length) * 100
  };
};

export const useHoverAnimation = (duration = 200) => {
  const [isHovered, setIsHovered] = useState(false);

  const bind = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: {
      transition: `all ${duration}ms ease-in-out`
    }
  };

  return [isHovered, bind];
};

export const useDragAnimation = (onDragEnd) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragProps = {
    drag: true,
    dragElastic: 0.1,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    whileDrag: { scale: 1.05 },
    onDragStart: () => setIsDragging(true),
    onDragEnd: (event, info) => {
      setIsDragging(false);
      if (onDragEnd) {
        onDragEnd(info);
      }
    },
    animate: {
      x: position.x,
      y: position.y
    }
  };

  return {
    isDragging,
    position,
    setPosition,
    dragProps
  };
};