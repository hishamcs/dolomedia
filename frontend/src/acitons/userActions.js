
import axiosInstance from '../axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_BLOCK_REQUEST,
    USER_BLOCK_SUCCESS,
    USER_BLOCK_FAIL, 

    USER_FETCHPIC_FAIL,
    USER_FETCHPIC_REQUEST,
    USER_FETCHPIC_SUCCESS,


} from '../constants/userConstants'

import axios from 'axios';








export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // const { data } = await axios.post(
        //     '/api/users/login/',
        //     { 'username': email, 'password': password },
        //     config
        // )
        // console.log('data : ', data)

        const {data} = await axiosInstance.post('user/login/', { 'username': email, 'password': password })
        console.log('data : ', data)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) { 
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const googleLogin = (token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const {data} = await axiosInstance.post('user/google-auth/', {token})
        console.log('google res data : ', data)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const register = (name, email, password, phoneNumber) => async (dispatch) => {
    try {
            dispatch({
                type: USER_REGISTER_REQUEST
            })

            // const config = {
            //     headers: {
            //         'Content-type': 'application/json'
            //     }
            // }

            // const { data } = await axios.post(
            //     '/api/users/register/',
            //     { 'name': name, 'email': email, 'password': password, 'phoneNumber': phoneNumber },
            //     config
            // )
            // console.log('reg data : ', data)

            const {data} = await axiosInstance.post('user/register/', { 'first_name': name, 'email': email, 'password': password, 'phone': phoneNumber })
            console.log('data from register : ', data)
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })

            // dispatch({
            //     type: USER_LOGIN_SUCCESS,
            //     payload: data
            // })

            // localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_LIST_RESET})
}


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const {userLogin:{userInfo}} = getState()
        
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/`, config)

        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
    } catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const blockUser = (id) => async(dispatch, getState) => {
    try{
        dispatch({type:USER_BLOCK_REQUEST})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/user/blo-unblo/${id}/`, config)
        dispatch({
            type:USER_BLOCK_SUCCESS,
            payload:data
        })
    } catch(error) {
        dispatch({
            type:USER_BLOCK_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message
        })
    }
}

export const fetchPicture = (userId) => async(dispatch, getState) => {
    try {
        // console.log('id : ', userId)
        dispatch({type:USER_FETCHPIC_REQUEST})

        const {userLogin:{userInfo}} = getState()

        // const config = {
        //     headers: {
        //         'Content-type':'application/json',
        //         Authorization:`Bearer ${userInfo.token}`
        //     }
        // }
        
        // const {data} = await axios.post(`/api/user/profile/fetch-user-pics/`, {'userId': userId}, config)
        
        const {data} = await axiosInstance.post(`user/profile/fetch-user-pics/`, {'userId': userId})
        dispatch({
            type:USER_FETCHPIC_SUCCESS,
            payload:data
        })

    } catch(error) {
        dispatch({
            type:USER_FETCHPIC_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}




