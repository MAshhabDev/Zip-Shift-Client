import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';

const ParcelTrack = () => {
    const axiosInstance = UseAxios()
    const { trackingId } = useParams()

    const { data: trackings = [] } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`)
            return res.data
        }
    })
    return (
        <div className='p-5'>
            <h2 className='text-xl font-bold mx-auto text-center'>Tracking Id : {trackingId}</h2>
            <p>Logs So far: {trackings.length}</p>
            <div>
                <ul className="timeline timeline-vertical">
                    {
                        trackings.map((log) => <li key={log._id}>
                            <div className="timeline-start">
                                {new Date(log.createdAt).toLocaleString()}
                            </div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box">{log.details}</div>
                            <hr />
                        </li>)
                    }


                </ul>
            </div>

        </div>
    );
};

export default ParcelTrack;