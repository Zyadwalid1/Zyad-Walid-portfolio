import { motion } from 'framer-motion';

const Loading = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const content = (
    <motion.div
      variants={spinnerVariants}
      animate="animate"
      className={`
        ${sizes[size]}
        border-4 border-primary-200
        border-t-primary-500
        rounded-full
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
};

export default Loading;
