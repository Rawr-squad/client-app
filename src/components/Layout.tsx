// Alternative approach using TanStack Router's active props
import React from 'react';
import { Link, redirect } from '@tanstack/react-router';
import { Button } from './ui/Button';
import { router } from '../routes/__root';
import { useLogout } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const logoutMutation = useLogout();

	const { user, isAuthenticated } = useAuthStore();

	const handleLogout = async () => {
		await logoutMutation.mutateAsync();
		redirect({ to: '/login' });
	};

	const activeProps = {
		className: 'bg-blue-100 text-blue-700',
	};

	const inactiveProps = {
		className: 'text-gray-700 hover:bg-gray-100',
	};

	if (!isAuthenticated) {
		router.navigate({ to: '/login' });
	}

	return (
		<div className='min-h-screen w-screen bg-gray-50'>
			{isAuthenticated && (
				<nav className='bg-white shadow-sm border-b'>
					<div className='flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex items-center space-x-8'>
							<Link to='/' className='flex items-center'>
								<div className='text-xl font-bold text-gray-900'>
									🔐 SecretsApp
								</div>
							</Link>

							<div className='hidden md:flex items-center space-x-4'>
								<Link
									to='/'
									className='px-3 py-2 rounded-md text-sm font-medium transition-colors'
									activeProps={activeProps}
									inactiveProps={inactiveProps}
								>
									Dashboard
								</Link>
								<Link
									to='/secrets'
									className='px-3 py-2 rounded-md text-sm font-medium transition-colors'
									activeProps={activeProps}
									inactiveProps={inactiveProps}
								>
									Secrets
								</Link>
								<Link
									to='/access-requests'
									className='px-3 py-2 rounded-md text-sm font-medium transition-colors'
									activeProps={activeProps}
									inactiveProps={inactiveProps}
								>
									Access Requests
								</Link>
								<Link
									to='/settings'
									className='px-3 py-2 rounded-md text-sm font-medium transition-colors'
									activeProps={activeProps}
									inactiveProps={inactiveProps}
								>
									Settings
								</Link>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<span className='text-sm text-gray-700'>{user?.email}</span>
							<Button onClick={handleLogout} className='text-sm px-3 py-2'>
								Выйти
							</Button>
						</div>
					</div>
				</nav>
			)}
			<main className='flex justify-center max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='w-full '>{children}</div>
			</main>
		</div>
	);
};
