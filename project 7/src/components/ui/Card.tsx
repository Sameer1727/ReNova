import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}