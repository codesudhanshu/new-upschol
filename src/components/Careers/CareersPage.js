"use client";
import { getAlljob, applyForJob } from "@/app/api/admin/apiService";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function JobListings() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    description: "",
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAlljob();
        console.log("API Response:", data);

        if (data.status && data.result && data.result.jobs) {
          const activeJobs = data.result.jobs.filter(job => job.status === "active");
          setJobs(activeJobs);
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Error fetching jobs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleJobDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplicationOpen(true);
    setApplicationData(prev => ({
      ...prev,
      job_position: job.title
    }));
  };

  const closeApplicationModal = () => {
    setIsApplicationOpen(false);
    setSelectedJob(null);
    setApplicationData({
      name: "",
      email: "",
      mobile_number: "",
      description: "",
      resume: null,
      job_position: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setApplicationData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setApplicationData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', applicationData.name);
      formData.append('email', applicationData.email);
      formData.append('mobile_number', applicationData.mobile_number);
      formData.append('job_position', applicationData.job_position);
      formData.append('description', applicationData.description);
      formData.append('resume', applicationData.resume);

      const result = await applyForJob(selectedJob._id, formData);
      
      if (result.status) {
        // Success Swal
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully!',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true
        });
        
        closeApplicationModal();
      } else {
        // Error Swal
        Swal.fire({
          title: 'Error!',
          text: result.error || 'Failed to submit application',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (err) {
      console.error("Application error:", err);
      
      // Error Swal with detailed message
      Swal.fire({
        title: 'Application Failed!',
        text: err.response?.data?.error || 'Error submitting application. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSalary = (budget) => {
    if (!budget) return "Not specified";
    return budget.includes("Laks") ? budget : `${budget} Lacs`;
  };

  // Loading Swal
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center mx-4 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-[#14081E] mx-auto mb-4"></div>
          <p className="text-[#14081E] text-lg sm:text-xl font-semibold">
            Loading jobs...
          </p>
        </div>
      </div>
    );
  }

  // Error Swal alternative (since we can't use Swal in render)
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center mx-2 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-4 shadow-lg">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-[#14081E] text-base sm:text-lg font-semibold mb-2">
              Error Loading Jobs
            </h3>
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-page">
      {/* Career Banner */}
      <div className="career-banner">
        <div className="container">
          <h1>Celebrating 8 Years of Upschol</h1>
          <img 
            alt="" 
            src="https://onlinevidhya.com/live/images/career.png"
            className="banner-image"
          />
        </div>
      </div>

      {/* Career Section */}
      <div className="career-section py-5">
        <div className="container">
          <div className="career-section-heading text-center mb-5">
            <h2 className="inner_heading mb-3">YOUR JOB, YOUR WAY!</h2>
            <p>Align with our shared passion, create your own path with the growth mindset.</p>
            <p>At Collegesathi, we offer a unique opportunity to shape your role with a growth mindset. Join us to define 'Your Job, Your Way' and drive your professional development. Be a part of dynamic team that values innovation, learning, and empowerment. Hand in hand, there's no limit to what we can achieve!</p>
          </div>

          {/* Career List */}
          <div className="career-list">
            <ul className="career_list">
              {jobs.map((job) => (
                <li key={job._id}>
                  <div className="career-box">
                    <div className="left-content">
                      <h3>{job.title}</h3>
                      <div className="jop-type"><b>Job Type :</b> Permanent</div>
                    </div>
                    <div className="right-content">
                      <button 
                        className={`btn-primary viewDetailsBtn ${expandedJobId === job._id ? '' : 'collapsed'}`}
                        onClick={() => toggleJobDetails(job._id)}
                      >
                        <span className="viewDetailsText">
                          {expandedJobId === job._id ? 'Close' : 'View details'}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Job Details - Conditionally Rendered */}
                  {expandedJobId === job._id && (
                    <div className="detailsJob">
                      <div className="details-list">
                        <ul>
                          <li className="flex-100">
                            <div className="details-listInner">
                              <figure>
                                <img src="https://www.collegesathi.com/images/task_alt.svg" alt="Job position" />
                              </figure>
                              <span>Description</span>
                              <div className="skill-set">
                                <p>{job.description}</p>
                              </div>
                            </div>
                          </li>
                          <li className="flex-100">
                            <div className="details-listInner">
                              <figure>
                                <img src="https://www.collegesathi.com/images/task_alt.svg" alt="Job position" />
                              </figure>
                              <span>Skill</span>
                              <div className="skill-set">
                                Good communication, Active listening skills, Self-motivated
                              </div>
                            </div>
                          </li>
                          <li className="flex-100">
                            <div className="details-listInner">
                              <figure>
                                <img src="https://www.collegesathi.com/images/school_black.svg" alt="Job position" />
                              </figure>
                              <span>Education</span>
                              <strong>{job.qualification}</strong>
                            </div>
                          </li>
                          <li className="flex-100">
                            <div className="details-listInner">
                              <figure>
                                <img src="https://www.collegesathi.com/images/badge_black.svg" alt="Job position" />
                              </figure>
                              <span>Work Experience</span>
                              <strong>{job.experience} years</strong>
                            </div>
                          </li>
                          <li className="flex-100">
                            <div className="details-listInner">
                              <figure>
                                <img src="https://www.collegesathi.com/images/room_black.svg" alt="Job position" />
                              </figure>
                              <span>Work Location</span>
                              <strong>Jaipur, Gurgaon</strong>
                            </div>
                          </li>
                        </ul>
                        <div className="d-flex justify-content-end">
                          <button 
                            className="btn-primary apply_career"
                            onClick={() => handleApplyClick(job)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplicationOpen && selectedJob && (
        <div className="modal modalJob show" style={{ display: 'block', paddingLeft: '0px', backgroundColor: "rgb(0,0,0,.5)"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply for {selectedJob.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeApplicationModal}
                  disabled={isSubmitting}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-box">
                  <form 
                    className="form" 
                    id="career_apply_form" 
                    encType="multipart/form-data"
                    onSubmit={handleSubmitApplication}
                  >
                    <div className="form-group">
                      <input type="hidden" name="career_id" value="8" />
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="text" 
                        placeholder="Full Name*" 
                        name="name" 
                        value={applicationData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="email" 
                        placeholder="Email Address*" 
                        name="email" 
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="form-group">
                     <input
  type="text"
  inputMode="numeric"
  placeholder="Mobile Number*"
  name="mobile_number"
  value={applicationData.mobile_number}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ''); // remove non-numeric characters
    if (value.length <= 10) {
      handleInputChange({ target: { name: 'mobile_number', value } });
    }
  }}
  maxLength={10}
  required
  disabled={isSubmitting}
/>

                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="text" 
                        placeholder="Job Position*" 
                        name="job_position" 
                        value={applicationData.job_position || selectedJob.title}
                        readOnly
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="form-group">
                      <textarea 
                        placeholder="Tell us why you're a good fit for this position*" 
                        name="description" 
                        value={applicationData.description}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows="4"
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="upload_cv" className="uploadFile">
                        <input 
                          type="file" 
                          name="resume" 
                          id="upload_cv"
                          onChange={handleInputChange}
                          accept=".pdf,.doc,.docx"
                          required
                          disabled={isSubmitting}
                        />
                        <span>
                          <img src="https://www.collegesathi.com/images/cloud_upload.svg" alt="Img" />
                          <div className="text-[#8D0DFE]">
                            {applicationData.resume ? applicationData.resume.name : 'Upload CV (PDF, DOC, DOCX)'}
                          </div>
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-100" 
                      disabled={isSubmitting}
                      style={{backgroundColor: "#8D0DFE"}}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}