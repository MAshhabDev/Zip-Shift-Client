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
            return res.data;
        }
    })

    if(isLoading){
        <Loading></Loading>
    }
    return (
        <div>
            Please Payment
        </div>
    );
};

export default Payment;