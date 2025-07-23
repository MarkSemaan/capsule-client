import axios from "axios";

const api = axios.create({
  baseURL: "http://capsule-server.test/api", // Using Laragon pretty URL
});

api.interceptors.request.use(
  (config) => {
    console.log("Making API request to:", `${config.baseURL}${config.url}`);
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API response received:", response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.error(
      "API response error:",
      error.response?.status,
      error.response?.data,
      error.config?.url
    );
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post("/register", data);
    console.log("Register response:", response);
    console.log("Register response.data:", response.data);
    return response.data.data || response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/login", data);
    console.log("Login response:", response);
    console.log("Login response.data:", response.data);
    return response.data.data || response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data.data || response.data;
  },

  me: async () => {
    const response = await api.get("/me");
    return response.data.data || response.data;
  },

  refresh: async () => {
    const response = await api.post("/refresh");
    return response.data.data || response.data;
  },
};

export const capsuleAPI = {
  create: async (data: {
    message: string;
    reveal_date: string;
    privacy: string;
    surprise_mode: boolean;
  }) => {
    const response = await api.post("/capsules", data);
    return response.data.data || response.data;
  },

  getMyCapsules: async () => {
    const response = await api.get("/my-capsules");
    const capsules = response.data.data || response.data;

    return Array.isArray(capsules)
      ? capsules.map((capsule) => ({
          ...capsule,
          capsuleMedia: capsule.capsule_media || [],
          capsule_media: undefined,
        }))
      : capsules;
  },

  getUpcomingCapsules: async () => {
    const response = await api.get("/upcoming-capsules");
    const data = response.data.data || response.data;

    if (!Array.isArray(data)) return data;

    return data.map((item) => {
      if (item.capsule_media) {
        item.capsuleMedia = item.capsule_media;
        delete item.capsule_media;
      }
      return item;
    });
  },

  delete: async (id: number) => {
    const response = await api.delete(`/capsules/${id}`);
    return response.data.data || response.data;
  },

  getPublicCapsules: async () => {
    const response = await api.get("/public/public-capsules");
    let capsules = response.data.data || response.data;

    if (Array.isArray(capsules)) {
      capsules = capsules.map((c) => ({
        ...c,
        capsuleMedia: c.capsule_media || [],
      }));
    }
    return capsules;
  },

  getRevealedCapsules: async () => {
    const response = await api.get("/public/revealed-capsules");
    return response.data.data || response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/public/capsules/${id}`);
    const capsule = response.data.data || response.data;

    if (capsule.capsule_media) {
      capsule.capsuleMedia = capsule.capsule_media;
    }
    return capsule;
  },
};

export const mediaAPI = {
  upload: async (capsuleId: number, file: File) => {
    const formData = new FormData();
    formData.append("capsule_id", capsuleId.toString());
    formData.append("file", file);

    const response = await api.post("/capsule-media", formData);
    return response.data.data || response.data;
  },

  getCapsuleMedia: async (capsuleId: number) => {
    const response = await api.get(`/capsules/${capsuleId}/media`);
    return response.data.data || response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/capsule-media/${id}`);
    return response.data.data || response.data;
  },
};

export const tagAPI = {
  create: async (data: { name: string }) => {
    const response = await api.post("/tags", data);
    return response.data.data || response.data;
  },

  getAll: async () => {
    const response = await api.get("/tags");
    return response.data.data || response.data;
  },

  findByName: async (name: string) => {
    const response = await api.get("/tags/find", {
      params: { name },
    });
    return response.data.data || response.data;
  },

  attachToCapsule: async (capsuleId: number, tagId: number) => {
    const response = await api.post(`/capsules/${capsuleId}/tags`, {
      tag_id: tagId,
    });
    return response.data.data || response.data;
  },

  detachFromCapsule: async (capsuleId: number, tagId: number) => {
    const response = await api.delete(`/capsules/${capsuleId}/tags/${tagId}`);
    return response.data.data || response.data;
  },

  getCapsuleTags: async (capsuleId: number) => {
    const response = await api.get(`/capsules/${capsuleId}/tags`);
    return response.data.data || response.data;
  },
};

export default api;
