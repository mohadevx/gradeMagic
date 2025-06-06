
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CourseEntry, { CourseData } from './CourseEntry';
import CourseList from './CourseList';
import AnimatedGPA from './AnimatedGPA';
import { GradeScale, getGradeValue } from './GradeScale';
import { setCookie, getCookie } from '@/utils/cookieUtils';

interface CalculatorProps {
  className?: string;
}

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [gpa, setGpa] = useState(0);
  
  // Load courses from cookies on initial render
  useEffect(() => {
    const savedCourses = getCookie('courses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourses(parsedCourses);
      } catch (error) {
        console.error('Error parsing saved courses:', error);
      }
    }
  }, []);
  
  // Save courses to cookies whenever they change
  useEffect(() => {
    if (courses.length > 0) {
      setCookie('courses', JSON.stringify(courses));
    }
  }, [courses]);
  
  // Add a new course
  const handleAddCourse = (course: CourseData) => {
    setCourses(prev => [...prev, course]);
  };
  
  // Remove a course
  const handleRemoveCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };
  
  // Clear all courses
  const handleClearCourses = () => {
    if (window.confirm('Are you sure you want to clear all courses?')) {
      setCourses([]);
      setCookie('courses', '');
    }
  };
  
  // Calculate GPA whenever courses change
  useEffect(() => {
    if (courses.length === 0) {
      setGpa(0);
      return;
    }
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      const gradeValue = getGradeValue(course.grade);
      totalPoints += gradeValue * course.credits;
      totalCredits += course.credits;
    });
    
    const calculatedGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setGpa(calculatedGpa);
  }, [courses]);
  
  return (
    <div className={cn(
      'w-full max-w-4xl mx-auto',
      className
    )}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CourseEntry onAddCourse={handleAddCourse} />
          
          <div className="mt-6">
            <CourseList 
              courses={courses} 
              onRemoveCourse={handleRemoveCourse} 
              onClearCourses={handleClearCourses}
            />
          </div>
        </div>
        
        <div>
          <AnimatedGPA gpa={gpa} />
          
          <div className="mt-6">
            <GradeScale />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
