// // src/components/ui/Input.tsx
// import React from 'react';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
// 	label?: string;
// }

// export const Input: React.FC<InputProps> = ({
// 	label,
// 	className = '',
// 	...props
// }) => {
// 	return (
// 		<div>
// 			{label && (
// 				<label
// 					htmlFor={props.id}
// 					className='block text-sm font-medium text-gray-700 mb-1'
// 				>
// 					{label}
// 				</label>
// 			)}
// 			<input
// 				className={`block w-full px-3 py-2 border border-gray-300 rounded-full shadow-[0_0_12px_0.5px_rgba(0,0,0,0.1)]  shadow-gray-600 focus:shadow-sm focus:outline-none sm:text-sm text-black ${className}`}
// 				{...props}
// 			/>
// 		</div>
// 	);
// };

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	className = '',
	...props
}) => {
	return (
		<div className='flex flex-col my-2 items-center'>
			{label && (
				<label
					htmlFor={props.id}
					className='font-semibold text-md mb-3 text-[#34495e] uppercase tracking-wider'
				>
					{label}
				</label>
			)}
			<input
				className={`bg-white rounded-full px-4 py-3.5 w-full max-w-xs text-black transition-all duration-300 ease-cubic-bezier shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:shadow-lg focus:-translate-y-1 focus:outline-none focus:bg-white placeholder:text-[#b4b4b4] placeholder:font-normal ${className}`}
				{...props}
			/>
		</div>
	);
};
