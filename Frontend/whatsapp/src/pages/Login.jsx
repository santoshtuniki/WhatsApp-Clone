// module imports
import React from 'react';

// component imports
import LoginForm from '../components/auth/LoginForm';

function Login() {
    return (
        <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
            {/* Container */}
            <div className='flex w-[1600px] mx-auto h-full'>
                {/* Registration Form */}
                <LoginForm />
            </div>
        </div>
    )
}

// Default export
export default Login;