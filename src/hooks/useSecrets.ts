// src/hooks/useSecrets.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CacheService } from '../services/cacheService';
import { useSettingsStore } from '../store/settingsStore';
import { type Secret, secretsApi } from '../services/api';

export const useSecrets = () => {
	const { refreshInterval, autoRefresh } = useSettingsStore();
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ['secrets'],
		queryFn: async (): Promise<Secret[]> => {
			// Explicit return type
			const data = await secretsApi.getSecrets();
			// Cache encrypted data
			CacheService.set('secrets_data', data, refreshInterval);
			return data;
		},
		staleTime: refreshInterval,
		refetchInterval: autoRefresh ? refreshInterval : false,
		initialData: (): Secret[] => {
			// Explicit return type for initialData
			// Use cached data as initial data if available
			const cached = CacheService.get<Secret[]>('secrets_data'); // Specify type here
			return cached || []; // Return empty array instead of undefined
		},
	});

	const refresh = () =>
		queryClient.invalidateQueries({ queryKey: ['secrets'] });

	return {
		secrets: query.data || [], // Ensure it's always an array
		loading: query.isLoading,
		error: query.error,
		lastUpdated: query.dataUpdatedAt,
		refresh,
	};
};
