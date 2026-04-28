import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h2>Payment history: {payments.length}</h2>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Transaction Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) =>
                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>Cy Ganderton</td>
                                        <td>${payment.amount}</td>
                                        <td>{payment.transactionId}</td>
                                    </tr>
                                )
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

export default PaymentHistory;