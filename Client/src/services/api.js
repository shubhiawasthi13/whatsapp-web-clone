import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchMessages = () => API.get('/messages');
export const sendMessage = (data) => API.post('/messages', data);
export const updateStatus = (id, status) =>
  API.put(`/messages/${id}/status`, { status });
