// src/components/SecretCard.tsx
import React from 'react';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import type { Secret } from '../services/secrets.api';

interface SecretCardProps {
	secret: Secret;
}

export const SecretCard: React.FC<SecretCardProps> = ({ secret }) => {
	const { isUnlocked } = useMasterPasswordStore();

	return (
		<div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
			<div className='p-6'>
				<div className='flex items-center justify-between mb-3'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 truncate'>
							{/* {secret.service_name} */}
						</h3>
					</div>
				</div>

				<div className='space-y-2 mb-4'>
					{/* {secret.keys.map((field, index) => (
						<div key={index} className='flex justify-between items-center'>
							<span className='text-sm text-gray-600'>{field.name}:</span>
							<div className='flex items-center space-x-2'>
								<span className='text-sm font-mono bg-gray-100 px-2 py-1 rounded'>
									{isUnlocked ? field.value : '••••••••'}
								</span>
								{!isUnlocked && (
									<div className='text-xs text-gray-400 italic'>
										Unlock to view
									</div>
								)}
							</div>
						</div>
					))} */}
				</div>

				<div className='text-xs text-gray-500'>
					Updated {new Date(secret.lastUpdated).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};
