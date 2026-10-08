import { AuthForm } from '@features/auth-by-email';
import { Logo } from '@shared/ui/Logo';
import './AuthPage.scss';

export const AuthPage = () => {
	return (
		<div className='auth-page'>
			<section className='auth-page__content'>
				<div className='auth-page__card'>
					<Logo className='auth-page__logo' />
					<AuthForm />
				</div>
			</section>
		</div>
	);
};
