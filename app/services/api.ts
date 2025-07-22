import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://capsule-server.test/api", // Adjust this to your Laravel server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post("/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },

  me: async () => {
    const response = await api.get("/me");
    return response.data;
  },

  refresh: async () => {
    const response = await api.post("/refresh");
    return response.data;
  },
};

// Capsule API calls
export const capsuleAPI = {
  create: async (data: {
    message: string;
    reveal_date: string;
    privacy: string;
    surprise_mode: boolean;
  }) => {
    const response = await api.post("/capsules", data);
    return response.data;
  },

  getMyCapsules: async () => {
    const response = await api.get("/my-capsules");
    return response.data;
  },

  getUpcomingCapsules: async () => {
    const response = await api.get("/upcoming-capsules");
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/capsules/${id}`);
    return response.data;
  },

  getPublicCapsules: async () => {
    const response = await api.get("/public/public-capsules");
    return response.data;
  },

  getRevealedCapsules: async () => {
    const response = await api.get("/public/revealed-capsules");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/public/capsules/${id}`);
    return response.data;
  },
};

// Media API calls
export const mediaAPI = {
  upload: async (capsuleId: number, file: File) => {
    const formData = new FormData();
    formData.append("capsule_id", capsuleId.toString());
    formData.append("file", file);

    const response = await api.post("/capsule-media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getCapsuleMedia: async (capsuleId: number) => {
    const response = await api.get(`/capsules/${capsuleId}/media`);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/capsule-media/${id}`);
    return response.data;
  },
};

// Tag API calls
export const tagAPI = {
  create: async (data: { name: string }) => {
    const response = await api.post("/tags", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/tags");
    return response.data;
  },

  attachToCapsule: async (capsuleId: number, tagId: number) => {
    const response = await api.post(`/capsules/${capsuleId}/tags`, {
      tag_id: tagId,
    });
    return response.data;
  },

  detachFromCapsule: async (capsuleId: number, tagId: number) => {
    const response = await api.delete(`/capsules/${capsuleId}/tags/${tagId}`);
    return response.data;
  },

  getCapsuleTags: async (capsuleId: number) => {
    const response = await api.get(`/capsules/${capsuleId}/tags`);
    return response.data;
  },
};

export default api;
