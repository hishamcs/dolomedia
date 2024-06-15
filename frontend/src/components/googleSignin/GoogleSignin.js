import GoogleButton from "react-google-button"
import {signInWithPopup} from 'firebase/auth'
import {auth, provider} from '../../firebase.config'
import { useDispatch } from "react-redux"
import { googleLogin } from "../../acitons/userActions"
import { useNavigate } from "react-router-dom"


const GoogleSignin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async() => {
        try {
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            await dispatch(googleLogin(token))
            navigate('/home')
        } catch(error) {
            console.log('google signIN error : ', error)
        }
    }
    return (
        <GoogleButton type='dark' onClick={handleLogin}/>
    )
}

export default GoogleSignin