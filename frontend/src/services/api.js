import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  logout: () => api.post('/users/logout'),
  getCurrentUser: () => api.get('/users/current-user'),
  refreshToken: () => api.post('/users/refresh-token'),
};

// Video APIs
export const videoAPI = {
  getAllVideos: (params) => api.get('/videos', { params }),
  getVideoById: (videoId) => api.get(`/videos/${videoId}`),
  uploadVideo: (videoData) => api.post('/videos', videoData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateVideo: (videoId, videoData) => api.patch(`/videos/${videoId}`, videoData),
  deleteVideo: (videoId) => api.delete(`/videos/${videoId}`),
  togglePublishStatus: (videoId) => api.patch(`/videos/toggle/publish/${videoId}`),
  getChannelVideos: (channelId) => api.get(`/videos/channel/${channelId}`),
};

// Like APIs
export const likeAPI = {
  toggleVideoLike: (videoId) => api.post(`/likes/toggle/v/${videoId}`),
  toggleCommentLike: (commentId) => api.post(`/likes/toggle/c/${commentId}`),
  getLikedVideos: () => api.get('/likes/videos'),
};

// Comment APIs
export const commentAPI = {
  getVideoComments: (videoId) => api.get(`/comments/${videoId}`),
  addComment: (videoId, content) => api.post(`/comments/${videoId}`, { content }),
  updateComment: (commentId, content) => api.patch(`/comments/c/${commentId}`, { content }),
  deleteComment: (commentId) => api.delete(`/comments/c/${commentId}`),
};

// Subscription APIs
export const subscriptionAPI = {
  toggleSubscription: (channelId) => api.post(`/subscriptions/c/${channelId}`),
  getUserChannelSubscribers: (channelId) => api.get(`/subscriptions/c/${channelId}`),
  getSubscribedChannels: (subscriberId) => api.get(`/subscriptions/u/${subscriberId}`),
};

export default api;
