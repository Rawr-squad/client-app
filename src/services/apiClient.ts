// src/services/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from '../env';

// Create axios instance with base config
export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('auth_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle common errors like 401 Unauthorized
		if (error.response?.status === 401) {
			// Clear auth and redirect to login
			localStorage.removeItem('auth_token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
