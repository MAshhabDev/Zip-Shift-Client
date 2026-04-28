import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()
    const handleRegister = (data) => {
        const profileImg = data.photo[0];

        createUser(data.email, data.password)
            .then(() => {
                // store the image in form data 

                const formData = new FormData();
                formData.append('image', profileImg);

                // Send The Photo to store

                const image_Api = `https://api.imgbb.com/1/upload?expiration&key=${import.meta.env.VITE_image_key}`

                axios.post(image_Api, formData)
                    .then(res => {

                        const photoURL = res.data.data.url

                        // Create user In the Database

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL

                        }
                        axiosSecure.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log("User Created In the database")
                                }
                            })
                        // Update profile to firebase

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL

                        }

                        updateUser(userProfile)
                            .then(() => {
                                console.log("User Profile Updated ")
                                navigate(location?.state || '/')

                            })
                            .catch(err => {
                                console.log(err.message);
                            })
                    })
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
                        <p className="text-sm md:text-base text-gray-500 text-center">Please Register Here</p>

                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Name"
                            />
                            {errors.name?.type === 'required' && (
                                <p className="text-red-500 text-sm">Name is required</p>
                            )}


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


                            <label className="label">Photo</label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                className="file-input"
                                placeholder="Photo"
                            />
                            {errors.photo?.type === 'required' && (
                                <p className="text-red-500 text-sm">Photo is required</p>
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
                                state={location.state}
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