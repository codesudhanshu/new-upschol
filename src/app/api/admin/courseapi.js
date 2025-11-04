import axios from 'axios';

export const courseCategoryList = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-category`;
  return axios.get(url,).then((res) => {
    return res.data;
  }); 
}; 


export const departmentList = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-departments`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const getDepartmentById = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-departments/${id}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const adddepartment = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/add-department`;
  return axios.post(url, data).then((res) => {
    return res.data;
  });
};

export const updatedepartment = (id, data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/update-department/${id}`;
  return axios.put(url, data).then((res) => {
    return res.data;
  });
};

export const deletedepartment = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/delete-department/${id}`;
  return axios.delete(url).then((res) => {
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

export const updateCourse = (id, data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/update-course/${id}`;
  return axios.put(url, data).then((res) => {
    return res.data;
  });
};

export const deleteCourse = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/delete-course/${id}`;
  return axios.delete(url).then((res) => {
    return res.data;
  });
};

export const getCourseById = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course/${id}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

   // api/admin/courseapi.js
export const addcoursecatgory = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/add-course-category`;
  return axios.post(url, data).then((res) => {
    return res.data;
  });
};

export const getCourseCategories = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/course-category`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const updateCourseCategory = (id, data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/update-course-category/${id}`;
  return axios.put(url, data).then((res) => {
    return res.data;
  });
};

export const deleteCourseCategory = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/delete-course-category/${id}`;
  return axios.delete(url).then((res) => {
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