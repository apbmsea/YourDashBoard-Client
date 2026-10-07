import { AuthForm } from '@features/auth';
import './AuthPage.scss';

export const AuthPage = () => {
	return (
		<div className='auth-page'>
			<section className='auth-page__content'>
				<div className='auth-page__card'>
					<AuthForm />
				</div>
			</section>
		</div>
	);
};
