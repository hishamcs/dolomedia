import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../../../components/formInput/FormInput'
import { useContext, useState } from 'react'
import LoaderContext from '../../../context/LoaderContext'
import { useDispatch} from 'react-redux'
import { verifyOTP } from '../../../acitons/userActions'
import toast from 'react-hot-toast'
import axiosInstance from '../../../axios'



const OtpLogin = () => {
    const {setLoading} = useContext(LoaderContext)
    const [openOtp, setOpenOtp] = useState(false)
    const [otpNum, setOtpNum] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
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

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('user/otp-login-generate/',{email})
            if (response.status === 200) {
                toast.success('OTP sended to your email')
                setOpenOtp(true)
            }
        } catch(error) {
            console.log('error : ', error.response.data.error)
            toast.error(error.response.data.error)
        }
    }

    const handleOTP = async(e) => {
        e.preventDefault()
        try {
            await dispatch(verifyOTP(email, otpNum))
            navigate('/home')
        } catch(error) {
            console.log('error occureed during otp verfifcaiton')
        }
    }

    return (
        <div className='login'>
            <div id='recaptcha-container'></div>
            <div className='container'>
                {!openOtp ? (   <>
                                <h1>DOLOMEDIA</h1>
                                <form onSubmit={handleSubmit}>
                                    <FormInput {...input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <button>Generate OTP</button>
                                </form>
                                </>
                            )
                          : (
                                <>
                                <h1>Enter your OTP</h1>
                                <form onSubmit={handleOTP}>
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