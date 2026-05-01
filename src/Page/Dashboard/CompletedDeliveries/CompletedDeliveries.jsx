import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`)
            return res.data
        }
    })

    const calculatedPayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8
        }
        else {
            return parcel.cost * 0.6

        }
    }
    return (
        <div>
            <h2>Completed Delivers: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Sender District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.cost}</td>
                                <td>{calculatedPayout(parcel)}</td>

                            </tr>)
                        }
                        {/* row 1 */}

                        {/* row 2 */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;