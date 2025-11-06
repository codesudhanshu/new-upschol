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


export const LeadsAdd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/send-leads`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 

export const nmimsAdd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/send-nmims`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 


export const manipalAdd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/send-manipal`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 


export const LpuAdd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/send-lpu`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 


export const AmityAdd = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/send-amity`;
  return axios.post(url, data).then((res) => {
    return res.data;
  }); 
}; 

export const LeadsDeatils = (params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/candidate/leads`;
  return axios.get(url, { params }).then((res) => {
    return res.data;
  });
};

