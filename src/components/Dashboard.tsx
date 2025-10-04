// src/components/Dashboard.tsx
import React from 'react';
import { useSecrets } from '../hooks/useSecrets';
import { useAuthStore } from '../store/authStore';
import { LoadingSkeleton } from './ui/LoadingSkeleton';

export const Dashboard: React.FC = () => {
	const { secrets, loading } = useSecrets();
	const { user } = useAuthStore();

	const stats = [
		{
			name: 'Total Secrets',
			value: secrets.length,
		},
		{
			name: 'API Keys',
			value: secrets.filter((s) => s.service.toLowerCase().includes('api'))
				.length,
		},
		{
			name: 'Database',
			value: secrets.filter((s) => s.service.toLowerCase().includes('database'))
				.length,
		},
	];

	return (
		<div className='h-full p-6'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>
					Welcome back, {user?.email}!
				</h1>
				<p className='mt-2 text-sm text-gray-600'>
					Here's what's happening with your secrets today.
				</p>
			</div>

			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'>
				{stats.map((item) => (
					<div
						key={item.name}
						className='bg-white overflow-hidden shadow rounded-lg'
					>
						<div className='px-4 py-5 sm:p-6'>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								{item.name}
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{item.value}
							</dd>
						</div>
					</div>
				))}
			</div>

			<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
				<div className='px-4 py-5 sm:px-6'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>
						Recent Secrets
					</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-500'>
						Recently updated secrets in your vault.
					</p>
				</div>
				<div className='border-t border-gray-200'>
					{loading ? (
						<div className='px-4 py-5 sm:p-6'>
							<LoadingSkeleton type='list' count={3} />
						</div>
					) : (
						<ul className='divide-y divide-gray-200'>
							{secrets.slice(0, 5).map((secret) => (
								<li key={secret.id}>
									<div className='px-4 py-4 sm:px-6 hover:bg-gray-50'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center'>
												<p className='text-sm font-medium text-blue-600 truncate'>
													{secret.name}
												</p>
												<div className='ml-2 flex-shrink-0 flex'>
													<p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
														{secret.service}
													</p>
												</div>
											</div>
											<div className='ml-2 flex-shrink-0 flex'>
												<p className='text-sm text-gray-500'>
													Updated{' '}
													{new Date(secret.lastUpdated).toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};
