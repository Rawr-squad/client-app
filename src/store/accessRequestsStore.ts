// src/store/accessRequestStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AccessRequestState {
	// Local state for UI purposes only
	selectedRequestId: string | null;
	filters: {
		status: 'all' | 'pending' | 'approved' | 'rejected';
		service: string;
	};

	// Actions
	setSelectedRequest: (id: string | null) => void;
	setFilters: (filters: Partial<AccessRequestState['filters']>) => void;
	clearFilters: () => void;
}

export const useAccessRequestStore = create<AccessRequestState>()(
	persist(
		(set) => ({
			// Initial state
			selectedRequestId: null,
			filters: {
				status: 'all',
				service: '',
			},

			// Actions
			setSelectedRequest: (id) => {
				set({ selectedRequestId: id });
			},

			setFilters: (newFilters) => {
				set((state) => ({
					filters: { ...state.filters, ...newFilters },
				}));
			},

			clearFilters: () => {
				set({
					filters: {
						status: 'all',
						service: '',
					},
				});
			},
		}),
		{
			name: 'access-requests-ui-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				filters: state.filters,
				selectedRequestId: state.selectedRequestId,
			}),
		}
	)
);
