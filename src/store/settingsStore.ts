// src/store/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
	refreshInterval: number;
	autoRefresh: boolean;
	setRefreshInterval: (interval: number) => void;
	setAutoRefresh: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			refreshInterval: 300000, // 5 minutes
			autoRefresh: true,
			setRefreshInterval: (interval) => set({ refreshInterval: interval }),
			setAutoRefresh: (enabled) => set({ autoRefresh: enabled }),
		}),
		{
			name: 'settings-storage',
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
