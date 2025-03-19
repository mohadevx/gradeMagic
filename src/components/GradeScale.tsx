
import React from 'react';
import { cn } from '@/lib/utils';

export type GradeType = {
  letter: string;
  value: number;
}

const GRADE_SCALE: GradeType[] = [
  { letter: 'A+', value: 4.0 },
  { letter: 'A', value: 4.0 },
  { letter: 'A-', value: 3.7 },
  { letter: 'B+', value: 3.3 },
  { letter: 'B', value: 3.0 },
  { letter: 'B-', value: 2.7 },
  { letter: 'C+', value: 2.3 },
  { letter: 'C', value: 2.0 },
  { letter: 'C-', value: 1.7 },
  { letter: 'D+', value: 1.3 },
  { letter: 'D', value: 1.0 },
  { letter: 'F', value: 0.0 },
];

export const getGradeValue = (letter: string): number => {
  const grade = GRADE_SCALE.find(g => g.letter === letter);
  return grade ? grade.value : 0;
};

interface GradeScaleProps {
  className?: string;
}

const GradeScale: React.FC<GradeScaleProps> = ({ className }) => {
  return (
    <div className={cn(
      "rounded-xl bg-white/50 dark:bg-gray-800/30 p-4 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm", 
      className
    )}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Grade Scale</h3>
      <div className="grid grid-cols-4 gap-2 text-sm">
        {GRADE_SCALE.map((grade, index) => (
          <div 
            key={grade.letter} 
            className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-gray-800/50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="font-medium">{grade.letter}</span>
            <span className="text-muted-foreground">{grade.value.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { GRADE_SCALE, GradeScale };
