// src/components/Login.tsx
import React, { useState } from 'react';
import { router } from '../routes/__root';
import { useLogin } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const loginMutation = useLogin();

	const handleLogin = async () => {
		if (!username.trim() || !password.trim()) return;

		setIsLoading(true);
		setIsLoading(false);

		await loginMutation.mutateAsync({ username, password });
		router.navigate({ to: '/' });
	};

	return (
		<div className='min-h-2/3 w-full flex self-center items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-full w-full space-y-8'>
				<div>
					<div className='mx-auto h-12 w-12 bg-[#5680A2] rounded-full flex items-center justify-center'>
						<span className='text-white font-bold text-xl'>🔐</span>
					</div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Войти в SecretsApp
					</h2>
				</div>

				<div className='flex flex-col items-center'>
					<Input
						label='Имя пользователя'
						type='text'
						className='w-md'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Введите имя пользователя'
					/>

					<Input
						label='Пароль'
						type='password'
						value={password}
						className='w-md'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Введите пароль'
					/>

					<Button
						onClick={handleLogin}
						loading={isLoading}
						className='mt-4 w-xs'
						disabled={!username.trim() || !password.trim()}
						// className='w-full'
					>
						Войти
					</Button>
				</div>
			</div>
		</div>
	);
};
