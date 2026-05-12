import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const AdminHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/delivery-status/stats`)
            return res.data
        }
    })

    const getPieChartData = data => {
        return data.map(item => {
            return { name: item._id, value: item.count }
        })
    }
    return (
        <div>
            <h2> Admin home</h2>

            <div>
                <div className="stats shadow">
                    {
                        deliveryStats.map((delivery) => <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title">{delivery._id}</div>
                            <div className="stat-value">{delivery.count}</div>
                            <div className="stat-desc">Jan 1st - Feb 1st</div>
                        </div>)
                    }


                </div>
                <div className='w-full h-[400px]'>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={getPieChartData(deliveryStats)}
                            cx="50%"
                            cy="100%"
                            outerRadius="120%"
                            fill="#8884d8"
                            label
                            isAnimationActive={true}
                        />
                        <Legend></Legend>
                        <Tooltip></Tooltip>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;