'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCourses } from '@/app/api/admin/apiService'
import Layout from './Candidatepagelayout'

const ExpertAdvice = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        if (data?.status) {
          setCategories(data.result);
        } else {
          setError('Failed to load course categories');
        }
      } catch (err) {
        setError('Something went wrong while fetching course categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDegreeSelect = (category) => {
    setSelectedDegree(category._id);
    localStorage.setItem("degree",category.name)
    setTimeout(() => {
      router.push(`/expert-advice/${category._id}`);
    }, 300);
  };

  // Map category names to match the original values
  const getDegreeValue = (categoryName) => {
    const nameMap = {
      'UG': '1',
      'PG': '2', 
      'Executive Programs': '3',
      'AI ML/Data Science': '4',
      'Certifications': '5',
      'Law (LL.M.)': '6'
    };
    return nameMap[categoryName] || '1';
  };

  return (
    <Layout>
      <section className="">
        <div className="container">
          {/* Progress Bar */}
          <div className="progress_bar">
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Heading */}
          <div className="degree_heading text-center">
            <span>Your best match is just 2 minutes away!</span>
            <h1>Which degree are you interested in?</h1>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="error help-inline course_error">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Degree Options */}
          {!loading && !error && (
            <div className="degree_contant_box">
              <ul>
                {categories.map((category) => (
                  <li key={category._id}>
                    <input 
                      className="education_degree" 
                      name="education_degree" 
                      id={category.name}
                      type="radio" 
                      value={getDegreeValue(category.name)}
                      checked={selectedDegree === category._id}
                      onChange={() => handleDegreeSelect(category)}
                    />
                    <label htmlFor={category.name}>
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
                      <small>{category.name}</small>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      </Layout>
  )
}

export default ExpertAdvice