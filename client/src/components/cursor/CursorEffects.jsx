import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Subtle Ambient Cursor Glow */}
      <motion.div
        className="fixed w-32 h-32 rounded-full pointer-events-none z-[37]"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

export default CursorEffects;
