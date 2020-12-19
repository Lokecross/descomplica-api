import axios from 'axios';

const api = axios.create({
  baseURL: 'https://onesignal.com/',
  headers: {
    Authorization: `Bearer ${process.env.ONESIGNAL_REST_KEY}`,
  },
});

export default api;
