// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuthStore();

	const handleLogin = async () => {
		if (!email.trim() || !password.trim()) return;

		setIsLoading(true);
		await login(email, password);
		setIsLoading(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleLogin();
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<div className='mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center'>
						<span className='text-white font-bold text-xl'>🔐</span>
					</div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to Secrets App
					</h2>
				</div>

				<div className='space-y-4'>
					<Input
						label='Email address'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='you@example.com'
					/>

					<Input
						label='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder='Enter your password'
					/>

					<Button
						onClick={handleLogin}
						loading={isLoading}
						disabled={!email.trim() || !password.trim()}
						className='w-full'
					>
						Sign in
					</Button>
				</div>

				<div className='text-center'>
					<p className='text-xs text-gray-500'>
						Demo: Use any email and password
					</p>
				</div>
			</div>
		</div>
	);
};
