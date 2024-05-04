import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/navBar/NavBar'
import { useSelector } from 'react-redux'
import Chat from '../components/chat/Chat'
import './chatScreen.scss'
import { ChatProvider } from '../context/ChatContext'

function ChatScreen() {
    const userLogin = useSelector(state=>state.userLogin)
    const navigate = useNavigate()
    const {userInfo} = userLogin
    const userId = userInfo?.id
    useEffect(() =>{
        if(!userId) {
            navigate('/')
        }

        
    }, [userId, navigate])
    return (
        <>
            <NavBar />
            <div className='chat-container'>
                <ChatProvider >
                    <Chat />
                </ChatProvider>
            </div>
        </>
    )
}

export default ChatScreen   