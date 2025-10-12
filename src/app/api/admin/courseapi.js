import axios from 'axios';

export const courseCategoryList = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-category`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 

export const departmentList = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-departments`;
    return axios.get(url,).then((res) => {
      return res.data;
    });
  };

  export const subcourseList = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/subcourse-department/`;
    return axios.get(url,).then((res) => {
      return res.data;
    });
  };

  export const addcourse = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/add-course`;
    return axios.post(url,data).then((res) => {
      return res.data;
    });
  };

  export const getAllCourses = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/courses`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 

   export const addcoursecatgory = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/add-course-category`;
    return axios.post(url,data).then((res) => {
      return res.data;
    });
  };

  export const adddepartment = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/add-department`;
    return axios.post(url,data).then((res) => {
      return res.data;
    });
  };

//university APIs
export const createuniversity = (data) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/create-university`, data).then(res => res.data);
};

export const getAlluniversity = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/universities`).then(res => res.data);
};

export const getuniversityById = (id) => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/university/${id}`).then(res => res.data);
};

export const updateuniversity = (id, data) => {
  return axios.put(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/university/${id}`, data).then(res => res.data);
};


export const getAllpartnersdata = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/partner-university`).then(res => res.data);
};

export const getUniversitydataBycollegeUrl  = (collegeUrl) => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/university-data-compare/${collegeUrl}`).then(res => res.data);
};