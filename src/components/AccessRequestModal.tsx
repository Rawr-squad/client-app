// src/components/RequestAccessModal.tsx
import React, { useState } from 'react';
import { ErrorAlert } from './ui/ErrorAlert';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/TextArea';
import { useRequestAccess } from '../hooks/useAccessRequests';

interface AccessRequestModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AccessRequestModal: React.FC<AccessRequestModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [secretName, setSecretName] = useState('');
	const [period, setPeriod] = useState(0);
	const [description, setDescription] = useState('');

	const { mutate: requestAccess, isPending, error, reset } = useRequestAccess();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset any previous errors
		reset();

		requestAccess(
			{
				secretName,

				period,
				description,
			},
			{
				onSuccess: () => {
					// Reset form and close modal on success
					setSecretName('');
					setPeriod(0);
					setDescription('');
					onClose();
				},
			}
		);
	};

	const handleClose = () => {
		// Reset mutation state when closing
		reset();
		onClose();
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
							onClick={handleClose}
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

					{error && (
						<ErrorAlert
							message={error.message || 'Failed to submit access request'}
						/>
					)}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							label='Name'
							value={secretName}
							onChange={(e) => setSecretName(e.target.value)}
							placeholder='Enter the name of the secret'
							required
							disabled={isPending}
						/>

						<Input
							label='Access Until'
							type='number'
							value={period}
							onChange={(e) => setPeriod(+e.target.value)}
							required
							disabled={isPending}
							min={new Date().toISOString().split('T')[0]} // Today's date
						/>

						<Textarea
							label='Justification'
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Explain why you need access to this secret...'
							required
							disabled={isPending}
						/>

						<div className='flex justify-end space-x-3 pt-4'>
							<Button
								type='button'
								variant='secondary'
								onClick={handleClose}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button type='submit' loading={isPending} disabled={isPending}>
								Submit Request
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
