// src/components/Settings.tsx
import React from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import { AutoStartSettings } from '../components/AutoStartSetting';
// Your existing component

export const Settings: React.FC = () => {
	const { refreshInterval, setRefreshInterval, autoRefresh, setAutoRefresh } =
		useSettingsStore();

	const { unlockDuration, setUnlockDuration } = useMasterPasswordStore();

	return (
		<div className='h-full p-6'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
				<p className='mt-2 text-sm text-gray-600'>
					Manage your application preferences and security settings.
				</p>
			</div>

			<div className='space-y-6'>
				{/* Auto-start Settings (Electron only) */}
				<AutoStartSettings />

				{/* Refresh Settings */}
				<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
					<div className='px-4 py-5 sm:px-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900'>
							Refresh Settings
						</h3>
						<p className='mt-1 max-w-2xl text-sm text-gray-500'>
							Configure how often your secrets are automatically refreshed.
						</p>
					</div>
					<div className='border-t border-gray-200 px-4 py-5 sm:p-6'>
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
							<div>
								<label className='flex items-center'>
									<input
										type='checkbox'
										checked={autoRefresh}
										onChange={(e) => setAutoRefresh(e.target.checked)}
										className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
									/>
									<span className='ml-2 text-sm text-gray-700'>
										Enable auto-refresh
									</span>
								</label>
								<p className='mt-1 text-xs text-gray-500'>
									Automatically refresh secrets in the background
								</p>
							</div>

							<div>
								<label
									htmlFor='refreshInterval'
									className='block text-sm font-medium text-gray-700'
								>
									Refresh interval
								</label>
								<select
									id='refreshInterval'
									value={refreshInterval}
									onChange={(e) => setRefreshInterval(Number(e.target.value))}
									className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
								>
									<option value={30000}>30 seconds</option>
									<option value={60000}>1 minute</option>
									<option value={300000}>5 minutes</option>
									<option value={900000}>15 minutes</option>
									<option value={1800000}>30 minutes</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Security Settings */}
				<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
					<div className='px-4 py-5 sm:px-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900'>
							Security Settings
						</h3>
						<p className='mt-1 max-w-2xl text-sm text-gray-500'>
							Configure master password and security preferences.
						</p>
					</div>
					<div className='border-t border-gray-200 px-4 py-5 sm:p-6'>
						<div>
							<label
								htmlFor='unlockDuration'
								className='block text-sm font-medium text-gray-700'
							>
								Master Password Timeout
							</label>
							<select
								id='unlockDuration'
								value={unlockDuration}
								onChange={(e) => setUnlockDuration(Number(e.target.value))}
								className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
							>
								<option value={5 * 60 * 1000}>5 minutes</option>
								<option value={15 * 60 * 1000}>15 minutes</option>
								<option value={30 * 60 * 1000}>30 minutes</option>
								<option value={60 * 60 * 1000}>1 hour</option>
								<option value={4 * 60 * 60 * 1000}>4 hours</option>
							</select>
							<p className='mt-1 text-xs text-gray-500'>
								How long the master password remains valid before requiring
								re-entry
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
