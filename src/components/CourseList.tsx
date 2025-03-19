
import React from 'react';
import { cn } from '@/lib/utils';
import { CourseData } from './CourseEntry';
import { getGradeValue } from './GradeScale';
import { X } from 'lucide-react';

interface CourseListProps {
  courses: CourseData[];
  onRemoveCourse: (id: string) => void;
  className?: string;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onRemoveCourse, className }) => {
  if (courses.length === 0) {
    return (
      <div className={cn(
        'p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm text-center',
        'transition-all duration-300',
        className
      )}>
        <p className="text-muted-foreground italic">No courses added yet</p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      'p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm',
      'transition-all duration-300',
      className
    )}>
      <h3 className="text-lg font-medium mb-4">Your Courses</h3>
      
      <div className="space-y-3 stagger-animation">
        {courses.map((course, index) => (
          <div 
            key={course.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm hover:shadow transition-all duration-200"
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
                className="p-1.5 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
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
  
  if (value >= 3.7) return 'bg-emerald-50 text-emerald-600';
  if (value >= 3.0) return 'bg-blue-50 text-blue-600';
  if (value >= 2.0) return 'bg-amber-50 text-amber-600';
  return 'bg-red-50 text-red-600';
};

export default CourseList;
