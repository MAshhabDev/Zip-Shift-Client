import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignDeliveries = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`)
            return res.data
        }
    })

    const handleDeliveryStatus = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId
        }

        let message = `Parcel Status Is Updated with ${status}`
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2>Parcels Pending Pickup: {parcels.length}</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Confirm</th>
                                <th>Other Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>

                                        {
                                            parcel.deliveryStatus === 'driver_assigned' ? <>
                                                <button onClick={() => handleDeliveryStatus(parcel, 'rider_arriving')} className='btn btn-primary mx-3'>Accept</button>
                                                <button className='btn btn-warning '>Reject</button>
                                            </>
                                                : <span>Accepted</span>
                                        }

                                    </td>
                                    <td>

                                        <button onClick={() => handleDeliveryStatus(parcel, 'parcel_picked_up')} className='btn btn-primary mx-3'>Marked As Picked Up</button>
                                        <button onClick={() => handleDeliveryStatus(parcel, 'parcel_delivered')} className='btn btn-primary mx-3'>Marked As Delivered</button>
                                    </td>
                                </tr>)
                            }
                            {/* row 1 */}

                            {/* row 2 */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignDeliveries;