import { useRef, useEffect } from 'react';

export const useMagneticCursor = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only apply magnetic effect within a certain radius
      const maxDistance = 100;
      if (distance < maxDistance) {
        const magneticX = deltaX * strength;
        const magneticY = deltaY * strength;
        
        element.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
      element.style.transition = 'transform 0.3s ease-out';
    };

    const handleMouseEnter = () => {
      element.style.transition = 'transform 0.1s ease-out';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
};
