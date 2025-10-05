// src/hooks/useAccessRequests.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { secretsApi, type AccessRequest } from '../services/secrets.api';

// Query keys for cache management
export const accessRequestKeys = {
	all: ['access-requests'] as const,
	lists: () => [...accessRequestKeys.all, 'list'] as const,
	list: (filters?: unknown) =>
		[...accessRequestKeys.lists(), { filters }] as const,
	details: () => [...accessRequestKeys.all, 'detail'] as const,
	detail: (id: string) => [...accessRequestKeys.details(), id] as const,
};

// Query hooks
export const useAccessRequests = () => {
	return useQuery({
		queryKey: accessRequestKeys.lists(),
		queryFn: secretsApi.getAccessRequests,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useRequestAccess = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: secretsApi.requestAccess,
		onSuccess: (newRequest) => {
			// Optimistically update the cache
			queryClient.setQueryData<AccessRequest[]>(
				accessRequestKeys.lists(),
				(old = []) => [newRequest, ...old]
			);
		},
		onError: (error: Error) => {
			console.error('Failed to request access:', error);
		},
	});
};

// Optional: Hook for manual cache updates
export const useAccessRequestsCache = () => {
	const queryClient = useQueryClient();

	return {
		invalidateRequests: () => {
			queryClient.invalidateQueries({ queryKey: accessRequestKeys.all });
		},
		getCachedRequests: (): AccessRequest[] | undefined => {
			return queryClient.getQueryData(accessRequestKeys.lists());
		},
		setCachedRequests: (requests: AccessRequest[]) => {
			queryClient.setQueryData(accessRequestKeys.lists(), requests);
		},
	};
};
