import { AuthVerify } from '@features/auth-verify';
import { Logo } from '@shared/ui/Logo';
import './AuthPage.scss';

export const AuthVerifyPage = () => {
	return (
		<div className='auth-page'>
			<section className='auth-page__content'>
				<div className='auth-page__card'>
					<Logo className='auth-page__logo' />
					<AuthVerify />
				</div>
			</section>
		</div>
	);
};
