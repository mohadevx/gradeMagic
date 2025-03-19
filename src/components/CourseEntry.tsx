
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GRADE_SCALE } from './GradeScale';

export type CourseData = {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface CourseEntryProps {
  onAddCourse: (course: CourseData) => void;
  className?: string;
}

const CourseEntry: React.FC<CourseEntryProps> = ({ onAddCourse, className }) => {
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState(3);
  const [grade, setGrade] = useState('A');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) return;
    
    const newCourse: CourseData = {
      id: Date.now().toString(),
      name: courseName.trim(),
      credits,
      grade
    };
    
    onAddCourse(newCourse);
    setCourseName('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        'p-6 rounded-2xl bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm',
        'transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      <h3 className="text-lg font-medium mb-4">Add a Course</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-muted-foreground mb-1">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g. Introduction to Computer Science"
            className="tama-input w-full dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-white dark:placeholder:text-gray-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-muted-foreground mb-1">
              Credits
            </label>
            <select
              id="credits"
              value={credits}
              onChange={(e) => setCredits(Number(e.target.value))}
              className="tama-input w-full dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-white"
            >
              {[1, 2, 3, 4, 5, 6].map(credit => (
                <option key={credit} value={credit}>{credit}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-muted-foreground mb-1">
              Grade
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="tama-input w-full dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-white"
            >
              {GRADE_SCALE.map(g => (
                <option key={g.letter} value={g.letter}>
                  {g.letter} ({g.value.toFixed(1)})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full tama-button bg-primary text-white hover:bg-primary/90 mt-2 dark:bg-primary/80 dark:hover:bg-primary/70"
        >
          Add Course
        </button>
      </div>
    </form>
  );
};

export default CourseEntry;
