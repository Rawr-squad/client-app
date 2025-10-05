import React, { useState } from 'react';
import { useSecrets } from '../hooks/useSecrets';
import { useSettingsStore } from '../store/settingsStore';
import { AccessRequestModal } from '../components/AccessRequestModal';
import { EmptyState } from '../components/EmptyState';
import { ProtectedSecretsRoute } from '../components/ProtectedSecretsRoute';
import { SecretCard } from '../components/SecretCard';
import { Button } from '../components/ui/Button';
import { ErrorAlert } from '../components/ui/ErrorAlert';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';

const SecretsContent: React.FC = () => {
	const { secrets, loading, error, lastUpdated, refresh } = useSecrets();
	const { setAutoRefresh, autoRefresh, refreshInterval, setRefreshInterval } =
		useSettingsStore();
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

	return (
		<div className='h-full p-6'>
			{/* Your existing SecretsManager content */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>Secrets Manager</h1>
				<p className='mt-2 text-sm text-gray-600'>
					Manage your application secrets securely with automatic encryption and
					refresh
				</p>
			</div>

			<div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div className='flex items-center space-x-4'>
						<div className='rounded-full'>
							<Button onClick={refresh} loading={loading}>
								Refresh Secrets
							</Button>
						</div>

						<Button
							onClick={() => setIsRequestModalOpen(true)}
							variant='primary'
						>
							Request Access
						</Button>
					</div>

					<div className='flex items-center space-x-4 text-sm'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={autoRefresh}
								onChange={(e) => setAutoRefresh(e.target.checked)}
								className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-gray-700'>Auto refresh</span>
						</label>

						<select
							value={refreshInterval}
							onChange={(e) => setRefreshInterval(Number(e.target.value))}
							className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
						>
							<option value={30000}>30 seconds</option>
							<option value={60000}>1 minute</option>
							<option value={300000}>5 minutes</option>
							<option value={900000}>15 minutes</option>
						</select>
					</div>
				</div>

				{lastUpdated && (
					<div className='mt-4 text-sm text-gray-500'>
						Last updated: {new Date(lastUpdated).toLocaleString()}
					</div>
				)}
			</div>

			{error && <ErrorAlert message={error.message} />}

			{secrets.length > 0 ? (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{secrets.map((secret) => (
						<SecretCard key={new Date().toString()} secret={secret} />
					))}
				</div>
			) : (
				!loading && (
					<EmptyState onRequestAccess={() => setIsRequestModalOpen(true)} />
				)
			)}

			{loading && secrets.length === 0 && <LoadingSkeleton count={6} />}

			<AccessRequestModal
				isOpen={isRequestModalOpen}
				onClose={() => setIsRequestModalOpen(false)}
			/>
		</div>
	);
};

export const SecretsManager: React.FC = () => {
	return (
		<ProtectedSecretsRoute>
			<SecretsContent />
		</ProtectedSecretsRoute>
	);
};
