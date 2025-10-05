// src/hooks/useSecrets.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CacheService } from '../services/cacheService';
import { useSettingsStore } from '../store/settingsStore';
import { type Secret, secretsApi } from '../services/secrets.api';

export const useSecrets = () => {
	const { refreshInterval, autoRefresh } = useSettingsStore();
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ['secrets'],
		queryFn: async (): Promise<Secret[]> => {
			// 1. First, try to get valid data from cache
			const cachedSecrets = CacheService.getAllKeys();

			if (cachedSecrets && cachedSecrets.length > 0) {
				console.log('Using cached secrets');
				return cachedSecrets;
			}

			// 2. If cache is empty or expired, fetch from API
			console.log('Cache empty or expired, fetching from API');
			try {
				const freshSecrets = await secretsApi.getSecrets();

				// 3. Update cache with fresh data
				freshSecrets.forEach((secret) => {
					CacheService.set(`${secret}`, secret);
				});
				return freshSecrets;
			} catch (error: any) {
				console.error('Failed to fetch secrets from API:', error.message);
				throw error;
			}
		},
		staleTime: refreshInterval,
		refetchInterval: autoRefresh ? refreshInterval : false,
		initialData: (): Secret[] => {
			// Use cache for initial data if available
			const cachedSecrets = CacheService.getAllKeys();
			return cachedSecrets || [];
		},
		retry: 1,
	});

	const refresh = () => {
		// Force refresh by clearing cache and invalidating query
		CacheService.remove('secrets_data');
		queryClient.invalidateQueries({ queryKey: ['secrets'] });
	};

	// Ensure secrets is always an array
	const secrets = Array.isArray(query.data) ? query.data : [];

	return {
		secrets,
		loading: query.isLoading,
		error: query.error,
		lastUpdated: query.dataUpdatedAt,
		refresh,
	};
};
