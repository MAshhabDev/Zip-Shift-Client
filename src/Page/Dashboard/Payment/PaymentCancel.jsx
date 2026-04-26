import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h3>Payment Cancel Try Again</h3>
            <Link to='/dashboard/my-parcels' className='btn btn-primary'>Try Again </Link  >
        </div>
    );
};

export default PaymentCancel;