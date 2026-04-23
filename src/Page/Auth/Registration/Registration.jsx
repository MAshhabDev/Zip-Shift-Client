import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();

    const handleRegister = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className=" card bg-base-100 w-full max-w-sm md:max-w-md shadow-2xl">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="">
                    <div className="card-body p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-center">Create An Account</h3>
                        <p className="text-sm md:text-base text-gray-500 text-center">Please Register</p>

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
                                <p className="text-red-500 text-sm">
                                    Password must be at least 6 characters
                                </p>
                            )}

                            <div className="mt-2">
                                <a className="link link-hover text-sm">Forgot password?</a>
                            </div>

                            <button className="btn btn-neutral mt-4 w-full">
                                Register Now
                            </button>
                        </fieldset>

                        <p className="text-sm md:text-base mt-3">
                            Already have an account?{' '}
                            <Link
                                className="text-blue-500 hover:text-blue-900 font-semibold"
                                to="/logIn"
                            >
                                LogIn
                            </Link>
                        </p>
                    </div>
                </div>


            </form>
            <SocialLogin></SocialLogin>


        </div>
    );
};

export default Registration;