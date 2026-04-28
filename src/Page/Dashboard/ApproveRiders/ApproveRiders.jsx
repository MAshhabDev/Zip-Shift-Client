import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {

    const axiosSecure = useAxiosSecure()

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');

            return res.data;
        }


    })


    const handleApprove = id => {

        const updateInfo = { status: 'approved' }
        axiosSecure.patch(`/riders/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Riders ApprovedX ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    return (
        <div>
            <h3>Riders Pending Approval: {riders.length}</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>District</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                riders.map((rider, index) => (
                                    <tr key={rider._id}>
                                        <th>{index + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.senderEmail}</td>
                                        <td>{rider.district}</td>
                                        <td>
                                            <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => handleApprove(rider._id)} className='btn'>
                                                <FaUserCheck></FaUserCheck>
                                            </button>
                                            <button className='btn'>
                                                <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                            </button>
                                            <button className='btn'>
                                                <FaTrashCan></FaTrashCan>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            {/* row 1 */}

                            {/* row 2 */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default ApproveRiders;