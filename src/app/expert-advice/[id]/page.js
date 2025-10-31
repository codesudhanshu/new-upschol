'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAllCourses } from '@/app/api/admin/apiService'
import Layout from '@/components/Candidatepagelayout'
import { ChevronRight, ArrowLeft, BookOpen, Clock, Users, Trophy, Sparkles } from 'lucide-react'
import QuestionFlow from '@/components/QuestionFlow'

const CoursesPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
   const [answers, setAnswers] = useState({})

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getAllCourses();
        if (data?.status) {
          const selected = data.result.find(item => item._id === id);
          if (selected) {
            setCategory(selected);
          } else {
            setError('Category not found');
          }
        } else {
          setError('Failed to load courses');
        }
      } catch (err) {
        setError('Something went wrong while fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

    useEffect(() => {
    const savedExpertAdvice = localStorage.getItem("expertadvice")
    if (savedExpertAdvice) {
      const expertAdviceData = JSON.parse(savedExpertAdvice)
      setAnswers(expertAdviceData)
    }
  }, [])

  const handleCourseSelect = (course) => {
    const existingExpertAdvice = localStorage.getItem("expertadvice")
    let expertAdviceData = existingExpertAdvice ? JSON.parse(existingExpertAdvice) : {}

    const newAnswers = { ...expertAdviceData, courseName: course.courseName }
    setAnswers(newAnswers)

    localStorage.setItem("expertadvice", JSON.stringify(newAnswers))
    setSelectedCourse(course);
  }

  // If a course is selected, show the question flow
  if (selectedCourse) {
    return <QuestionFlow categoryId={id} initialProgress={22.22} />;
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="course_process_section">
          <div className="container">
            
            {/* Progress Bar - 16.66% for course selection */}
            <div className="progress_bar">
              <div 
                className="progress" 
                role="progressbar" 
                aria-label="Basic example" 
                aria-valuenow="11.11" 
                aria-valuemin="0" 
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{width: '11.11%'}}></div>
              </div>
            </div>

            {loading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-dark text-lg">Loading courses...</p>
              </div>
            )}

            {error && (
              <div className="text-center">
                <div className="bg-red-100 border border-red-300 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

          
          </div>
        </div>

        {/* Courses Section */}
        {!loading && category && (
          <div className="container">
            <div className="degree_heading text-center mb-12">
              <h2>Which online degree course you want to pursue?</h2>
            </div>

            {category.courses.length > 0 ? (
              <div className="degree_contant_box current_answer_process">
                <ul id="answerList" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course, index) => (
                    <li key={course._id}>
                      <input 
                        className="current_answer" 
                        name="current_answer" 
                        id={course.courseName}
                        type="radio" 
                        value={course._id}
                        onChange={() => handleCourseSelect(course)}
                      />
                      <label htmlFor={course.courseName}>
                        <span>
                          <img 
                            className="main_img" 
                            src="https://www.collegesathi.com/images/degree_icon.svg" 
                            alt="img" 
                          />
                        </span>
                        <span>
                          <img 
                            className="white_img" 
                            src="https://www.collegesathi.com/images/degree_icon_white.svg" 
                            alt="img" 
                          />
                        </span>
                        <div className="course-content">
                          <h3 className="text-xl font-bold text-dark mb-3 leading-tight">
                            {course.courseName}
                          </h3>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-dark mb-2">No Courses Available</h3>
                  <p className="text-gray-600">
                    No courses are currently available for this category. Please check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </Layout>
  )
}

export default CoursesPage