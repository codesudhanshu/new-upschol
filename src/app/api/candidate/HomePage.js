import axios from 'axios';


export const getAllAnnouncementData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-announcement-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 

export const getAllCoursesData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-courses-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 

export const getAllBannerData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-banner-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 


export const getAllCompanyData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-company-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 

export const getAllFAQData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-faq-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 


export const getAllIndustryExpertData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-industry-experts-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 



export const getAllTestimonialData = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-testimonial-data`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 


export const getAllstate = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/all-state`;
  return axios.get(url).then((res) => {
    return res.data;
  }); 
}; 


export const getAllcity = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/selected-districts-by-state/${id}`;
  return axios.get(url).then((res) => {
    return res.data;
  }); 
}; 


export const freecounsellingadd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/submit-free-counselling`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 


export const universitypageadd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/univeristy-page`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 

export const enquirygadd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/enquiry-now`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 

export const contactusadd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/contact-us`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 


export const homepageadd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/home-page-enquiry`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 