// src/components/ui/Input.tsx
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
		<div>
			{label && (
				<label
					htmlFor={props.id}
					className='block text-sm font-medium text-gray-700 mb-1'
				>
					{label}
				</label>
			)}
			<input
				className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
				{...props}
			/>
		</div>
	);
};
