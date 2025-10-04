// Alternative approach using TanStack Router's active props
import React from 'react';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { user, logout } = useAuthStore();

	const activeProps = {
		className: 'bg-blue-100 text-blue-700',
	};

	const inactiveProps = {
		className: 'text-gray-700 hover:bg-gray-100',
	};

	return (
		<div className='min-h-screen w-screen bg-gray-50'>
			<nav className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
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
							<button
								onClick={logout}
								className='bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors'
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile menu with activeProps */}
			<div className='md:hidden bg-white border-b'>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<Link
						to='/'
						className='block px-3 py-2 rounded-md text-base font-medium'
						activeProps={activeProps}
						inactiveProps={inactiveProps}
					>
						Dashboard
					</Link>
					<Link
						to='/secrets'
						className='block px-3 py-2 rounded-md text-base font-medium'
						activeProps={activeProps}
						inactiveProps={inactiveProps}
					>
						Secrets
					</Link>
					<Link
						to='/access-requests'
						className='block px-3 py-2 rounded-md text-base font-medium'
						activeProps={activeProps}
						inactiveProps={inactiveProps}
					>
						Access Requests
					</Link>
					<Link
						to='/settings'
						className='block px-3 py-2 rounded-md text-base font-medium'
						activeProps={activeProps}
						inactiveProps={inactiveProps}
					>
						Settings
					</Link>
				</div>
			</div>

			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
		</div>
	);
};
