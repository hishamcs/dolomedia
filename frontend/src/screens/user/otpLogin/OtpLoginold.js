// import { Link, useNavigate } from 'react-router-dom'
// import FormInput from '../../../components/formInput/FormInput'
// import { useContext, useEffect, useState } from 'react'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import {auth, provider} from '../../../firebase.config'
// import LoaderContext from '../../../context/LoaderContext'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginWithOTP } from '../../../acitons/userActions'
// import toast from 'react-hot-toast'



// const OtpLogin = () => {
//     const {setLoading} = useContext(LoaderContext)
//     const [openOtp, setOpenOtp] = useState(false)
//     const [otpNum, setOtpNum] = useState('')
//     const [phoneNum, setPhoneNum] = useState('')
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     // const userLogin = useSelector(state => state.userLogin)
//     // const { error } = userLogin

//     const input = {
//         name: 'phoneNumber',
//         type: 'text',
//         errorMessage: 'Enter a valid phone number',
//         placeholder: 'Enter your mobile Number',
//         pattern: `^\\d{10}$`,
//         required: true,
//     }

//     const otp = {
//         name:'otp',
//         type:'text',
//         errorMessage:'Enter a valid otp',
//         placeholder:'Enter your otp',
//         required:true
//     }


//     // const onCaptchaVerify = () => {
//     //     console.log('oncaptchaverifier is workingg')
//     //     if(!window.recaptchaVerifier) {
//     //         window.recaptchaVerifier = new RecaptchaVerifier(auth,
//     //             "recaptcha-container",
//     //             {
//     //                 "size":"invisible",
//     //                 "callback":(response) => {
//     //                     onSignIn()
//     //                 },
//     //                 "expired-callback":()=>{}
//     //             }
//     //         )
//     //     }
//     //     console.log('captchaverification is done')
//     // }

//     // const onSignIn = () => {
//     //     // setLoading(true)
//     //     onCaptchaVerify()
//     //     console.log('captcha verification is done...')
//     //     const appVerifier = window.recaptchaVerifier
//     //     const phoneNumber = '+91' + phoneNum
//     //     console.log('phonenumber : ', phoneNumber)
//     //     signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult)=> {
//     //         window.confirmationResult = confirmationResult
//     //         setOpenOtp(true)
//     //         console.log('otp sended successfully...')
//     //     }).catch((error)=> {
//     //         console.log('error occured while login with otp : ', error)
//     //     })
//     // }

//     const onSignIn = () => {
//         //  setLoading(true)
//         if(!phoneNum) return
//         const appVerifier = window.recaptchaVerifier
//         const phoneNumber = '+91' + phoneNum
//         console.log('phonenumber : ', phoneNumber)
//         signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult)=> {
//             window.confirmationResult = confirmationResult
//             setOpenOtp(true)
//             console.log('otp sended successfully...')
//         }).catch((error)=> {
//             console.log('error occured while login with otp : ', error)
//         })
//     }



//     // const handleOTPVerif = (e) => {
//     //     e.preventDefault()

//     //     window.confirmationResult.confirm(otpNum).then(async(res) => {
//     //         console.log('response form otp verfication : ', res)

//     //     }).catch((error) => {
//     //         console.log('error during otp verification : ', error)
//     //     })
//     // }


//     const handleOTPVerif = async(e) => {
//         e.preventDefault()
//         setLoading(true)

//         try {
//             const res = await window.confirmationResult.confirm(otpNum)
//             console.log('response after otp verification : ', res)

//             try {
//                 await dispatch(loginWithOTP(phoneNum))
//                 navigate('/home')
//             } catch(error) {
//                 toast.error(error)
//             }
//         } catch(error) {
//             console.log('error occured during otp verification : ', error)
//             toast.error(error.message || 'Error during login with OTP')
//         } finally {
//             setLoading(false)
//         }

//     }

//     const handleSubmit = async(e) => {
//         e.preventDefault()
        
//         onSignIn()
//         // try {
//         //     setLoading(true)
//         //     await dispatch(loginWithOTP(phoneNum))
//         //     navigate('/home')
//         // } catch(error) {
//         //     toast.error(error)
//         // } finally {
//         //     setLoading(false)
//         // }


