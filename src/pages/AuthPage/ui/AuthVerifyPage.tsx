import { AuthVerify } from '@features/auth';
import './AuthPage.scss';

export const AuthVerifyPage = () => {
	return (
		<div className='auth-page'>
			<section className='auth-page__content'>
				<div className='auth-page__card'>
					<AuthVerify />
				</div>
			</section>
		</div>
	);
};
