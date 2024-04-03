import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../acitons/userActions'
import GoogleButton from 'react-google-button'
import {auth, provider} from '../firebase.config'
import {signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'

import axios from 'axios'


function RegisterScreen({ location={search:''}, history }) {

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    // const [otp, setOtp] = useState('')
    const [otpValue, setOtpValue] = useState('')
    const [otpSection, setOtpSection] = useState(false) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/home'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

     useEffect(() => {
    }, [name, email, password]);


    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider).then((data) => {
            const {email,firstName} = data._tokenResponse
            setEmail(email)
            setName(firstName)
            dispatch(register(name, email, '12345'))
        })
    }

    const onCaptchaVerify = () => {
        console.log('llllllllllll')
        if(!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "recaptcha-container",
                {
                    "size":"invisible",
                    "callback":(response) => {
                        onSignUp()
                    },
                    "expired-callback":()=> {},
                })
        }
    }
    const onSignUp = () => {
        onCaptchaVerify()

        console.log('captcha verification is done...')
        const appVerifier = window.recaptchaVerifier;
        const phoneNum = '+91' + phoneNumber;
        console.log('phone : ', phoneNum)
        signInWithPhoneNumber(auth, phoneNum, appVerifier).then((confirmationResult)=> {
            window.confirmationResult = confirmationResult
            setOtpSection(true)
            console.log('otp sended successfully...')
        }).catch((error)=> {
            console.log(error)

        })
    }

    const onOTPVerify = (e) => {
        e.preventDefault()
        
        window.confirmationResult.confirm(otpValue).then(async(res) => {
            console.log('res :', res)
            dispatch(register(name, email, password, phoneNumber))
        }).catch((error)=> {
            console.log(error)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            // dispatch(register(name, email, password, phoneNumber))
            
            // axios.get('/api/otp-generation/', {params:{phone:phoneNumber}}).then((response) => {
            //     console.log(response)
            // })
            // setOtpSection(true)
            onSignUp()
        }

    }





    return (
        <FormContainer>
            <div id='recaptcha-container'></div>
            


            {otpSection?(
                <>
            <h1>OTP verification</h1>
            <Form className='py-5' onSubmit={onOTPVerify}>
                <Form.Label>Enter The OTP</Form.Label>
                <Form.Control
                        required
                        type='text'
                        placeholder='Enter OTP'
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                >
                </Form.Control>
                <Row className='py-3'>
                    <Col>
                        <Button type='submit'>Submit</Button>
                    </Col>
                </Row>
            </Form>
            </>
            ):(
                <>
                <h1>Sign UP</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type='phoneNumber'
                        placeholder='Enter Phone number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Button type='submit' variant='primary' className='my-3'>
                            Register
                        </Button>
                    </Col>
                    <Col className='py-4'>
                        <Link to='/'>For Login</Link>
                    </Col>
                </Row>
                <Row className='py-3 d-flex justify-content-center'>
                    <GoogleButton type='light' label='Signup with google' onClick={handleGoogleAuth}/>
                </Row>
                

            </Form>
            </>
            )}


        </FormContainer >
    )
}

export default RegisterScreen