// src/hooks/useFilteredAccessRequests.ts
import { useMemo } from 'react';
import { useAccessRequests } from './useAccessRequests';
import { useAccessRequestStore } from '../store/accessRequestsStore';

export const useFilteredAccessRequests = () => {
	const { data: requests, isLoading, error } = useAccessRequests();
	const { filters } = useAccessRequestStore();

	const filteredRequests = useMemo(() => {
		if (!requests) return [];

		return requests.filter((request) => {
			// Status filter
			if (filters.status !== 'all' && request.status !== filters.status) {
				return false;
			}

			return true;
		});
	}, [requests, filters]);

	const stats = useMemo(() => {
		if (!requests) {
			return { pending: 0, approved: 0, rejected: 0, total: 0 };
		}

		return {
			pending: requests.filter((r) => r.status === 'pending').length,
			approved: requests.filter((r) => r.status === 'approved').length,
			rejected: requests.filter((r) => r.status === 'rejected').length,
			total: requests.length,
		};
	}, [requests]);

	return {
		requests: filteredRequests,
		allRequests: requests || [],
		isLoading,
		error,
		stats,
		hasData: !isLoading && !error && filteredRequests.length > 0,
	};
};
