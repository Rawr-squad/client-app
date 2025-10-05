import React from 'react';
import { useAutoStart } from '../hooks/useAutoStart';

export const AutoStartSettings: React.FC = () => {
	const { isEnabled, isLoading, error, toggleAutoStart } = useAutoStart();

	// Don't show anything if not in Electron
	if (!window.electronAPI) {
		return null;
	}

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					Application Settings
				</h3>
				<p className='mt-1 max-w-2xl text-sm text-gray-500'>
					Configure how the app behaves on your system.
				</p>
			</div>

			<div className='border-t border-gray-200 px-4 py-5 sm:p-6'>
				{error && (
					<div className='mb-4 bg-red-50 border border-red-200 rounded-md p-3'>
						<div className='text-sm text-red-700'>{error}</div>
					</div>
				)}

				<div className='flex items-center justify-between'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Start with system
						</label>
						<p className='text-sm text-gray-500 mt-1'>
							Automatically launch the app when you start your computer
						</p>
					</div>

					<button
						onClick={toggleAutoStart}
						disabled={isLoading}
						className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
							isEnabled ? 'bg-blue-600' : 'bg-gray-200'
						} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						<span
							className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
								isEnabled ? 'translate-x-5' : 'translate-x-0'
							}`}
						/>
					</button>
				</div>

				{isLoading && (
					<div className='mt-2 text-sm text-gray-500'>Updating settings...</div>
				)}
			</div>
		</div>
	);
};
