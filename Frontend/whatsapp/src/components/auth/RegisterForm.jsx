// module imports
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// component imports
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { changeStatus, registerUser } from '../../features/userSlice';
import Picture from './Picture';

// env variables
const {
	REACT_APP_CLOUD_SECRET: cloud_secret,
	REACT_APP_CLOUD_NAME: cloud_name
} = process.env;

function RegisterForm() {

	// Redux
	const { status, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	// navigate
	const navigate = useNavigate();

	// picture
	const [picture, setPicture] = useState();
	const [readablePicture, setReadablePicture] = useState('');

	// react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signUpSchema),
	});

	const uploadImage = async () => {
		const formData = new FormData();
		formData.append('upload_preset', cloud_secret);
		formData.append('file', picture);
		// uploading
		const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
		console.log('data', data);
		return data;
	}

	const onSubmit = async (data) => {
		let res;
		await dispatch(changeStatus('loading'));

		if (picture) {
			// upload to cloudinary, then register user
			await uploadImage().then(async (result) => {
				res = await dispatch(registerUser({ ...data, picture: result.secure_url }));
			})
		} else {
			res = await dispatch(registerUser({ ...data, picture: '' }));
		}

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
					<h2 className='mt-6 text-3xl font-bold'>Welcome</h2>
					<p className='mt-2 text-sm'>Sign up</p>
				</div>
				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
					<AuthInput
						name='name'
						type='text'
						placeholder='Full Name'
						register={register}
						error={errors?.name?.message}
					/>
					<AuthInput
						name='email'
						type='email'
						placeholder='Email'
						register={register}
						error={errors?.email?.message}
					/>
					<AuthInput
						name='status'
						type='text'
						placeholder='Status ( Optional )'
						register={register}
						error={errors?.status?.message}
					/>
					<AuthInput
						name='password'
						type='password'
						placeholder='Password'
						register={register}
						error={errors?.password?.message}
					/>
					{/* picture */}
					<Picture
						readablePicture={readablePicture}
						setReadablePicture={setReadablePicture}
						setPicture={setPicture}
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
						{status === 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign up'}
					</button>
					{/* Sign in link */}
					<p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
						<span>Have an account ? </span>
						<Link href='/login' className='hover:underline cursor-pointer transition ease-in duration-300'>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default RegisterForm;