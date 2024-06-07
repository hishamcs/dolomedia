import './chatMessage.scss'
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatContext from '../../../context/ChatContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ChatMessage = () => {
    const {id, token} = useSelector(state=>state.userLogin?.userInfo)
    const endRef = useRef(null)
    const [userIsOnline, setUserIsOnline] = useState(false)
    const {chatroomId, user, fetchChatlist, skt, setCall, callUser, stream} = useContext(ChatContext)
    const [textMsg, setTextMsg] = useState('')
    // const [skt, setSkt] = useState(null)
    const [chatMessages, setChatMessages] = useState([])
    const [img, setImg] = useState({
        file:null,
        url:""
    })
    
    const handleSubmit = () => {

        if(skt) {
            // let imgUrl = null;
            if(textMsg.trim()==='') return

            skt.send(JSON.stringify({"type":'chat', "message":textMsg, "chatroomId":chatroomId, "receiverId":user.id}))
            console.log('sendedde')
        }
    }

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const getChatroomMessage = async() => {

        const config = {
            params:{
                "chatroomId":chatroomId
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get('/api/chatroom/messages/', config)
            if (response.status ===200) {
                setChatMessages(response.data)
                setTextMsg('')
            }
        } catch(error) {
            console.log('error : ',error.response.data?error.response.data.detail:error.message)
        }
        
    }

    const handleVideoCall = () => {
        setCall(true)
        // callUser(user.id)
        
    }

    // useEffect(()=> {
    //     if(chatroomId && id) {

    //         const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatroomId}/${id}/`)
    
    //         socket.onopen = (e) => {
    //             console.log(' chat connections established')
    //             setSkt(socket)
    //         }
    
    //         socket.onmessage = (e) => {
    //             const data = JSON.parse(e.data)
    //             data?.chatroom && (data?.chatroom?.user1?.id === id 
    //                                         ? setUserIsOnline(data.chatroom.user2.is_online)
    //                                         : setUserIsOnline(data.chatroom.user1.is_online))
    //             data?.message && fetchChatlist()
    //             getChatroomMessage()
    //             console.log('data : ', data)
    //         }
    
    //         socket.onclose = (e) => {
    //             console.log('chat socket connection closed...')
    //             setSkt(null)
    //         }
            
    //         getChatroomMessage()
            
    //         return () => {
    //             setSkt(null)
    //             socket.close()
    //         }
    //     }
    // }, [chatroomId, id])

    useEffect(() => {
        if(chatroomId) {
            // console.log('socket : ', skt)
            if(skt) {
                skt.onmessage = (e) => {
                    const data = JSON.parse(e.data)
                    console.log('data : ', data)
                    data?.message && fetchChatlist()
                    getChatroomMessage()
                    
                }
            }
            getChatroomMessage()

        }
    }, [chatroomId, skt])

    useEffect(() => {
        if(chatMessages){
            endRef.current?.scrollIntoView({behavior:'smooth'})
        }
    }, [chatMessages])

    return(
        <div className='chat'>
            {user &&(<>
            <div className='top'>
                <div className='user'>
                    <img src={user.pro_pic} alt='' />
                    <div className='texts'>
                        <span>{user.name}</span>
                        <p>{user.is_online? "Online": "Offline"}</p>
                    </div>
                </div>
                
                <div className='icons'>
                     <PhoneIcon />
                     <VideocamIcon onClick={handleVideoCall}/>                  
                </div>
            </div>

            <div className='center'>
                    {chatMessages.map(msg=> (

                        <div className={msg.sender===id?"message own":"message"} key={msg.id}>
                            <div className='texts'>
                                {/* <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' /> */}
                                <p>
                                    {msg.message}
                                </p>
                                <span>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}

                    {img.url && <div className='message own'>
                                    <div className='texts'>
                                        <img src={img.url} alt='' />
                                        <span className='alert-send'>This is image preview, please click send button</span>
                                    </div>
                                </div>
                    }

                    <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <label htmlFor='file'>
                        <ImageIcon />
                    </label>
                    <input type='file' id='file' style={{display:'none'}} onChange={handleImg}/>
                    <CameraAltIcon />
                    <MicIcon />
                </div>
                <input 
                    type='text' 
                    placeholder="Type a message"
                    value={textMsg}
                    onChange={(e)=>setTextMsg(e.target.value)}  
                />
                <button className='sendButton' onClick={handleSubmit}>Send</button>
            </div></>)
            }
        </div>
    )
}

export default ChatMessage











//-------------------------------------------------------

// import './chatMessage.scss'
// import PhoneIcon from '@mui/icons-material/Phone';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import ImageIcon from '@mui/icons-material/Image';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import MicIcon from '@mui/icons-material/Mic';
// import { useContext, useEffect, useRef, useState } from 'react';
// import ChatContext from '../../../context/ChatContext';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const ChatMessage = () => {
//     const {id, token} = useSelector(state=>state.userLogin?.userInfo)
//     const endRef = useRef(null)
//     const [userIsOnline, setUserIsOnline] = useState(false)
//     const {chatroomId, user, fetchChatlist} = useContext(ChatContext)
//     const [textMsg, setTextMsg] = useState('')
//     const [skt, setSkt] = useState(null)
//     const [chatMessages, setChatMessages] = useState([])
//     const [img, setImg] = useState({
//         file:null,
//         url:""
//     })
    
//     const handleSubmit = () => {

//         if(skt) {
//             let imgUrl = null;
//             if(textMsg.trim()==='') return

//             skt.send(JSON.stringify({"message":textMsg}))
//             console.log('sendedde')
//         }
//     }

//     const handleImg = (e) => {
//         if(e.target.files[0]) {
//             setImg({
//                 file: e.target.files[0],
//                 url: URL.createObjectURL(e.target.files[0])
//             })
//         }
//     }

//     const getChatroomMessage = async() => {

//         const config = {
//             params:{
//                 "chatroomId":chatroomId
//             },
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         try {
//             const response = await axios.get('/api/chatroom/messages/', config)
//             if (response.status ===200) {
//                 setChatMessages(response.data)
//                 setTextMsg('')
//             }
//         } catch(error) {
//             console.log('error : ',error.response.data?error.response.data.detail:error.message)
//         }
        
//     }

//     useEffect(()=> {
//         if(chatroomId && id) {

//             const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatroomId}/${id}/`)
    
//             socket.onopen = (e) => {
//                 console.log(' chat connections established')
//                 setSkt(socket)
//             }
    
//             socket.onmessage = (e) => {
//                 const data = JSON.parse(e.data)
//                 data?.chatroom && (data?.chatroom?.user1?.id === id 
//                                             ? setUserIsOnline(data.chatroom.user2.is_online)
//                                             : setUserIsOnline(data.chatroom.user1.is_online))
//                 data?.message && fetchChatlist()
//                 getChatroomMessage()
//                 console.log('data : ', data)
//             }
    
//             socket.onclose = (e) => {
//                 console.log('chat socket connection closed...')
//                 setSkt(null)
//             }
            
//             getChatroomMessage()
            
//             return () => {
//                 setSkt(null)
//                 socket.close()
//             }
//         }
//     }, [chatroomId, id])

//     useEffect(() => {
//         if(chatMessages){
//             endRef.current?.scrollIntoView({behavior:'smooth'})
//         }
//     }, [chatMessages])

    
//     return(
//         <div className='chat'>
//             {user &&(<>
//             <div className='top'>
//                 <div className='user'>
//                     <img src={user.pro_pic} alt='' />
//                     <div className='texts'>
//                         <span>{user.name}</span>
//                         <p>{userIsOnline? "Online": "Offline"}</p>
//                     </div>
//                 </div>
                
//                 <div className='icons'>
//                      <PhoneIcon />
//                      <VideocamIcon />                  
//                 </div>
//             </div>

//             <div className='center'>
//                     {chatMessages.map(msg=> (

//                         <div className={msg.sender===id?"message own":"message"} key={msg.id}>
//                             <div className='texts'>
//                                 {/* <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' /> */}
//                                 <p>
//                                     {msg.message}
//                                 </p>
//                                 <span>
//                                     {msg.timestamp}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}

//                     {img.url && <div className='message own'>
//                                     <div className='texts'>
//                                         <img src={img.url} alt='' />
//                                         <span className='alert-send'>This is image preview, please click send button</span>
//                                     </div>
//                                 </div>
//                     }

//                     <div ref={endRef}></div>
//             </div>
//             <div className='bottom'>
//                 <div className='icons'>
//                     <label htmlFor='file'>
//                         <ImageIcon />
//                     </label>
//                     <input type='file' id='file' style={{display:'none'}} onChange={handleImg}/>
//                     <CameraAltIcon />
//                     <MicIcon />
//                 </div>
//                 <input 
//                     type='text' 
//                     placeholder="Type a message"
//                     value={textMsg}
//                     onChange={(e)=>setTextMsg(e.target.value)}  
//                 />
//                 <button className='sendButton' onClick={handleSubmit}>Send</button>
//             </div></>)
//             }
//         </div>
//     )
// }

// export default ChatMessage
