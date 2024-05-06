import { useContext, useEffect} from 'react';
import './chatList.scss';
import { useSelector } from 'react-redux';

import ChatContext from '../../../../context/ChatContext';




const ChatList = () => {

    const {id} = useSelector(state=>state.userLogin.userInfo)
    // const {id=null, token=null} = useSelector(state=>state?.userLogin?.userInfo||{})
    const {chats, fetchChatlist, searchInput, setChatroomId, setUser} = useContext(ChatContext)

    const handleSelect = (chat) => {
        chat.user1.id === id
                    ? setUser(chat.user2)
                    : setUser(chat.user1)
        setChatroomId(chat.id)
    }

    useEffect(()=> {
        fetchChatlist()
    }, [])

    const filteredChats = chats.filter(chat=>(
        chat.user1.id === id
            ? chat.user2.name.toLowerCase().includes(searchInput.toLowerCase())
            : chat.user1.name.toLowerCase().includes(searchInput.toLowerCase())
    ))
    return (
        <div className="chatList">
            {filteredChats.map(chat=> (
                <div 
                    className='item' 
                    key={chat.id}
                    onClick={()=>handleSelect(chat)}
                >
                    <img 
                        src={chat.user1.id === id 
                                ? chat.user2.pro_pic
                                : chat.user1.pro_pic
                            } 
                        alt=''
                    />
                    <div className='texts'>
                        <span>
                            {chat.user1.id === id 
                                ? chat.user2.name
                                : chat.user1.name
                            }
                        </span>
                        <p>{chat.last_message}</p> 
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatList