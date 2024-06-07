import './register.scss'
import FormInput from '../../../components/formInput/FormInput'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Register = () => {

    const [values, setValues] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""

    })

    const inputs = [
        {
            id:1,
            name: 'name',
            type: 'text',
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character and number",
            placeholder: 'UserName',
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id:2,
            name: 'email',
            type: 'email',
            errorMessage: 'Enter a valid email',
            placeholder: 'Email',
            required: true,
        },
        {
            id:3,
            name: 'phoneNumber',
            type: 'text',
            errorMessage: 'Enter a valid phone number',
            placeholder: 'Phone Number',
            required: true,
        },
        {
            id:4,
            name: 'password',
            type: 'password',
            errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character',
            placeholder: 'Password',
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id:5,
            name: 'confirmPassword',
            type: 'password',
            errorMessage: "Passwords don't match",
            placeholder: 'Confirm Password',
            pattern: values.password,
            required: true,
        },
        
    ]

    const onChange = (e) => {
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    console.log(values)
    return (
        <div className="register">
            <div className='container'>
                <h1>CREATE ACCOUNT</h1>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input=> (
                        <FormInput {...input} key={input.id} value={values[input.name]} onChange={onChange}/>
                    ))}
                    <button>Register</button>
                </form>
                <Link to='/'>Already have an account</Link>
                <GoogleButton type='dark' label='Signup with google'/>
            </div>
        </div>
    )
}
export default Register  