import axios from 'axios';

// Create FAQ
export const createFAQ = (data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/create-faq`;
  return axios.post(url, data).then((res) => {
    return res.data;
  });
};

// Get all FAQs
export const getAllfaq = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/faq`).then(res => res.data);
};

// Update FAQ
export const updateFAQ = (id, data) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/faq/${id}`;
  return axios.put(url, data).then((res) => {
    return res.data;
  });
};

// Delete FAQ
export const deleteFAQ = (id) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/faq/${id}`;
  return axios.delete(url).then((res) => {
    return res.data;
  });
};