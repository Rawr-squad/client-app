// src/components/MasterPasswordModal.tsx
import React, { useState } from 'react';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ErrorAlert } from './ui/ErrorAlert';

interface MasterPasswordModalProps {
	isOpen: boolean;
	onSuccess: () => void;
	onSetupRequired?: () => void;
}

export const MasterPasswordModal: React.FC<MasterPasswordModalProps> = ({
	isOpen,
	onSuccess,
	onSetupRequired,
}) => {
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { unlock, passwordHash } = useMasterPasswordStore();

	// If no password is set, trigger setup
	React.useEffect(() => {
		if (isOpen && !passwordHash && onSetupRequired) {
			onSetupRequired();
		}
	}, [isOpen, passwordHash, onSetupRequired]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!password.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			const success = await unlock(password);
			if (success) {
				setPassword('');
				onSuccess();
			} else {
				setError('Invalid master password');
			}
		} catch (err) {
			setError('Failed to verify master password');
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit(e as any);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center'>
			<div className='relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
				<div className='mt-3'>
					<div className='text-center mb-4'>
						<div className='mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4'>
							<span className='text-white font-bold text-xl'>🔒</span>
						</div>
						<h3 className='text-lg font-medium text-gray-900'>
							Master Password Required
						</h3>
						<p className='mt-2 text-sm text-gray-500'>
							Enter your master password to view secrets
						</p>
					</div>

					{error && <ErrorAlert message={error} />}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							label='Master Password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder='Enter master password'
							autoFocus
						/>

						<div className='flex justify-end space-x-3 pt-4'>
							<Button
								type='submit'
								loading={isLoading}
								disabled={!password.trim()}
								className='w-full'
							>
								Unlock Secrets
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
