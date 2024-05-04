import { createContext, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext({})

export const ChatProvider = ({children}) => {
    // const {id, token} = useSelector(state=>state?.userLogin?.userInfo)
    const {id=null, token=null} = useSelector(state=>state?.userLogin?.userInfo||{})
    const [user, setUser] = useState(null) 
    const [chatroomId, setChatroomId] = useState(null)
    const [chats, setChats] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()


    const fetchChatlist = async() => { 
        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const response = await axios.post('/api/chatlist/',{'userId':id}, config)
            console.log('chat list : ', response.data)
            setChats(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <ChatContext.Provider value={{chats, fetchChatlist,searchInput, setSearchInput, chatroomId, setChatroomId, user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext