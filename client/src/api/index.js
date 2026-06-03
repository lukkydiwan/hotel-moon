import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getRooms = (params) => api.get('/rooms', { params });
export const getFeaturedRooms = () => api.get('/rooms/featured');
export const getRoom = (id) => api.get(`/rooms/${id}`);
export const createRoom = (data) => api.post('/rooms', data);
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = () => api.get('/bookings');
export const getBookingStats = () => api.get('/bookings/stats');
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export const sendContact = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/contact');
export const markMessageRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

export const adminLogin = (data) => api.post('/auth/login', data);
export const getAdminMe = () => api.get('/auth/me');

export default api;
