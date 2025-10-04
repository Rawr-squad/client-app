// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	user: { id: string; email: string } | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			login: async (email: string, password: string) => {
				// Mock login for hackathon
				await new Promise((resolve) => setTimeout(resolve, 1000));
				set({
					user: { id: '1', email },
					token: 'mock-jwt-token',
					isAuthenticated: true,
				});
			},
			logout: () => set({ user: null, token: null, isAuthenticated: false }),
		}),
		{ name: 'auth-storage' }
	)
);
