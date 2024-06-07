
import { createContext, useEffect, useState, useRef} from "react";
import { useSelector } from "react-redux";
import axios from "axios";



const ChatContext = createContext({})

export const ChatProvider = ({children}) => {
    const {id, token} = useSelector(state=>state?.userLogin?.userInfo)
    const [user, setUser] = useState(null) 
    const [chatroomId, setChatroomId] = useState(null)
    const [chats, setChats] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [skt, setSKT] = useState(null)
    const [call, setCall] = useState(false) // call container
    const myVideo = useRef()
    const userVideo = useRef()
    const peerRef = useRef()
    // const [stream, setStream] = useState()


    const fetchChatlist = async() => { 
        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const response = await axios.post('/api/chatlist/',{'userId':id}, config)
            // console.log('chat list : ', response.data)
            setChats(response.data)

            // to update user in each fetch list call
            if (user) {
                // console.log('user before update : ', user)
                const chat = response.data.find(chat=>chat.user1.id===user.id || chat.user2.id ===user.id)
                // console.log('updated user : ', chat.user1.id===user.id?chat.user1:chat.user2)
                setUser(chat.user1.id===user.id?chat.user1:chat.user2)
            }

        } catch(error) {
            console.log(error)
        }
    }

    // const call

    useEffect(() => {
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${id}/`)
        
        socket.onopen = (e) => {
            console.log('chat connection established...')
            setSKT(socket)
        }

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log('data in chat context : ', data)
            data?.message && fetchChatlist()
        }

        socket.onclose = (e) => {
            console.log('chat socket connection closed')
            setSKT(null)
        }

        return () => {
            setSKT(null)
            socket.close()
        }
    }, [id])

    const callUser = (remoteUserId, stream) => {
        const peer = new RTCPeerConnection()
        peerRef.current = peer
        stream.getTracks().forEach((track)=> peer.addTrack(track, stream))
        peer.onicecandidate = (event) => {
            if(event.candidate) {
                // skt.send(JSON.stringify({type:'iceCandidate', candidate:event.candidate, to: remoteUserId}))
                console.log('event : ', event.candidate)
            }
        }
        peer.ontrack = (event) => {
            console.log('event in on track :', event)
            // if(userVideo.current) {
            //     userVideo.current.srcObject = event.streams[0]
            // }
        }

        // skt.send(JSON.stringify({ type: 'callUser', userToCall: remoteUserId}))

        peer.createOffer()
        .then((offer)=> {
            peer.setLocalDescription(offer)
        })
        .then(() => {
            skt.send(JSON.stringify({type: 'offer', offer: peer.localDescription, to: remoteUserId}))
        })
        .catch(error => {
            console.log('error while creating : ', error)
        })
    }

    return(
        <ChatContext.Provider value={{chats, fetchChatlist,searchInput, setSearchInput, chatroomId, setChatroomId, user, setUser, skt, callUser, call, setCall, myVideo, userVideo}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext




//-----------------------------------------------------


// import { createContext, useState} from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";



// const ChatContext = createContext({})

// export const ChatProvider = ({children}) => {
//     const {id, token} = useSelector(state=>state?.userLogin?.userInfo)
//     const [user, setUser] = useState(null) 
//     const [chatroomId, setChatroomId] = useState(null)
//     const [chats, setChats] = useState([])
//     const [searchInput, setSearchInput] = useState('')


//     const fetchChatlist = async() => { 
//         const config = {
//             headers : {
//                 Authorization:`Bearer ${token}`
//             }
//         }
//         try {
//             const response = await axios.post('/api/chatlist/',{'userId':id}, config)
//             console.log('chat list : ', response.data)
//             setChats(response.data)
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     return(
//         <ChatContext.Provider value={{chats, fetchChatlist,searchInput, setSearchInput, chatroomId, setChatroomId, user, setUser}}>
//             {children}
//         </ChatContext.Provider>
//     )
// }

// export default ChatContext