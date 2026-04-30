import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
// import { Link } from 'react-router'; ❌ remove Link

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // ✅ NEW: handle payment
    const handlePayment = async (parcel) => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', {
                cost: parcel.cost,
                parcelId: parcel._id,
                parcelName: parcel.parcelName,
                senderEmail: user.email
            });

            window.location.replace(res.data.url);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>All of My Parcels: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>

                                <td>
                                    {
                                        parcel.paymentStatus === 'paid'
                                            ? <span className='text-green-500'>Paid</span>
                                            : <button
                                                onClick={() => handlePayment(parcel)}
                                                className='btn btn-primary btn-small'
                                            >
                                                Pay
                                            </button>
                                    }
                                </td>

                                <td>
                                    {parcel.deliveryStatus}
                                </td>

                                <td>
                                    <button className='btn btn-square hover:bg-primary'><FiEdit /></button>
                                    <button className='btn btn-square hover:bg-primary mx-2'><FaMagnifyingGlass /></button>
                                    <button onClick={() => handleDelete(parcel._id)} className='btn btn-square hover:bg-primary'><FaTrashCan /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;