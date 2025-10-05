// src/services/auth.api.ts
import { apiClient } from './apiClient';
import { API_BASE_URL } from '../env';

import axios from 'axios';

export interface User {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in?: number;
}

export const authApi = {
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		// For login, we don't use apiClient since we want to skip the interceptor
		const response = await axios.post<AuthResponse>(
			`${API_BASE_URL}/users/login`,
			credentials
		);
		return response.data;
	},

	getCurrentUser: async (): Promise<User> => {
		// This will automatically get the Authorization header from interceptor
		const response = await apiClient.get<User>('/users/me');
		return response.data;
	},

	logout: async (): Promise<void> => {
		await apiClient.post('/auth/logout');
	},
};
