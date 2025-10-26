import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}}
      className={`
        bg-surface rounded-xl p-6
        border border-primary-200/30 dark:border-primary-800/30
        transition-all duration-300
        hover:border-primary-500/50
        backdrop-blur-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
