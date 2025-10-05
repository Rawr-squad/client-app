// src/services/secretsApi.ts
import { apiClient } from './apiClient';

export interface SecretField {
	name: string;
	value: string;
}

export interface Secret {
	id: string;
	service_name: string;
	keys: Record<string, string>[];
	lastUpdated: string;
}

export interface AccessRequest {
	id: string;
	secretName: string;
	service: string;
	requestedBy: string;
	requestedAt: string;
	expiresAt: string;
	description: string;
	status: 'pending' | 'approved' | 'rejected';
}

export const secretsApi = {
	getSecrets: async (): Promise<Secret[]> => {
		const response = await apiClient.get<Secret[]>('/users/allowed-secrets');
		return response.data;
	},

	getAccessRequests: async (): Promise<AccessRequest[]> => {
		const response = await apiClient.get<AccessRequest[]>('/access-requests');
		return response.data;
	},

	requestAccess: async (data: {
		description: string;
		secretName: string;
		period: number;
	}): Promise<AccessRequest> => {
		const response = await apiClient.post<AccessRequest>('/users/access', {
			request_data: {
				discription: data.description,
			},
			secretName: data.secretName,
			period: data.period,
		});
		return response.data;
	},

	// Mock data for development
	mockGetSecrets: async (): Promise<Secret[]> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return [
			/* your mock secrets */
		];
	},
};