//     }


//     useEffect(()=> {
//         if(!window.recaptchaVerifier) {
//             window.recaptchaVerifier = new RecaptchaVerifier(auth,
//                 "recaptcha-container",
//                 {
//                     "size":"invisible",
//                     "callback":(response) => {
//                         onSignIn()
//                     },
//                     "expired-callback":()=>{}
//                 }
//             )
//         }

//         console.log('window recap : ', window.recaptchaVerifier)
//     }, [])

//     return (
//         <div className='login'>
//             <div id='recaptcha-container'></div>
//             <div className='container'>
//                 {!openOtp ? (   <>
//                                 <h1>DOLOMEDIA</h1>
//                                 <form onSubmit={handleSubmit}>
//                                     <FormInput {...input} value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
//                                     <button>Generate OTP</button>
//                                 </form>
//                                 </>
//                             )
//                           : (
//                                 <>
//                                 <h1>Enter your OTP</h1>
//                                 <form onSubmit={handleOTPVerif}>
//                                     <FormInput {...otp} value={otpNum} onChange={(e)=>setOtpNum(e.target.value)}/>
//                                     <button>Enter Otp</button>
//                                 </form>
//                                 </>                
//                             )
//                 }
                

//                 <Link to='/'>Back</Link>
//             </div>
//         </div>
//     )
// }

// export default OtpLogin



























// import { Link, useNavigate } from 'react-router-dom'
// import FormInput from '../../../components/formInput/FormInput'
// import { useContext, useEffect, useState } from 'react'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import {auth, provider} from '../../../firebase.config'
// import LoaderContext from '../../../context/LoaderContext'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginWithOTP } from '../../../acitons/userActions'
// import toast from 'react-hot-toast'



