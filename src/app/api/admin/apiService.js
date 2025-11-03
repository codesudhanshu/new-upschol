import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Blog APIs
export const createBlog = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-blog`, data).then(res => res.data);
};

export const getAllBlogs = () => {
  return axios.get(`${API_BASE_URL}/admin/blogs`).then(res => res.data);
};

export const getBlogById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/blog/${id}`).then(res => res.data);
};

export const getBlogByIds = (id) => {
  return axios.get(`${API_BASE_URL}/admin/blogs/${id}`).then(res => res.data);
};

export const updateBlog = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/blog/${id}`, data).then(res => res.data);
};

export const deleteBlog = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/blog/${id}`).then(res => res.data);
};

export const getTrendingPosts = (id) => {
  return axios.get(`${API_BASE_URL}/admin/trending-blogs/${id}`).then(res => res.data);
};

export const getTrendingPostsAll = () => {
  return axios.get(`${API_BASE_URL}/admin/trending-blogs-data`).then(res => res.data);
};

// Testimonial APIs
export const createTestimonial = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-testimonial`, data).then(res => res.data);
};

export const getAllTestimonials = () => {
  return axios.get(`${API_BASE_URL}/admin/testimonials`).then(res => res.data);
};

export const getTestimonialById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/testimonial/${id}`).then(res => res.data);
};

export const updateTestimonial = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/testimonial/${id}`, data).then(res => res.data);
};

export const deleteTestimonial = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/testimonial/${id}`).then(res => res.data);
};

// Banner APIs
export const createBanner = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-banner`, data).then(res => res.data);
};

export const getAllBanners = () => {
  return axios.get(`${API_BASE_URL}/admin/banners`).then(res => res.data);
};

export const getBannerById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/banner/${id}`).then(res => res.data);
};

export const updateBanner = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/banner/${id}`, data).then(res => res.data);
};

export const deleteBanner = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/banner/${id}`).then(res => res.data);
};

// Industry Expert APIs
export const createIndustryExpert = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-industry-expert`, data).then(res => res.data);
};

export const getAllIndustryExperts = () => {
  return axios.get(`${API_BASE_URL}/admin/industry-experts`).then(res => res.data);
};

export const getIndustryExpertById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/industry-expert/${id}`).then(res => res.data);
};

export const updateIndustryExpert = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/industry-expert/${id}`, data).then(res => res.data);
};

export const deleteIndustryExpert = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/industry-expert/${id}`).then(res => res.data);
};



// Industry Expert APIs
export const createIndustryExpertTestimonials = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-industry-expert-testimonials`, data).then(res => res.data);
};

export const getAllIndustryExpertsTestimonials = () => {
  return axios.get(`${API_BASE_URL}/admin/industry-experts-testimonials`).then(res => res.data);
};

export const getAllIndustryExpertsTestimonialsHomepage = () => {
  return axios.get(`${API_BASE_URL}/admin/industry-experts-testimonials-homepage`).then(res => res.data);
};

export const getIndustryExpertByIdTestimonials = (id) => {
  return axios.get(`${API_BASE_URL}/admin/industry-expert-testimonials/${id}`).then(res => res.data);
};

export const updateIndustryExpertTestimonials = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/industry-expert-testimonials/${id}`, data).then(res => res.data);
};

export const deleteIndustryExpertTestimonials = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/industry-expert-testimonials/${id}`).then(res => res.data);
};

// Partner APIs
export const createPartner = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-partner`, data).then(res => res.data);
};

export const getAllPartners = () => {
  return axios.get(`${API_BASE_URL}/admin/partners`).then(res => res.data);
};

export const getPartnerById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/partner/${id}`).then(res => res.data);
};

export const updatePartner = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/partner/${id}`, data).then(res => res.data);
};

export const deletePartner = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/partner/${id}`).then(res => res.data);
};

// Company APIs
export const createCompany = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-company`, data).then(res => res.data);
};

export const getAllCompanies = () => {
  return axios.get(`${API_BASE_URL}/admin/companies`).then(res => res.data);
};

export const getCompanyById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/company/${id}`).then(res => res.data);
};

export const updateCompany = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/company/${id}`, data).then(res => res.data);
};

export const deleteCompany = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/company/${id}`).then(res => res.data);
};

// Approval APIs
export const createApproval = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-approval`, data).then(res => res.data);
};

export const getAllApprovals = () => {
  return axios.get(`${API_BASE_URL}/admin/get-approvals`).then(res => res.data);
};

export const getApprovalById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/approval/${id}`).then(res => res.data);
};

export const updateApproval = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/approval/${id}`, data).then(res => res.data);
};

export const deleteApproval = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/approval/${id}`).then(res => res.data);
};



//Annoucment APIs
export const createAnnouncement = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-announcement`, data).then(res => res.data);
};

export const getAllAnnouncement = () => {
  return axios.get(`${API_BASE_URL}/admin/announcement`).then(res => res.data);
};

export const getAnnouncementById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/announcement/${id}`).then(res => res.data);
};

export const updateAnnouncement = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/announcement/${id}`, data).then(res => res.data);
};


//job APIs
export const createjob = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-job`, data).then(res => res.data);
};

export const getAlljob = () => {
  return axios.get(`${API_BASE_URL}/admin/job`).then(res => res.data);
};



export const getjobById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/job/${id}`).then(res => res.data);
};

export const updatejob = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/job/${id}`, data).then(res => res.data);
};

export const deletejob = (id, data) => {
  return axios.delete(`${API_BASE_URL}/admin/job/${id}`, data).then(res => res.data);
};


export const applyForJob = (jobId, formData) => {
  return axios.post(`${API_BASE_URL}/admin/apply/${jobId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data);
};

// Get all applications (admin)
export const getAllApplications = (id) => {
  return axios.get(`${API_BASE_URL}/admin/applications/${id}`).then(res => res.data);
};

export const getUniversityByUrl = (collegeUrl) => {
  return axios
    .get(`${API_BASE_URL}/admin/university-data/${collegeUrl}`)
    .then((res) => res.data);
};


export const getAllCourses = () => {
  return axios
    .get(`${API_BASE_URL}/candidate/all-courses-data`)
    .then(res => res.data);
};


export const searchUniversities = (data) => {
  const datam = data ? data : "";
  return axios
    .get(`${API_BASE_URL}/candidate/search-universities/${datam}`)
    .then(res => res.data);
};


export const getAllfooterdata = () => {
  return axios.get(`${API_BASE_URL}/admin/getfooter`).then(res => res.data);
};


export const createSpecialization = (data) => {
  return axios.post(`${API_BASE_URL}/admin/create-specialization`, data).then(res => res.data);
};

export const getAllspecializations = () => {
  return axios.get(`${API_BASE_URL}/admin/specialization`).then(res => res.data);
};

export const getAllSpecializationshome = () => {
  return axios.get(`${API_BASE_URL}/admin/specializations-home`).then(res => res.data);
};

export const getSpecializationById = (url) => {
  return axios.get(`${API_BASE_URL}/admin/specialization/${url}`).then(res => res.data);
};

export const getspecializationsById = (id) => {
  return axios.get(`${API_BASE_URL}/admin/specializations/${id}`).then(res => res.data);
};

export const updatespecialization = (id, data) => {
  return axios.put(`${API_BASE_URL}/admin/specialization/${id}`, data).then(res => res.data);
};

export const deletespecialization = (id) => {
  return axios.delete(`${API_BASE_URL}/admin/specialization/${id}`).then(res => res.data);
};