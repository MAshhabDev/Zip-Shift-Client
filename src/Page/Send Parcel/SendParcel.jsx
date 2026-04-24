import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSend = () => {

    }
    return (
        <div>
            <h2 className='text-5xl font-bold'>Send A Parcel</h2>

            <form onSubmit={handleSend} className='mt-12 p-4'>
                {/* {PArcel Type} */}
                <div className='flex md:flex-1'>
                    <label className="label">
                        <input type="radio" value="document" {...register('parcelType')} className="radio mx-2" defaultChecked />
                        Document</label>
                    <label className="label">
                        <input type="radio" value="non-document" {...register('parcelType')} className="radio mx-2" />
                        Non-Document</label>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 mx-5 my-6 gap-12'>
                    <fieldset className="fieldset">

                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">

                        <label className="label">Parcel Weight</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>

                </div>
                {/* {sender Details} */}
                <div className='my-5 grid gird-cols-1 md:grid-cols-2 gap-12'>

                    <div className='mx-6 my-5'>


                        <fieldset className="fieldset">
                            <h2 className='font-bold text-2xl mb-5'>Sender Details</h2>

                            <label className="label">Sender Name</label>
                            <input type="text" {...register('name')} className="input w-full" placeholder="Sender Name" />
                            <label className="label">Address</label>
                            <input type="text" className="input w-full" {...register('address')} placeholder="Address" />
                            <label className="label">Phone No</label>
                            <input type="text" className="input w-full" {...register('phoneNo')} placeholder="Phone No" />
                            <label className="label">Your District</label>
                            <input type="text" className="input w-full" {...register('district')} placeholder="Your District" />
                            <label className="label">Pickup Instruction</label>
                            <input type="text" className="input w-full" {...register('pickup')} placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>
                    <div className='mx-6 my-5'>
                        <fieldset className="fieldset w-full">
                            <h2 className='font-bold text-2xl mb-5'>Receiver Details</h2>

                            <label className="label">Sender Name</label>
                            <input type="text" {...register('name')} className="input w-full" placeholder="Sender Name" />
                            <label className="label">Address</label>
                            <input type="text" className="input w-full" {...register('address')} placeholder="Address" />
                            <label className="label">Phone No</label>
                            <input type="text" className="input w-full" {...register('phoneNo')} placeholder="Phone No" />
                            <label className="label">Your District</label>
                            <input type="text" className="input w-full" {...register('district')} placeholder="Your District" />
                            <label className="label">Pickup Instruction</label>
                            <input type="text" className="input w-full" {...register('pickup')} placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>
                </div>

                <div>
                    <div>

                    </div>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>

            </form>

        </div>
    );
};

export default SendParcel;