// src/components/ui/LoadingSkeleton.tsx
import React from 'react';

interface LoadingSkeletonProps {
	count?: number;
	type?: 'card' | 'list';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
	count = 3,
	type = 'card',
}) => {
	if (type === 'list') {
		return (
			<div className='space-y-3'>
				{[...Array(count)].map((_, i) => (
					<div key={i} className='flex space-x-4'>
						<div className='h-4 bg-gray-200 rounded w-3/4'></div>
						<div className='h-4 bg-gray-200 rounded w-1/4'></div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{[...Array(count)].map((_, i) => (
				<div
					key={i}
					className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
				>
					<div className='p-6'>
						<div className='animate-pulse'>
							<div className='flex items-center justify-between mb-3'>
								<div className='h-5 bg-gray-200 rounded w-3/4'></div>
								<div className='h-6 bg-gray-200 rounded-full w-16'></div>
							</div>
							<div className='space-y-2 mb-4'>
								{[...Array(3)].map((_, j) => (
									<div key={j} className='flex justify-between'>
										<div className='h-4 bg-gray-200 rounded w-1/4'></div>
										<div className='h-4 bg-gray-200 rounded w-1/3'></div>
									</div>
								))}
							</div>
							<div className='h-4 bg-gray-200 rounded w-1/2'></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
