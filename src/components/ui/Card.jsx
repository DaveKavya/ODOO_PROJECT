import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = false, glass = false, ...props }) => {
  const baseStyles = "rounded-2xl overflow-hidden";
  const bgStyles = glass ? "glass" : "bg-white border border-slate-100 shadow-sm";
  
  const hoverProps = hoverEffect ? {
    whileHover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
    transition: { type: "spring", stiffness: 300 }
  } : {};

  return (
    <motion.div 
      className={`${baseStyles} ${bgStyles} ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
