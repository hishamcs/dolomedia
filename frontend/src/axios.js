import axios from 'axios'


const baseURL = 'http://127.0.0.1:8000/api/';


const axiosInstance = axios.create({
    baseURL: baseURL,
    // timeout:5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },

});


axiosInstance.interceptors.request.use(
    (config)=> {
        console.log('axios interceptor request config : ', config)
        const userInfo = localStorage.getItem('userInfo')
        const token = userInfo ? JSON.parse(userInfo).access: null

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            console.log('token is deleted')
            delete config.headers.Authorization
        }

        // Determine the content-type
        if(config.data) {
            if(typeof config.data === 'object' && !(config.data instanceof FormData)) {
                console.log('content type is : application/json')
                config.headers['Content-Type'] = 'application/json'
            } else if (config.data instanceof FormData) {
                console.log('content type is : multipart form data')
                config.headers['Content-Type'] = 'multipart/form-data'
            } else {
                console.log('content type is : text plain')
                config.headers['Content-Type'] = 'text/plain'
            }
        }


        return config
    }, 
    (error) => {
        console.log('axios interceptor error : ', error)
        return Promise.reject(error)
    }
)




axiosInstance.interceptors.response.use(
    (response) => {
        console.log('response : ', response)
        return response
    },
    async function (error) {
        console.log('error  :', error)
        // const originalRequest = error.config

        // if(typeof error.response === 'undefined') {
        //     alert(
        //         'A server/network error occured.'+
        //         'Looks Like CORS might be the problem. ' +
        //         'Sorry about this - we will get it fixed shortly'
        //     )
        //     return Promise.reject(error)
        // }

        // if (
        //         error.response.status === 401 && 
        //         originalRequest.url === baseURL + 'token/refresh/'
        // ) {
        //     window.location.href = '/login/'
        //     return Promise.reject(error)
        // }

        // if (
        //         error.response.data.code === 'token_not_valid' && 
        //         error.response.status === 401 && 
        //         error.response.statusText === 'Unauthorized'
        // ) {
        //     const refreshToken = localStorage.getItem('refresh_token')

        //     if (refreshToken) {
        //         const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        //         const now = Math.ceil(Date.now() / 1000)

        //         console.log(tokenParts.exp)

        //         if (tokenParts.exp > now) {
        //             return axiosInstance
        //             .post('/token/refresh/', {refresh: refreshToken})
        //             .then((response) => {
        //                 localStorage.setItem('access_token', response.data.access)
        //                 localStorage.setItem('refresh_token', response.data.refresh)

        //                 axiosInstance.defaults.headers['Authorization'] = 
        //                         'JWT' + response.data.access;

        //                 originalRequest.headers['Authorization'] = 
        //                         'JWT' + response.data.access;
                        
        //                 return axiosInstance(originalRequest)

        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             })
                


        //         } else {
        //           console.log('Refresh token is expired', tokenParts.exp, now)
        //           window.location.href = '/login/' 
        //         }



        //     } else {
        //         console.log('Refresh token not available')
        //         window.location.href = '/login/'
        //     }
        // }
        
        return Promise.reject(error)
    }
)



export default axiosInstance

