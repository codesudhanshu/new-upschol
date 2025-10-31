"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "./Candidatepagelayout"

export default function QuestionFlow({ categoryId, initialProgress = 22.22 }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const router = useRouter()

  // Load existing expertadvice from localStorage on component mount
  useEffect(() => {
    const savedExpertAdvice = localStorage.getItem("expertadvice")
    if (savedExpertAdvice) {
      const expertAdviceData = JSON.parse(savedExpertAdvice)
      // Set answers from existing expertadvice data
      setAnswers(expertAdviceData)
    }
  }, [])

  useEffect(() => {
    // All possible questions
    const allQuestions = [
      {
        question: "What is your latest Qualification?",
        field: "qualification",
        options: [
          { _id: 1, name: "Post Graduate" },
          { _id: 2, name: "Diploma Holder" },
          { _id: 3, name: "10+2" },
        ],
      },
      {
        question: "How much you have scored?",
        field: "percentage",
        options: [
          { _id: 4, name: "Above 90%" },
          { _id: 5, name: "70% - 90%" },
          { _id: 6, name: "Below 70%" },
        ],
      },
      {
        question: "Are you a Working Professional?",
        field: "professional",
        options: [
          { _id: 7, name: "Yes" },
          { _id: 8, name: "No" },
        ],
      },
      {
        question: "Preferred Learning method?",
        field: "method",
        options: [
          { _id: 9, name: "Weekends" },
          { _id: 10, name: "Weekdays" },
          { _id: 11, name: "Recorded" },
          { _id: 12, name: "Blended" },
        ],
      },
      {
        question: "What is your Budget?",
        field: "budget",
        options: [
          { _id: 13, name: "10-20 Lakh" },
          { _id: 14, name: "20-40 Lakh" },
          { _id: 15, name: "40+ Lakh" },
        ],
      },
      {
        question: "Are you Preferred EMI?",
        field: "emi_preferred",
        options: [
          { _id: 16, name: "Yes" },
          { _id: 17, name: "No" },
        ],
      },
      {
        question: "What is your EMI Budget?",
        field: "emi_budget",
        options: [
          { _id: 18, name: "Below 10k" },
          { _id: 19, name: "10k - 25k" },
          { _id: 20, name: "25k+" },
        ],
        // This question will only show if emi_preferred is "Yes"
        condition: (answers) => answers.emi_preferred === "Yes"
      },
    ]

    setQuestions(allQuestions)
  }, [])

  // Filter questions based on conditions
  useEffect(() => {
    const filtered = questions.filter(question => {
      if (question.condition) {
        return question.condition(answers)
      }
      return true
    })
    setFilteredQuestions(filtered)
  }, [questions, answers])

  const handleAnswer = (field, value) => {
    // Get existing expertadvice data
    const existingExpertAdvice = localStorage.getItem("expertadvice")
    let expertAdviceData = existingExpertAdvice ? JSON.parse(existingExpertAdvice) : {}
    
    // Update with new answer
    const newAnswers = { ...expertAdviceData, [field]: value }
    setAnswers(newAnswers)

    // Save to localStorage under "expertadvice" key
    localStorage.setItem("expertadvice", JSON.stringify(newAnswers))

    // Re-filter questions after answering
    const updatedFilteredQuestions = questions.filter(question => {
      if (question.condition) {
        return question.condition(newAnswers)
      }
      return true
    })

    // If current step is beyond filtered questions, adjust it
    let nextStep = currentStep + 1
    if (nextStep >= updatedFilteredQuestions.length) {
      // All questions completed
      router.push("/free-counselling")
      return
    }

    setCurrentStep(nextStep)
    setFilteredQuestions(updatedFilteredQuestions)
  }

  // Fixed progress calculation
  const calculateProgress = () => {
    if (filteredQuestions.length === 0) return initialProgress;
    
    // Available progress range after initial progress
    const availableProgress = 100 - initialProgress;
    
    // Progress per question
    const progressPerQuestion = availableProgress / filteredQuestions.length;
    
    // Current progress based on completed questions
    return initialProgress + (currentStep * progressPerQuestion);
  }

  const progressPercentage = calculateProgress();

  if (filteredQuestions.length === 0) return <p>Loading...</p>

  const currentQuestion = filteredQuestions[currentStep]

  return (
    <Layout>
    <div className="qboxes">
      <div className="container">
        
        {/* Progress Bar - Fixed progress */}
        <div className="progress_bar">
          <div 
            className="progress" 
            role="progressbar" 
            aria-label="Basic example" 
            aria-valuenow={progressPercentage} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            <div 
              className="progress-bar" 
              style={{width: `${progressPercentage}%`}}
            ></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{currentQuestion.question}</h2>
          <p className="text-gray-600 mt-2">
            Question {currentStep + 1} of {filteredQuestions.length}
          </p>
        </div>

        {/* HTML style boxes */}
        <div className="degree_contant_box">
          <ul>
            {currentQuestion.options.map((option) => (
              <li key={option._id}>
                <input
                  className="education_degree"
                  name={currentQuestion.field}
                  id={option.name}
                  type="radio"
                  value={option.name}
                  checked={answers[currentQuestion.field] === option.name}
                  onChange={() => handleAnswer(currentQuestion.field, option.name)}
                />
                <label htmlFor={option.name}>
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
                  <small>{option.name}</small>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  )
}