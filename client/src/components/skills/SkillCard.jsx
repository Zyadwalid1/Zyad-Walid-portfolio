import { motion } from 'framer-motion';
import { useMagneticCursor } from '../../hooks/useMagneticCursor';

const SkillCard = ({ skill, index, rowType = 'primary' }) => {
  const magneticRef = useMagneticCursor(0.2);

  const getRowStyles = () => {
    switch (rowType) {
      case 'accent':
        return {
          glowColors: 'from-accent/30 to-primary-500/30',
          glowColors2: 'from-accent/20 to-primary-400/20',
          glowColors3: 'from-white/10 to-accent/10',
          borderHover: 'hover:border-accent/80',
          shadowColor: 'hover:shadow-accent/25',
          textColor: 'group-hover:text-accent',
          bgGradient: 'linear-gradient(135deg, rgba(var(--accent), 0.1), rgba(var(--primary-500), 0.05))',
          borderColor: 'rgba(var(--accent), 0.8)',
          iconFilter: 'drop-shadow(0 0 8px rgba(var(--accent), 0.6))',
          iconRotation: [0, 5, -5, 0],
          emojiRotation: -360,
          particleColors: ['bg-accent', 'bg-primary-400', 'bg-accent/80']
        };
      case 'premium':
        return {
          glowColors: 'from-primary-500/30 via-accent/20 to-primary-400/30',
          glowColors2: 'from-primary-400/20 via-white/10 to-accent/20',
          glowColors3: 'from-white/15 to-primary-500/10',
          borderHover: 'hover:border-primary-400/80',
          shadowColor: 'hover:shadow-primary-400/30',
          textColor: 'group-hover:text-primary-400',
          bgGradient: 'linear-gradient(135deg, rgba(var(--primary-500), 0.12), rgba(var(--accent), 0.08))',
          borderColor: 'rgba(var(--primary-400), 0.9)',
          iconFilter: 'drop-shadow(0 0 12px rgba(var(--primary-400), 0.8))',
          iconRotation: [0, -10, 10, -5, 0],
          emojiRotation: [0, 180, 360],
          particleColors: ['bg-primary-400', 'bg-accent', 'bg-primary-300', 'bg-white/60'],
          particleSizes: ['w-1.5 h-1.5', 'w-1 h-1', 'w-1 h-1', 'w-1.5 h-1.5']
        };
      default:
        return {
          glowColors: 'from-primary-500/30 to-accent/30',
          glowColors2: 'from-primary-400/20 to-accent/20',
          glowColors3: 'from-white/10 to-primary-500/10',
          borderHover: 'hover:border-primary-400/80',
          shadowColor: 'hover:shadow-primary-500/25',
          textColor: 'group-hover:text-primary-400',
          bgGradient: 'linear-gradient(135deg, rgba(var(--primary-500), 0.1), rgba(var(--accent), 0.05))',
          borderColor: 'rgba(var(--primary-400), 0.8)',
          iconFilter: 'drop-shadow(0 0 8px rgba(var(--primary-500), 0.6))',
          iconRotation: [0, -5, 5, 0],
          emojiRotation: 360,
          particleColors: ['bg-primary-400', 'bg-accent', 'bg-primary-300']
        };
    }
  };

  const styles = getRowStyles();
  const rotateDirection = rowType === 'accent' ? -15 : rowType === 'premium' ? 10 : 15;
  const rotateYDirection = rowType === 'accent' ? -10 : rowType === 'premium' ? 15 : 10;

  return (
    <motion.div
      className="flex-shrink-0 relative"
      whileHover={{ 
        scale: 1.08, 
        y: -8
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      <div className="relative group cursor-pointer hover:z-50 skill-card">
        {/* Single glow layer for better performance */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.glowColors} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
        
        {/* Main card with enhanced styling */}
        <motion.div 
          className={`relative bg-surface/95 backdrop-blur-md border border-primary-500/30 ${styles.borderHover} rounded-2xl p-6 w-32 h-32 flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl ${styles.shadowColor}`}
          whileHover={{
            background: styles.bgGradient,
            borderColor: styles.borderColor
          }}
        >
          {skill.icon ? (
            <motion.img 
              src={skill.icon} 
              alt={skill.name.en}
              className="w-12 h-12 mb-2 object-contain"
              whileHover={{
                scale: 1.1
              }}
              transition={{
                duration: 0.2
              }}
            />
          ) : (
            <motion.div 
              className="text-4xl mb-2"
              whileHover={{
                scale: 1.15
              }}
              transition={{
                duration: 0.2
              }}
            >🚀</motion.div>
          )}
          <p 
            className={`text-xs font-semibold text-center text-text ${styles.textColor} transition-colors duration-200`}
          >{skill.name.en}</p>
        </motion.div>
        
        {/* Simplified corner accents - no animations */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-primary-400 rounded-full" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-accent rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
