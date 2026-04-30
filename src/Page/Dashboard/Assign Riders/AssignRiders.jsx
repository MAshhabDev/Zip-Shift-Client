import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data
        }
    })
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
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map(parcel => <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
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

export default AssignRiders;