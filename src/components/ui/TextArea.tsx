// src/components/ui/Textarea.tsx
import React from 'react';

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
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
			<textarea
				className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
				{...props}
			/>
		</div>
	);
};
