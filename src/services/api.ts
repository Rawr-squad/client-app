export interface SecretField {
	name: string;
	value: string;
	type: 'text' | 'password' | 'certificate';
}

export interface Secret {
	id: string;
	name: string;
	service: string;
	fields: SecretField[]; // without 'type' field
	lastUpdated: string;
	// no accessLevel
}

export interface AccessRequest {
	id: string;
	secretName: string;
	service: string;
	requestedBy: string;
	requestedAt: string;
	expiresAt: string; // single date instead of period
	description: string;
	status: 'pending' | 'approved' | 'rejected';
}

const mockSecrets: Secret[] = [
	{
		id: '1',
		name: 'Database Credentials',
		service: 'User Service',
		fields: [
			{ name: 'host', value: 'db.example.com', type: 'text' },
			{ name: 'port', value: '5432', type: 'text' },
			{ name: 'username', value: 'app_user', type: 'text' },
			{ name: 'password', value: 'super-secret-password', type: 'password' },
		],
		lastUpdated: new Date().toISOString(),
	},
	{
		id: '2',
		name: 'API Keys',
		service: 'Payment Service',
		fields: [
			{ name: 'public_key', value: 'pk_live_123456', type: 'text' },
			{ name: 'secret_key', value: 'sk_live_789012', type: 'password' },
		],
		lastUpdated: new Date().toISOString(),
	},
	{
		id: '3',
		name: 'SSL Certificate',
		service: 'Web Server',
		fields: [
			{
				name: 'certificate',
				value: '-----BEGIN CERTIFICATE-----...',
				type: 'certificate',
			},
			{
				name: 'private_key',
				value: '-----BEGIN PRIVATE KEY-----...',
				type: 'certificate',
			},
		],
		lastUpdated: new Date().toISOString(),
	},
];

const mockAccessRequests: AccessRequest[] = [
	{
		id: '1',
		secretName: 'Database Credentials',
		service: 'User Service',
		requestedBy: 'john@example.com',
		requestedAt: new Date().toISOString(),
		expiresAt:
			new Date().toISOString() + new Date(24 * 60 * 60 * 1000).toISOString(),
		description: 'Need access to debug production database issues',
		status: 'pending',
	},
];

export const api = {
	getSecrets: async (): Promise<Secret[]> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (Math.random() > 0.9) {
			throw new Error('Failed to fetch secrets from server');
		}
		return [...mockSecrets];
	},

	getAccessRequests: async (): Promise<AccessRequest[]> => {
		await new Promise((resolve) => setTimeout(resolve, 800));
		return [...mockAccessRequests];
	},

	requestAccess: async (
		request: Omit<
			AccessRequest,
			'id' | 'requestedBy' | 'requestedAt' | 'status'
		>
	): Promise<AccessRequest> => {
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const newRequest: AccessRequest = {
			...request,
			id: Math.random().toString(36).substr(2, 9),
			requestedBy: 'current-user@example.com', // In real app, get from auth
			requestedAt: new Date().toISOString(),
			status: 'pending',
		};

		mockAccessRequests.push(newRequest);
		return newRequest;
	},
};
