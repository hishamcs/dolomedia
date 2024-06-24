import { Link, useNavigate } from "react-router-dom"
import FormInput from "../../../components/formInput/FormInput"
import { useState } from "react"
import axiosInstance from "../../../axios"
import toast from "react-hot-toast"




const ForgotPassword = () => {

    const [openOtp, setOpenOtp] = useState(false)
    const [otpNum, setOtpNum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cofirmPassword, setConfirmPassword] = useState('')
    const [otpVerified, setOtpVerified] = useState(false)
    const navigate = useNavigate()

    const input = {
        name: 'email',
        type: 'email',
        errorMessage: 'Enter valid email',
        placeholder: 'Enter your Email address',
        required: true,
    }

    const otp = {
        name:'otp',
        type:'text',
        errorMessage:'Enter a valid otp',
        placeholder:'Enter your otp',
        required:true
    }

    const pword = {
        name: 'password',
        type: 'password',
        errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character',
        placeholder: 'Password',
        pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
    }

    const confirmPword ={
        name: 'confirmPassword',
        type: 'password',
        errorMessage: "Passwords don't match",
        placeholder: 'Confirm Password',
        pattern: password,
        required: true,
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('user/otp-login-generate/',{email})
            if (response.status === 200) {
                toast.success('OTP sended to your email')
                setOpenOtp(true)
            }
        }catch(error){
            console.log('error : ', error.response.data.error)
            toast.error(error.response.data.error) 
        }
    }
    
    const handleOTP = async(e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('user/otp-verify/', {email, otpNum})
            if (response.status === 200) {
                toast.success('OTP verified successfully')
                setOtpVerified(true)
            }
        } catch(error) {
            toast.error(error.response && error.response.data.detail
                            ? error.response.data.detail
                            : error.message
            )
            navigate('/')
        }
    }

    const handlePassword = async(e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('user/change-password/', {email, password})
            if(response.status === 200) {
                toast.success('Password Changed successfully...')
            }
        } catch(error) {
            toast.error(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            )
        }
        navigate('/')
    }




    return(
        <div className="login">
            <div className='container'>
            {(!openOtp && !otpVerified) ? (   <>
                                <h1>Forgot Password</h1>
                                <form onSubmit={handleSubmit}>
                                    <FormInput {...input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <button>Generate OTP</button>
                                </form>
                                </>
                            )
                            :(!otpVerified) ? (
                                                    <>
                                                        <h1>Enter your OTP</h1>
                                                        <form onSubmit={handleOTP}>
                                                            <FormInput {...otp} value={otpNum} onChange={(e)=>setOtpNum(e.target.value)}/>
                                                            <button>Enter Otp</button>
                                                        </form>
                                                    </>                
                                                )
                                            : (
                                                <>
                                                    <h1>Change Password</h1>
                                                    <form onSubmit={handlePassword}>
                                                        <FormInput {...pword} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                                        <FormInput {...confirmPword} value={cofirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                                        <button>Change password</button>
                                                    </form>
                                                </>
                                            )
            }
            
                <Link to='/'>Back</Link>
            </div>
        </div>
    )
}

export default ForgotPassword