// src/components/SetupMasterPasswordModal.tsx
import React, { useState } from 'react';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ErrorAlert } from './ui/ErrorAlert';

interface SetupMasterPasswordModalProps {
	isOpen: boolean;
	onSuccess: () => void;
}

export const SetupMasterPasswordModal: React.FC<
	SetupMasterPasswordModalProps
> = ({ isOpen, onSuccess }) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { initializeMasterPassword } = useMasterPasswordStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!password.trim()) {
			setError('Please enter a password');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters long');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const success = await initializeMasterPassword(password);
			if (success) {
				setPassword('');
				setConfirmPassword('');
				onSuccess();
			} else {
				setError('Failed to set master password');
			}
		} catch (err) {
			setError('An error occurred while setting master password');
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center'>
			<div className='relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
				<div className='mt-3'>
					<div className='text-center mb-4'>
						<div className='mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4'>
							<span className='text-white font-bold text-xl'>🔐</span>
						</div>
						<h3 className='text-lg font-medium text-gray-900'>
							Set Master Password
						</h3>
						<p className='mt-2 text-sm text-gray-500'>
							Create a master password to protect your secrets
						</p>
					</div>

					{error && <ErrorAlert message={error} />}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							label='Master Password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Enter new master password'
							autoFocus
						/>

						<Input
							label='Confirm Master Password'
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder='Confirm your master password'
						/>

						<div className='flex justify-end space-x-3 pt-4'>
							<Button
								type='submit'
								loading={isLoading}
								disabled={!password.trim() || !confirmPassword.trim()}
								className='w-full'
							>
								Set Master Password
							</Button>
						</div>
					</form>

					<div className='mt-4 text-center'>
						<p className='text-xs text-gray-500'>
							This password will be required to view your secrets
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
