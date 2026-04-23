import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegister = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)} >
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {
                                errors.email?.type === 'required' && <p className='text-red-500'>Email Is Required</p>
                            }


                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />

                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Set PassWord Correctly</p>
                            }

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Login;