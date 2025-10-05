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
				className={`bg-white rounded-full px-4 py-3.5 w-full max-w-xs text-black transition-all duration-300 ease-cubic-bezier shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:shadow-lg focus:-translate-y-1 focus:outline-none focus:bg-white placeholder:text-[#b4b4b4] placeholder:font-normal ${className}`}
				{...props}
			/>
		</div>
	);
};
