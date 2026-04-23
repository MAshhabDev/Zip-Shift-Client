import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();

    const handleLogIn = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then((res) => {
                console.log(res.user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className=" card bg-base-100 w-full max-w-sm md:max-w-md shadow-2xl">
            <form onSubmit={handleSubmit(handleLogIn)}>
                <div>
                    <div className="card-body p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl text-center font-bold">Welcome Back</h3>
                        <p className="text-sm md:text-base text-center text-gray-500">Please Log In</p>

                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                            {errors.email?.type === 'required' && (
                                <p className="text-red-500 text-sm">Email is required</p>
                            )}

                            <label className="label mt-2">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="input input-bordered w-full"
                                placeholder="Password"
                            />
                            {errors.password?.type === 'required' && (
                                <p className="text-red-500 text-sm">Password is required</p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
                            )}

                            <div className="mt-2">
                                <a className="link link-hover text-sm">Forgot password?</a>
                            </div>

                            <button className="btn btn-neutral mt-4 w-full">Login</button>
                        </fieldset>
                        <p>New To Zap Shift? <Link className='text-blue-500 hover:text-blue-900 font-semibold' to='/register'>Register Now!</Link></p>
                    </div>
                </div>
            </form>
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;