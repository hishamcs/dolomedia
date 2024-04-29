import List from "./list/List";
import ChatMessage from "./chatMessage/ChatMessage";
import './chat.scss'


const Chat = () => {
    return (
        <div className='chat-box'>
            <List />
            <ChatMessage />
        </div>
    )
}

export default Chat