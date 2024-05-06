
import NavBar from '../components/navBar/NavBar'
import Chat from '../components/chat/Chat'
import './chatScreen.scss'
import { ChatProvider } from '../context/ChatContext'

function ChatScreen() {
    
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