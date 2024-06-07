
import NavBar from '../components/navBar/NavBar'
import Chat from '../components/chat/Chat'
import './chatScreen.scss'
import ChatContext, { ChatProvider } from '../context/ChatContext'
import UserCall from '../components/userCall/UserCall'
import { useContext } from 'react'

function ChatScreen() {
    const {call} = useContext(ChatContext)

    return (
        <>
            <NavBar />
            <div className='chat-container'>
                <Chat />
                { call && <UserCall />    }
            </div>
        </>
    )
}

export default ChatScreen   