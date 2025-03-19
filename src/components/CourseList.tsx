
import React from 'react';
import { cn } from '@/lib/utils';
import { CourseData } from './CourseEntry';
import { getGradeValue } from './GradeScale';
import { Trash2, X } from 'lucide-react';

interface CourseListProps {
  courses: CourseData[];
  onRemoveCourse: (id: string) => void;
  onClearCourses: () => void;
  className?: string;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  onRemoveCourse, 
  onClearCourses,
  className 
}) => {
  if (courses.length === 0) {
    return (
      <div className={cn(
        'p-6 rounded-2xl bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm text-center',
        'transition-all duration-300',
        className
      )}>
        <p className="text-muted-foreground italic">No courses added yet</p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      'p-6 rounded-2xl bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm',
      'transition-all duration-300',
      className
    )}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Courses</h3>
        <button
          onClick={onClearCourses}
          className="flex items-center text-xs text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
          aria-label="Clear all courses"
        >
          <Trash2 size={14} className="mr-1" />
          Clear All
        </button>
      </div>
      
      <div className="space-y-3 stagger-animation">
        {courses.map((course, index) => (
          <div 
            key={course.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm hover:shadow transition-all duration-200"
            style={{ '--animation-order': index } as React.CSSProperties}
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-medium truncate">{course.name}</p>
              <p className="text-xs text-muted-foreground">
                {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <span className={cn(
                  'text-sm font-semibold px-2 py-1 rounded-md',
                  getGradeClass(course.grade)
                )}>
                  {course.grade}
                </span>
                <span className="text-xs text-muted-foreground">
                  {getGradeValue(course.grade).toFixed(1)}
                </span>
              </div>
              
              <button
                onClick={() => onRemoveCourse(course.id)}
                className="p-1.5 rounded-full text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                aria-label={`Remove ${course.name}`}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get appropriate class for grade display
const getGradeClass = (grade: string): string => {
  const value = getGradeValue(grade);
  
  if (value >= 3.7) return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400';
  if (value >= 3.0) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
  if (value >= 2.0) return 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400';
  return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400';
};

export default CourseList;
