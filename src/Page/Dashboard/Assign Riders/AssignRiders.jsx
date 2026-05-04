import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRiders = () => {

    const [selectedParcel, setSelectedParcel, refetch] = useState(null)
    const riderModalRef = useRef()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data
        }
    })

    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel?.senderDistrict,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`)
            return res.data
        }
    })

    const assignModal = (parcel) => {
        console.log(parcel.senderDistrict)

        setSelectedParcel(parcel)

        // Modal Show Korar Jonne
        riderModalRef.current.showModal()

    }

    const handleAssignRider = (rider) => {
        const updateInfo = {
            riderId: rider._id,
            riderEmail: rider.senderEmail,
            riderName: rider.name,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId

        }

        axiosSecure.patch(`/parcels/${selectedParcel._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been Assigned`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2>Assign Riders: {parcels.length}</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Created At</th>
                                <th>PickUp District</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td><button onClick={() => assignModal(parcel)} className='btn btn-primary'>Find Rider</button></td>
                                </tr>)
                            }
                            {/* row 1 */}

                            {/* row 2 */}

                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">  Riders: {isLoading ? 'Loading...' : riders.length}
                        </h3>
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riders.map((rider, index) => <tr>
                                            <th>{index + 1}</th>
                                            <td>{rider.name}</td>
                                            <td>{rider.senderEmail}</td>
                                            <td><button onClick={() => handleAssignRider(rider)} className='btn btn-primary'>Assign</button></td>
                                        </tr>)}
                                        {/* row 1 */}

                                        {/* row 2 */}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AssignRiders;