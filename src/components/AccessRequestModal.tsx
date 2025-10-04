// src/components/RequestAccessModal.tsx
import React, { useState } from 'react';

import { ErrorAlert } from './ui/ErrorAlert';
import { useAccessRequestStore } from '../store/accessRequestsStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/TextArea';

interface AccessRequestModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AccessRequestModal: React.FC<AccessRequestModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [secretName, setSecretName] = useState('');
	const [service, setService] = useState('');
	const [expiresAt, setExpiresAt] = useState('');
	const [description, setDescription] = useState('');

	const { requestAccess, loading, error } = useAccessRequestStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await requestAccess({
			secretName,
			service,
			expiresAt,
			description,
		});

		if (!error) {
			setSecretName('');
			setService('');
			setExpiresAt('');
			setDescription('');
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
			<div className='relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
				<div className='mt-3'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-medium text-gray-900'>
							Request Secret Access
						</h3>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-gray-600 transition-colors'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					{error && <ErrorAlert message={error} />}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							label='Secret Name *'
							value={secretName}
							onChange={(e) => setSecretName(e.target.value)}
							placeholder='Enter the name of the secret'
							required
						/>

						<Input
							label='Service Name *'
							value={service}
							onChange={(e) => setService(e.target.value)}
							placeholder='Enter the service name'
							required
						/>

						<Input
							label='Access Until *'
							type='date'
							value={expiresAt}
							onChange={(e) => setExpiresAt(e.target.value)}
							required
						/>

						<Textarea
							label='Justification *'
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Explain why you need access to this secret...'
							required
						/>

						<div className='flex justify-end space-x-3 pt-4'>
							<Button type='button' variant='secondary' onClick={onClose}>
								Cancel
							</Button>
							<Button type='submit' loading={loading}>
								Submit Request
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