// const OtpLogin = () => {
//     const {setLoading} = useContext(LoaderContext)
//     const [openOtp, setOpenOtp] = useState(false)
//     const [otpNum, setOtpNum] = useState('')
//     const [phoneNum, setPhoneNum] = useState('')
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const input = {
//         name: 'phoneNumber',
//         type: 'text',
//         errorMessage: 'Enter a valid phone number',
//         placeholder: 'Enter your mobile Number',
//         pattern: `^\\d{10}$`,
//         required: true,
//     }

//     const otp = {
//         name:'otp',
//         type:'text',
//         errorMessage:'Enter a valid otp',
//         placeholder:'Enter your otp',
//         required:true
//     }


//     const onCaptchaVerify = () => {
//         console.log('oncaptchaverifier is workingg')
//         if(!window.recaptchaVerifier) {
//             window.recaptchaVerifier = new RecaptchaVerifier(auth,
//                 "recaptcha-container",
//                 {
//                     "size":"invisible",
//                     "callback":(response) => {
//                         onSignIn()
//                     },
//                     "expired-callback":()=>{}
//                 }
//             )
//         }
//         console.log('captchaverification is done')
//     }
//     let isSendingOTP = false
//     const onSignIn = () => {
//         if(!isSendingOTP) {
//             isSendingOTP =true
//             onCaptchaVerify()
//             console.log('--------------------------------------------')
//             console.log('captcha verification is done...')
//             const appVerifier = window.recaptchaVerifier
//             const phoneNumber = '+91' + phoneNum
//             console.log('phonenumber : ', phoneNumber)
//             signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult)=> {
//                 window.confirmationResult = confirmationResult
//                 setOpenOtp(true)
//                 console.log('otp sended successfully...')
//                 isSendingOTP = false
//             }).catch((error)=> {
//                 console.log('error : ', error)
//                 console.log(error.code)
//                 // toast.error(error.code)
//                 isSendingOTP = false
//             })

//             console.log('--------------------------------------------')
//         }
        
//     }


//     const handleOTPVerif = (e) => {
//         e.preventDefault()

//         window.confirmationResult.confirm(otpNum).then(async(res) => {
//             console.log('response form otp verfication : ', res)
//             try {
//                 await dispatch(loginWithOTP(phoneNum))
//                 navigate('/home')
//             } catch(error) {
//                 toast.error(error)
//             }

//         }).catch((error) => {
//             console.log('error during otp verification : ', error)
//         })
//     }

    
//     const handleSubmit = async(e) => {
//         e.preventDefault()
        
//         onSignIn()
//     }

//     return (
//         <div className='login'>
//             <div id='recaptcha-container'></div>
//             <div className='container'>
//                 {!openOtp ? (   <>
//                                 <h1>DOLOMEDIA</h1>
//                                 <form onSubmit={handleSubmit}>
//                                     <FormInput {...input} value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
//                                     <button>Generate OTP</button>
//                                 </form>
//                                 </>
//                             )
//                           : (
//                                 <>
//                                 <h1>Enter your OTP</h1>
//                                 <form onSubmit={handleOTPVerif}>
//                                     <FormInput {...otp} value={otpNum} onChange={(e)=>setOtpNum(e.target.value)}/>
//                                     <button>Enter Otp</button>
//                                 </form>
//                                 </>                
//                             )
//                 }
                

//                 <Link to='/'>Back</Link>
//             </div>
//         </div>
//     )
// }

// export default OtpLogin





import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../../../components/formInput/FormInput'
import { useContext, useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import {auth, provider} from '../../../firebase.config'
import LoaderContext from '../../../context/LoaderContext'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithOTP } from '../../../acitons/userActions'
import toast from 'react-hot-toast'



const OtpLogin = () => {
    const {setLoading} = useContext(LoaderContext)
    const [openOtp, setOpenOtp] = useState(false)
    const [otpNum, setOtpNum] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const input = {
        name: 'phoneNumber',
        type: 'text',
        errorMessage: 'Enter a valid phone number',
        placeholder: 'Enter your mobile Number',
        pattern: `^\\d{10}$`,
        required: true,
    }

    const otp = {
        name:'otp',
        type:'text',
        errorMessage:'Enter a valid otp',
        placeholder:'Enter your otp',
        required:true
    }


    const onCaptchaVerify = () => {
        console.log('oncaptchaverifier is workingg')
        if(!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "recaptcha-container",
                {
                    "size":"invisible",
                    "callback":(response) => {
                        onSignIn()
                    },
                    "expired-callback":()=>{}
                }
            )
        }
        console.log('captchaverification is done')
    }
    let isSendingOTP = false
    const onSignIn = () => {
        if(!isSendingOTP) {
            isSendingOTP =true
            onCaptchaVerify()
            console.log('--------------------------------------------')
            console.log('captcha verification is done...')
            const appVerifier = window.recaptchaVerifier
            const phoneNumber = '+91' + phoneNum
            console.log('phonenumber : ', phoneNumber)
            signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult)=> {
                window.confirmationResult = confirmationResult
                setOpenOtp(true)
                console.log('otp sended successfully...')
                isSendingOTP = false
            }).catch((error)=> {
                console.log('error : ', error)
                console.log(error.code)
                toast.error(error.code)
                isSendingOTP = false
            })

            console.log('--------------------------------------------')
        }
        
    }


    const handleOTPVerif = (e) => {
        e.preventDefault()

        window.confirmationResult.confirm(otpNum).then(async(res) => {
            console.log('response form otp verfication : ', res)
            try {
                await dispatch(loginWithOTP(phoneNum))
                navigate('/home')
            } catch(error) {
                toast.error(error)
            }

        }).catch((error) => {
            console.log('error during otp verification : ', error)
        })
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault()
        onSignIn()
    }

    return (
        <div className='login'>
            <div id='recaptcha-container'></div>
            <div className='container'>
                {!openOtp ? (   <>
                                <h1>DOLOMEDIA</h1>
                                <form onSubmit={handleSubmit}>
                                    <FormInput {...input} value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
                                    <button>Generate OTP</button>
                                </form>
                                </>
                            )
                          : (
                                <>
                                <h1>Enter your OTP</h1>
                                <form onSubmit={handleOTPVerif}>
                                    <FormInput {...otp} value={otpNum} onChange={(e)=>setOtpNum(e.target.value)}/>
                                    <button>Enter Otp</button>
                                </form>
                                </>                
                            )
                }
                

                <Link to='/'>Back</Link>
            </div>
        </div>
    )
}

export default OtpLogin


