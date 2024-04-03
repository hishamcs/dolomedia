import {useEffect} from 'react'
import NavBar from '../components/navBar/NavBar'
import { useSelector } from 'react-redux'

function ChatScreen() {
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userId = userInfo?.id
    useEffect(() =>{
        console.log('userid : ', userId)
    }, [])
    return (
        <NavBar />
    )
}

export default ChatScreen   