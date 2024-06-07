import FormInput from '../../../components/formInput/FormInput'
import './login.scss'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import { login } from '../../../acitons/userActions'



const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        if(values.password.trim() ==='') {
            toast.error('Please enter valid password')
            return
        }

        await dispatch(login(values.email, values.password))
        navigate('/home')

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

    return (
        <div className="login">
            <div className='container'>
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input=> (
                        <FormInput {...input} key={input.id} value={values[input.name]} onChange={onChange} />
                    ))}
                    <div style={{display:"flex", gap:"10px", justifyContent:"space-between", width:"100%"}}>
                        <a href='/'> Login with OTP</a>
                        <a href='/'> Forgot Password ?</a>
                    </div>
                    <button>Login</button>
                </form>
                <p>Don't have account ? <Link to='/register'>Register</Link></p>
                <GoogleButton type='dark' />
            </div>
        </div>
    )
}


export default Login
