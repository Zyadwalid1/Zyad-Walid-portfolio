import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isOverModal, setIsOverModal] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const particleIdRef = useRef(0);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobile = window.innerWidth < 768; // md breakpoint
      setIsTouchDevice(hasTouch || isMobile);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Particle trail effect
  const createParticle = (x, y) => {
    const colors = ['bg-indigo-400', 'bg-purple-400', 'bg-indigo-500', 'bg-purple-500'];
    const particle = {
      id: particleIdRef.current++,
      x,
      y,
      opacity: 1,
      scale: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    setParticles(prev => [...prev.slice(-8), particle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 1000);
  };

  useEffect(() => {
    const updateCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Check if cursor is over a modal dialog content (not backdrop or floating elements)
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Only hide cursor if inside actual modal dialog content
        const isModal = element.closest('[role="dialog"]') || 
                       element.closest('.modal') ||
                       element.closest('[class*="Modal"]');
        setIsOverModal(!!isModal);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Cursor variant handlers
    const handleHoverableEnter = (e) => {
      const element = e.target;
      setIsHovering(true);
      
      if (element.tagName === 'BUTTON' || element.closest('button')) {
        setCursorVariant('button');
      } else if (element.tagName === 'A' || element.closest('a')) {
        setCursorVariant('link');
      } else if (element.classList.contains('skill-card') || element.closest('.group')) {
        setCursorVariant('skill');
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        setCursorVariant('text');
      } else {
        setCursorVariant('hover');
      }
    };

    const handleHoverableLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, [role="button"], .group, .cursor-pointer'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverableEnter);
      el.addEventListener('mouseleave', handleHoverableLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter);
        el.removeEventListener('mouseleave', handleHoverableLeave);
      });
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      border: '2px solid rgba(99, 102, 241, 0.8)',
      backdropFilter: 'blur(4px)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      border: '2px solid rgba(168, 85, 247, 0.9)',
      backdropFilter: 'blur(6px)',
    },
    button: {
      scale: 2,
      backgroundColor: 'rgba(99, 102, 241, 0.25)',
      border: '3px solid rgba(99, 102, 241, 1)',
      backdropFilter: 'blur(8px)',
    },
    link: {
      scale: 1.8,
      backgroundColor: 'rgba(168, 85, 247, 0.25)',
      border: '2px solid rgba(168, 85, 247, 1)',
      backdropFilter: 'blur(7px)',
    },
    skill: {
      scale: 2.5,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      border: '3px solid rgba(139, 92, 246, 1)',
      backdropFilter: 'blur(10px)',
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(156, 163, 175, 0.2)',
      border: '1px solid rgba(156, 163, 175, 0.8)',
      backdropFilter: 'blur(4px)',
    }
  };

  // Don't render custom cursor on touch devices
  if (isTouchDevice) return null;

  // Hide cursor if not visible or over a modal
  if (!isVisible || isOverModal) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[40]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        {/* Center dot - always visible */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500" />
        
        {/* Simple ring */}
        <div className="absolute inset-0 rounded-full border border-indigo-400/50" />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[39]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1.1,
          opacity: isHovering ? 0.5 : 0.3
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.05
        }}
      />

      {/* Magnetic Field Indicator (for skill cards) - simplified */}
      {cursorVariant === 'skill' && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[38] border border-indigo-400/30"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
