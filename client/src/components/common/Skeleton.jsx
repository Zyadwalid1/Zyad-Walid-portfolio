import { motion } from 'framer-motion';

const Skeleton = ({ className = '', variant = 'default', count = 1 }) => {
  const variants = {
    default: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    button: 'h-10 rounded-lg',
    card: 'h-64 rounded-xl',
    avatar: 'w-32 h-32 rounded-full',
  };

  const skeletonClass = `bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse ${variants[variant]} ${className}`;

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={skeletonClass}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={skeletonClass}
    />
  );
};

// Preset skeleton components for common use cases
export const SkeletonCard = () => (
  <div className="bg-surface rounded-xl p-6 border border-primary-500/10 space-y-4">
    <Skeleton variant="title" className="w-3/4" />
    <Skeleton variant="text" count={3} />
    <div className="flex gap-2 pt-2">
      <Skeleton variant="button" className="w-24" />
      <Skeleton variant="button" className="w-24" />
    </div>
  </div>
);

export const SkeletonProfile = () => (
  <div className="flex flex-col md:flex-row items-center gap-8">
    <Skeleton variant="avatar" />
    <div className="flex-1 space-y-4 w-full">
      <Skeleton variant="title" className="w-1/2" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" count={3} />
      <Skeleton variant="button" className="w-32 mt-4" />
    </div>
  </div>
);

export const SkeletonExperience = () => (
  <div className="bg-surface rounded-xl p-6 border border-primary-500/10 space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton variant="circle" className="w-12 h-12" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="title" className="w-2/3" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" count={2} />
      </div>
    </div>
  </div>
);

export const SkeletonProject = () => (
  <div className="bg-surface rounded-xl overflow-hidden border border-primary-500/10">
    <Skeleton variant="rect" className="w-full h-48" />
    <div className="p-6 space-y-4">
      <Skeleton variant="title" className="w-3/4" />
      <Skeleton variant="text" count={2} />
      <div className="flex gap-2 flex-wrap">
        <Skeleton variant="default" className="w-16 h-6 rounded-full" />
        <Skeleton variant="default" className="w-20 h-6 rounded-full" />
        <Skeleton variant="default" className="w-16 h-6 rounded-full" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton variant="button" className="w-24" />
        <Skeleton variant="button" className="w-24" />
      </div>
    </div>
  </div>
);

export default Skeleton;
