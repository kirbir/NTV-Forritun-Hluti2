import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const StaggeredReveal = ({ children, delay = 0, className = "" }: StaggeredRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredReveal; 