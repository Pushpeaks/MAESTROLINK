// API Configuration - Update these URLs to your backend endpoints
export const API_CONFIG = {
  MERN_BASE_URL: import.meta.env.VITE_MERN_API_URL || 'http://localhost:5000/api',
  FASTAPI_BASE_URL: import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000',
};

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('authToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// MERN Backend API calls
export const mernApi = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (data: { name: string; email: string; password: string; role: string }) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // OAuth (Google) - sends Google id_token to backend for verification / login
  oauthGoogle: (idToken: string) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/auth/google`, {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    }),

  // Contact (Sales/Support)
  contact: (payload: { name: string; email: string; message: string; source?: string }) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/contact`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Profile
  getProfile: () =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/users/profile`),
  
  updateProfile: (data: Record<string, unknown>) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/users/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Rentals
  getRentals: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return fetchApi(`${API_CONFIG.MERN_BASE_URL}/rentals${query}`);
  },
  
  createRental: (data: Record<string, unknown>) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/rentals`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Jobs
  getJobs: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return fetchApi(`${API_CONFIG.MERN_BASE_URL}/jobs${query}`);
  },
  
  getJobById: (id: string) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/jobs/${id}`),
  
  applyToJob: (jobId: string, data: Record<string, unknown>) =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Applications
  getApplications: () =>
    fetchApi(`${API_CONFIG.MERN_BASE_URL}/applications`),
};

// FastAPI ML Backend calls
export const mlApi = {
  // Upload CV and get job matches
  uploadCV: async (file: File) => {
    const formData = new FormData();
    formData.append('cv', file);
    
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_CONFIG.FASTAPI_BASE_URL}/parse-cv`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to parse CV' }));
      throw new Error(error.detail || 'Failed to parse CV');
    }

    return response.json();
  },

  // Get job recommendations based on parsed CV
  getJobMatches: (cvData: Record<string, unknown>) =>
    fetchApi(`${API_CONFIG.FASTAPI_BASE_URL}/match-jobs`, {
      method: 'POST',
      body: JSON.stringify(cvData),
    }),

  // Get skills extraction
  extractSkills: (text: string) =>
    fetchApi(`${API_CONFIG.FASTAPI_BASE_URL}/extract-skills`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
};
