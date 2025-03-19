
import React, { useEffect, useRef } from 'react';
import Calculator from '@/components/Calculator';

const Index = () => {
  // Refs for animation elements
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  // Animation on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe elements
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (calculatorRef.current) observer.observe(calculatorRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-4">
            Simple • Elegant • Precise
          </div>
          
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-on-scroll"
          >
            Calculate Your GPA
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg text-muted-foreground max-w-xl mx-auto animate-on-scroll"
          >
            A beautiful, intuitive calculator to track your academic performance with precision and elegance.
          </p>
        </header>
        
        <div 
          ref={calculatorRef}
          className="animate-on-scroll"
        >
          <Calculator />
        </div>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Designed with precision and care.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
