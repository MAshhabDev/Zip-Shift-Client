import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';

const Payment = () => {

    const axiosSecure = useAxiosSecure()

    const { parcelId } = useParams()
    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            console.log(res.data);

            return res.data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName


        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)

        // For get into new page
        window.location.href = res.data.url
        console.log(res.data)
    }
    return (
        <div>
            <h3>Please Payment ${parcel?.cost} for : {parcel.parcelName}</h3>
            <button onClick={handlePayment} className='btn btn-primary'>Pay</button>
        </div>
    );
};

export default Payment;