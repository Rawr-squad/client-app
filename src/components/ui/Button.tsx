// // src/components/ui/Button.tsx
// import React from 'react';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// 	variant?: 'primary' | 'secondary' | 'danger';
// 	loading?: boolean;
// }

// export const Button: React.FC<ButtonProps> = ({
// 	children,
// 	variant = 'primary',
// 	loading = false,
// 	disabled,
// 	className = '',
// 	...props
// }) => {
// 	const baseClasses =
// 		'px-10 py-1.5 text-lg font-medium rounded-2xl transition-all duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

// 	const variantClasses = {
// 		primary: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-300',
// 		secondary:
// 			'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 border border-gray-300',
// 		danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
// 	};

// 	return (
// 		<div className='flex justify-center mt-2.5'>
// 			<button
// 				className={`${baseClasses} ${variantClasses[variant]} ${className}`}
// 				disabled={disabled || loading}
// 				{...props}
// 			>
// 				{loading ? (
// 					<div className='flex items-center'>
// 						<svg
// 							className='animate-spin -ml-1 mr-2 h-4 w-4 text-current'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 						>
// 							<circle
// 								className='opacity-25'
// 								cx='12'
// 								cy='12'
// 								r='10'
// 								stroke='currentColor'
// 								strokeWidth='4'
// 							/>
// 							<path
// 								className='opacity-75'
// 								fill='currentColor'
// 								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
// 							/>
// 						</svg>
// 						Loading...
// 					</div>
// 				) : (
// 					children
// 				)}
// 			</button>
// 		</div>
// 	);
// };

// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger';
	loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	loading = false,
	disabled,
	className = '',
	...props
}) => {
	const baseClasses =
		'p-2 px-md py-sm text-lg font-semibold rounded-lg transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden border-none';

	const variantClasses = {
		primary:
			'bg-[#011627] text-white hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(102,126,234,0.4),0_4px_8px_rgba(0,0,0,0.15)] active:translate-y-[-1px] active:shadow-[0_4px_12px_rgba(102,126,234,0.3),0_2px_4px_rgba(0,0,0,0.1)]',
		secondary: 'bg-gray-900 text-gray-700 hover:bg-gray-200',
		danger: 'bg-red-500 text-white hover:bg-red-600',
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<div className='flex items-center'>
					<svg
						className='animate-spin -ml-1 mr-2 h-4 w-4 text-current'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						/>
					</svg>
					Загрузка...
				</div>
			) : (
				<>
					{children}
					<div className='absolute rounded-full inset-0 -left-full hover:left-full transition-[left] duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none' />
				</>
			)}
		</button>
	);
};
