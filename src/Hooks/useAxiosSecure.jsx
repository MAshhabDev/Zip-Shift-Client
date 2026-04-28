import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Intercept request
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {

            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        // Intercept Response

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {


            const statusCode = error.response?.status;

            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            }
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)

        }


    }, [user,logOut,navigate])


    return axiosSecure
};

export default useAxiosSecure;