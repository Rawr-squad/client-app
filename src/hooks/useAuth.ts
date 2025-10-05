// src/hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../services/auth.api';

export const useLogin = () => {
	const setAuth = useAuthStore((state) => state.setAuth);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => {
			// 1. First, login to get the token
			const authResponse = await authApi.login({ username, password });

			if (!authResponse.access_token) throw new Error('Invalid credentials');

			// Save token to local storage
			localStorage.setItem('auth_token', authResponse.access_token);

			// 2. Then fetch user data with the token
			const userData = await authApi.getCurrentUser();

			// 3. Return both
			return {
				authResponse,
				userData,
			};
		},
		onSuccess: (data) => {
			const { authResponse, userData } = data;

			setAuth(userData, authResponse.access_token);

			// Invalidate any existing queries
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});
};

export const useLogout = () => {
	const logoutStore = useAuthStore((state) => state.clearAuth);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			return await authApi.logout();
		},
		onSuccess: () => {
			// Clear store state
			logoutStore();
			// Clear ALL TanStack Query cache
			queryClient.clear();
			// Optional: Redirect to login
			window.location.href = '/login';
		},
		onError: (error) => {
			// Even if API call fails, we should logout locally
			console.error('Logout API failed, logging out locally:', error);
			logoutStore();
			queryClient.clear();
			window.location.href = '/login';
		},
	});
};
