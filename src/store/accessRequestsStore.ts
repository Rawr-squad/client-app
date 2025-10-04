// src/store/accessRequestStore.ts
import { create } from 'zustand';
import { secretsApi, type AccessRequest } from '../services/api';

interface AccessRequestState {
	requests: AccessRequest[];
	loading: boolean;
	error: string | null;
	fetchRequests: () => Promise<void>;
	requestAccess: (
		request: Omit<
			AccessRequest,
			'id' | 'requestedBy' | 'requestedAt' | 'status'
		>
	) => Promise<void>;
}

export const useAccessRequestStore = create<AccessRequestState>((set, get) => ({
	requests: [],
	loading: false,
	error: null,

	fetchRequests: async () => {
		set({ loading: true, error: null });
		try {
			const requests = await secretsApi.getAccessRequests();
			set({ requests, loading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to fetch access requests',
				loading: false,
			});
		}
	},

	requestAccess: async (requestData) => {
		set({ loading: true, error: null });
		try {
			const newRequest = await secretsApi.requestAccess(requestData);
			set({
				requests: [newRequest, ...get().requests],
				loading: false,
			});
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to submit access request',
				loading: false,
			});
		}
	},
}));
