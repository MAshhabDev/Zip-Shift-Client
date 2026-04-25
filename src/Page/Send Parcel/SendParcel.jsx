import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {
    const { register,
        handleSubmit,
        control,
        // formState: { } 
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth()

    const serviceCenters = useLoaderData();

    // রিজিয়ন ফিল্টার করা
    const regions = [...new Set(serviceCenters.map(c => c.region))];

    // রিজিয়ন অনুযায়ী ডিস্ট্রিক্ট বের করা
    const districtRegion = (region) => {
        return serviceCenters.filter(c => c.region === region).map(r => r.district);
    };

    // সাবমিট হ্যান্ডলার
    const handleSend = (data) => {
        console.log("Form Data: ", data);

        const isDocument = data.parcelType === 'document'
        const sameDistrict = data.senderDistrict === data.receiverDistrict
        // const nonDocument = data.parcelType === 'non-document'
        const parcelWeight = parseFloat(data.parcelWeight)
        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80
        } else {
            if (parcelWeight < 3) {
                cost = sameDistrict ? 110 : 150
            }
            else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = sameDistrict ? 40 * extraWeight : 40 * extraWeight + 40

                cost = minCharge + extraCharge;

            }
        }
        console.log(cost);
        data.cost = cost
        Swal.fire({
            title: "Are you Agree With The Cost?",
            text: `You will be charged ${cost}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm it!"
        }).then((result) => {
            if (result.isConfirmed)

                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log(res.data)
                    })

            Swal.fire({
                title: "Confirmed!",
                text: "Your Parcel has been Confirmed.",
                icon: "success"
            });
        });
    };

    // বর্তমান সিলেক্ট করা রিজিয়ন ট্র্যাক করা Live track korche 
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    return (
        <div>
            <h2 className='text-5xl font-bold'>Send A Parcel</h2>

            <form onSubmit={handleSubmit(handleSend)} className='mt-12 p-4'>
                {/* Parcel Type */}
                <div className='flex gap-4'>
                    <label className="label">
                        <input type="radio" value="document" {...register('parcelType')} className="radio mx-2" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" value="non-document" {...register('parcelType')} className="radio mx-2" />
                        Non-Document
                    </label>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 mx-5 my-6 gap-12'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName', { required: true })} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="text" {...register('parcelWeight', { required: true })} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* Sender & Receiver Details */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Sender Section */}
                    <div className='mx-6 my-5'>
                        <h2 className='font-bold text-2xl mb-5'>Sender Details</h2>
                        <label >Name </label>
                        <input {...register('senderName')} defaultValue={user.displayName} className="input w-full my-2" placeholder="Sender Name" />
                        <label >Email </label>

                        <input {...register('senderEmail')} defaultValue={user.email} className="input w-full my-2" placeholder="Sender Email" />
                        <input {...register('senderAddress')} className="input w-full my-2" placeholder="Sender Address" />

                        <select {...register("senderRegion")} className="select w-full my-2">
                            <option value="">Select Sender Region</option>
                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>

                        <select {...register("senderDistrict")} className="select w-full my-2">
                            <option value="">Select Sender District</option>
                            {senderRegion && districtRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>
                        <input {...register('senderPickup')} className="input w-full my-2" placeholder="Pickup Instruction" />
                    </div>

                    {/* Receiver Section */}
                    <div className='mx-6 my-5'>
                        <h2 className='font-bold text-2xl mb-5'>Receiver Details</h2>
                        <input {...register('receiverName')} className="input w-full my-2" placeholder="Receiver Name" />
                        <input {...register('receiverEmail')} className="input w-full my-2" placeholder="Receiver Email" />
                        <input {...register('receiverAddress')} className="input w-full my-2" placeholder="Receiver Address" />

                        <select {...register("receiverRegion")} className="select w-full my-2">
                            <option value="">Select Receiver Region</option>
                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>

                        <select {...register("receiverDistrict")} className="select w-full my-2">
                            <option value="">Select Receiver District</option>
                            {receiverRegion && districtRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>
                        <input {...register('receiverPickup')} className="input w-full my-2" placeholder="Delivery Instruction" />
                    </div>
                </div>

                <button type="submit" className="btn btn-neutral mt-4">Submit Parcel</button>
            </form>
        </div>
    );
};

export default SendParcel;