import axios from 'axios';

  export const createFAQ = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/create-faq`;
    return axios.post(url,data).then((res) => {
      return res.data;
    });
  };

  export const getAllfaq = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/faq`).then(res => res.data);
};