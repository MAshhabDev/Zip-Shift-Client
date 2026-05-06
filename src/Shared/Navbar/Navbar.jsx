import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(err => {
                console.log(err.message)
            })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/services'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/sendParcel'>Send A Parcel</NavLink></li>
        <li><NavLink to='/rider'>Be A Rider</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>

        {
            user && <>

                <li><NavLink to='/dashboard/my-parcels'>My Parcels</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

            </>
        }

    </>
    return (
        <div>
            <div className="navbar shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <span>{user.displayName}</span> : <span></span>
                    }

                    {
                        user ? <a onClick={handleLogOut} className="btn ml-2 btn-primary">Log Out</a > : <Link to='/login' className="btn btn-primary">Log In</Link >

                    }



                    <Link to='/rider' className="btn ml-3 btn-primary ">Be A Rider </Link >
                </div>
            </div>
        </div>
    );
};

export default Navbar;