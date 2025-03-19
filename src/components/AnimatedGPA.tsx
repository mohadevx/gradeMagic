
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGPAProps {
  gpa: number;
  className?: string;
}

const AnimatedGPA: React.FC<AnimatedGPAProps> = ({ gpa, className }) => {
  const prevGpaRef = useRef(gpa);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const prevGpa = prevGpaRef.current;
    
    if (prevGpa !== gpa && elementRef.current) {
      // Add animation class
      elementRef.current.classList.add('animate-pulse-soft');
      
      // Remove animation class after animation completes
      const timeout = setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.classList.remove('animate-pulse-soft');
        }
      }, 1000);
      
      prevGpaRef.current = gpa;
      
      return () => clearTimeout(timeout);
    }
  }, [gpa]);
  
  // Determine color based on GPA
  const getGpaColor = () => {
    if (gpa >= 3.7) return 'text-emerald-500';
    if (gpa >= 3.0) return 'text-blue-500';
    if (gpa >= 2.0) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const gpaText = gpa ? gpa.toFixed(2) : '0.00';
  
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center p-6 rounded-2xl',
        'bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-md',
        'transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
        Current GPA
      </span>
      <div ref={elementRef} className={cn('text-5xl font-bold transition-colors duration-300', getGpaColor())}>
        {gpaText}
      </div>
      <div className="w-full mt-4 bg-secondary dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(gpa / 4 * 100, 100)}%` }}
        />
      </div>
      <div className="w-full flex justify-between mt-1 text-xs text-muted-foreground">
        <span>0.0</span>
        <span>4.0</span>
      </div>
    </div>
  );
};

export default AnimatedGPA;
