// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CacheService } from '../services/cacheService';
import type { User } from '../services/auth.api';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;

	// Pure state actions - no API calls here!
	setAuth: (user: User, token: string) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,

			setAuth: (user: User, token: string) => {
				set({
					user,
					token,
					isAuthenticated: true,
				});
				localStorage.setItem('auth_token', token);
			},

			clearAuth: () => {
				CacheService.clear();
				localStorage.removeItem('auth_token');
				set({
					user: null,
					token: null,
					isAuthenticated: false,
				});
			},
		}),
		{
			name: 'auth-storage',
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					return str ? JSON.parse(str) : null;
				},
				setItem: (name, value) => {
					localStorage.setItem(name, JSON.stringify(value));
				},
				removeItem: (name) => {
					localStorage.removeItem(name);
				},
			},
		}
	)
);
