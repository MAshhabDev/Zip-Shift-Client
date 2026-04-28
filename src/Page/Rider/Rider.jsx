import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {

    const { register,
        handleSubmit,
        control,
        // formState: { } 
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const serviceCenters = useLoaderData();

    // রিজিয়ন ফিল্টার করা
    const regions = [...new Set(serviceCenters.map(c => c.region))];

    // রিজিয়ন অনুযায়ী ডিস্ট্রিক্ট বের করা
    const districtRegion = (region) => {
        return serviceCenters.filter(c => c.region === region).map(r => r.district);
    };
    const region = useWatch({ control, name: 'region' });

    const handleRider = (data) => {
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Parcel has been created Please Pay",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }


    return (
        <div>
            <h3 className='text-3xl font-bold text-primary mt-5 ml-5 mb-5'>Be A Rider</h3>
            <form onSubmit={handleSubmit(handleRider)} className='mt-12 p-4'>
                {/* Parcel Type */}


                {/* Sender & Receiver Details */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Sender Section */}
                    <div className='mx-6 my-5'>
                        <h2 className='font-bold text-2xl mb-5'>Sender Details</h2>
                        <label >Name </label>
                        <input {...register('name')} defaultValue={user.displayName} className="input w-full my-2" placeholder="Name" />
                        <label >Email </label>

                        <input {...register('senderEmail')} defaultValue={user.email} className="input w-full my-2" placeholder="Sender Email" />
                        <input {...register('address')} className="input w-full my-2" placeholder="Address" />

                        <select {...register("region")} className="select w-full my-2">
                            <option value=""> Region</option>
                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>

                        <select {...register("district")} className="select w-full my-2">
                            <option value="">District</option>
                            {region && districtRegion(region).map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>
                    </div>

                    {/* Receiver Section */}
                    <div className='mx-6 my-5'>
                        <h2 className='font-bold text-2xl mb-5'>More Details</h2>
                        <input {...register('license')} className="input w-full my-2" placeholder="Driving License" />
                        <input {...register('nid')} className="input w-full my-2" placeholder="NID" />
                        <input {...register('bike')} className="input w-full my-2" placeholder="Bike" />
                        <input {...register('bikeInfo')} className="input w-full my-2" placeholder="Bike Information" />


                    </div>
                </div>

                <button type="submit" className="btn btn-neutral mt-4">Apply As A Rider</button>
            </form>
        </div>
    );
};

export default Rider;