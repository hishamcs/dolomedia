import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,


    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,


    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_BLOCK_FAIL,
    USER_BLOCK_SUCCESS,
    USER_BLOCK_REQUEST,

    USER_FETCHPIC_FAIL,
    USER_FETCHPIC_SUCCESS,
    USER_FETCHPIC_REQUEST,

    USER_UPDATE_PROFILE_PIC

} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_UPDATE_PROFILE_PIC:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    pro_pic:action.payload
                }
            }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: {} }

        case USER_REGISTER_FAIL:
            // console.log('error in reducer : ', action.payload)
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            
            return {}

        default:
            return state
    }
}


export const userListReducer = (state = {user:[]}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST :
            return {loading:true}
        case USER_LIST_SUCCESS:
            return {loading:false, users:action.payload}
        case USER_LIST_FAIL:
            return {loading:false, error:action.payload}
        case USER_LIST_RESET:
            return {users:[]}
        default :
            return state
    }
}

export const userBlockReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_BLOCK_REQUEST:
            return {loading:true}
        
        case USER_BLOCK_SUCCESS:
            return {loading:false, success:true, message:action.payload}
        
        case USER_BLOCK_FAIL:
            return {loading:false, error:action.payload}

        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userPictureReducer = (state={}, action) => {
    switch(action.type) {
        case USER_FETCHPIC_REQUEST:
            return {loading:true}
        
        case USER_FETCHPIC_SUCCESS:
            return {loading:false, success:true,userPicture:action.payload}

        case USER_FETCHPIC_FAIL:
            return {loading:false, error:action.payload}

        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}