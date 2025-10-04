// src/components/EmptyState.tsx
import React from 'react';
import { Button } from './ui/Button';

interface EmptyStateProps {
	onRequestAccess: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onRequestAccess }) => (
	<div className='text-center py-12'>
		<svg
			className='mx-auto h-12 w-12 text-gray-400'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
			/>
		</svg>
		<h3 className='mt-2 text-sm font-medium text-gray-900'>
			No secrets available
		</h3>
		<p className='mt-1 text-sm text-gray-500'>
			You don't have access to any secrets yet.
		</p>
		<div className='mt-6'>
			<Button onClick={onRequestAccess}>Request Access</Button>
		</div>
	</div>
);
