import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { actions } from '../model/deleteAccountSlice';
import './DeleteAccount.scss';

const CODE_LENGTH = 6;

export const DeleteAccount = () => {
	const dispatch = useAppDispatch();
	const [code, setCode] = useState('');
	const { step, isFetch, error } = useAppSelector(state => state.deleteAccount);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (code.length !== CODE_LENGTH) return;
		dispatch(actions.confirmRequest({ code }));
	};

	const handleCancel = () => {
		setCode('');
		dispatch(actions.cancel());
	};

	if (step === 'idle') {
		return (
			<section className='delete-account'>
				<h2 className='delete-account__title'>Удаление аккаунта</h2>
				<p className='delete-account__text'>
					Аккаунт и все данные будут удалены без возможности восстановления.
					Для подтверждения пришлём код на почту.
				</p>
				{error && (
					<p className='delete-account__error' role='alert'>
						{error}
					</p>
				)}
				<Button
					variant='danger'
					loading={isFetch}
					onClick={() => dispatch(actions.codeRequest())}
				>
					{isFetch ? 'Отправляем код…' : 'Удалить аккаунт'}
				</Button>
			</section>
		);
	}

	return (
		<form className='delete-account' onSubmit={handleSubmit}>
			<h2 className='delete-account__title'>Подтвердите удаление</h2>
			<p className='delete-account__text' role='status'>
				Мы отправили {CODE_LENGTH}-значный код на вашу почту. Введите его,
				чтобы удалить аккаунт.
			</p>
			<Input
				className='delete-account__field'
				label='Код из письма'
				name='code'
				inputMode='numeric'
				autoComplete='one-time-code'
				placeholder='000000'
				maxLength={CODE_LENGTH}
				required
				autoFocus
				value={code}
				disabled={isFetch}
				error={error ?? undefined}
				onChange={e =>
					setCode(e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))
				}
			/>
			<div className='delete-account__actions'>
				<Button
					type='submit'
					variant='danger'
					loading={isFetch}
					disabled={code.length !== CODE_LENGTH}
				>
					{isFetch ? 'Подождите…' : 'Удалить навсегда'}
				</Button>
				<Button variant='secondary' disabled={isFetch} onClick={handleCancel}>
					Отмена
				</Button>
			</div>
			<Button
				variant='link'
				disabled={isFetch}
				onClick={() => dispatch(actions.codeRequest())}
			>
				Отправить код ещё раз
			</Button>
		</form>
	);
};
