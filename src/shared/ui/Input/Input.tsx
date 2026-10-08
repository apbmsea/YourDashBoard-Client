import { useId, type InputHTMLAttributes } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input = ({ label, error, id, className, ...rest }: InputProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const errorId = `${inputId}-error`;

	return (
		<div className={className ? `input ${className}` : 'input'}>
			{label && (
				<label className='input__label' htmlFor={inputId}>
					{label}
				</label>
			)}
			<input
				className='input__control'
				id={inputId}
				aria-invalid={error ? true : undefined}
				aria-describedby={error ? errorId : undefined}
				{...rest}
			/>
			{error && (
				<p className='input__error' id={errorId} role='alert'>
					{error}
				</p>
			)}
		</div>
	);
};
