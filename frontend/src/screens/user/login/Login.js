import FormInput from '../../../components/formInput/FormInput'
import './login.scss'
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import { login, logout } from '../../../acitons/userActions'
import LoaderContext from '../../../context/LoaderContext';
import GoogleSignin from '../../../components/googleSignin/GoogleSignin';



const Login = () => {

    const {setLoading} = useContext(LoaderContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const onChange = (e) => {
        e.preventDefault()
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if(values.password.trim() ==='') {
                toast.error('Please enter valid password')
                setLoading(false)
                return
            }

            await dispatch(login(values.email, values.password))
            navigate('/home')
        }catch(error) {
            toast.error('Failed to login.please try again')
        } finally {
            setLoading(false)
        }
    }

    const inputs = [
        {
            id:1,
            name:'email',
            type: 'email',
            errorMessage: 'Enter a valid email',
            placeholder: 'Email',
            required:true
        },
        {
            id:2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            }
    ]

    useEffect(()=> {
        if(error) {
            toast.error(error)
            setLoading(false)
            dispatch(logout())
        }
    }, [])

    return (
        <div className="login">
            <div className='container'>
                <h1>DOLOMEDIA</h1>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input=> (
                        <FormInput {...input} key={input.id} value={values[input.name]} onChange={onChange} />
                    ))}
                    <div style={{display:"flex", gap:"10px", justifyContent:"space-between", width:"100%"}}>
                        {/* <a href='/'> Login with OTP</a> */}
                        <Link to='/otp-login'>Login with OTP</Link>
                        <Link to='/forgot-password'> Forgot Password ?</Link>
                    </div>
                    <button>Login</button>
                </form>
                <p>Don't have account ? <Link to='/register'>Register</Link></p>
                <GoogleSignin />
            </div>
        </div>
    )
}


export default Login
