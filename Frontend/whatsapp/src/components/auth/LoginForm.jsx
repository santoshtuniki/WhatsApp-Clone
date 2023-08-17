// module imports
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

// component imports
import { signInSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { changeStatus, loginUser } from '../../features/userSlice';

function LoginForm() {

	// Redux
	const { status, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	// navigate
	const navigate = useNavigate();

	// react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = async (data) => {
		await dispatch(changeStatus('loading'));

		let res = await dispatch(loginUser(data));
		if (res?.payload?.user) {
			navigate('/');
		}
	};

	return (
		<div className='min-h-full w-full flex items-center justify-center overflow-hidden'>
			{/* Container */}
			<div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
				{/* Heading */}
				<div className='text-center dark:text-dark_text_1'>
					<h2 className='mt-6 text-3xl font-bold'>Welcome Back</h2>
					<p className='mt-2 text-sm'>Sign in</p>
				</div>
				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
					<AuthInput
						name='email'
						type='email'
						placeholder='Email'
						register={register}
						error={errors?.email?.message}
					/>
					<AuthInput
						name='password'
						type='password'
						placeholder='Password'
						register={register}
						error={errors?.password?.message}
					/>
					{/* if we have an error */}
					{
						error ? (
							<div>
								<p className='text-red-400'>{error}</p>
							</div>
						) : null
					}
					{/* Submit Button */}
					<button
						type='submit'
						className='w-full flex justify-center bg-green_1 text-gray-100 rounded-full tracking-wide py-3
						font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
					>
						{status === 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign in'}
					</button>
					{/* Sign in link */}
					<p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
						<span>Don't have an account ? </span>
						<Link href='/register' className='hover:underline cursor-pointer transition ease-in duration-300'>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default LoginForm;