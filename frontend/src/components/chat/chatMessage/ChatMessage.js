import './chatMessage.scss'
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import { useEffect, useRef } from 'react';

const ChatMessage = () => {

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior:'smooth'})
    })

    useEffect(()=> {
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/1/`)

        socket.onopen = (e) => {
            console.log(' chat connections established')
        }

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log('data : ', data)
        }

        socket.onclose = (e) => {
            console.log('chat socket connection closed...')
        }

        return () => {
            socket.close()
        }
    })


    return(
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' />
                    <div className='texts'>
                        <span>Amir Khan</span>
                        <p>Lorem Ipsum dolor, sit amet.</p>
                    </div>
                </div>
                
                <div className='icons'>
                     <PhoneIcon />
                     <VideocamIcon />                  
                </div>
            </div>

            <div className='center'>
                
                    <div className="message">
                        <div className='texts'>
                            <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' />
                            <p>Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type 
                                and scrambled it to make a type specimen book
                            </p>
                            <span>
                                1 Min ago
                            </span>
                        </div>
                    </div>

                    <div className="message own">
                        <div className='texts'>
                            <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' />
                            <p>Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type 
                                and scrambled it to make a type specimen book
                            </p>
                            <span>
                                1 Min ago
                            </span>
                        </div>
                    </div>


                    <div className="message">
                        <div className='texts'>
                            <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt='' />
                            <p>Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type 
                                and scrambled it to make a type specimen book
                            </p>
                            <span>
                                1 Min ago
                            </span>
                        </div>
                    </div>


                    <div className="message own">
                        <div className='texts'>
                            <img src='https://cdn.mos.cms.futurecdn.net/Tpwmmfo3CiAJvwd4vXGzvn-1200-80.jpg' alt='' />
                            <p>Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type 
                                and scrambled it to make a type specimen book
                            </p>
                            <span>
                                1 Min ago
                            </span>
                        </div>
                    </div>

                    <div className="message">
                        <div className='texts'>
                            <img src='https://cdn.mos.cms.futurecdn.net/Tpwmmfo3CiAJvwd4vXGzvn-1200-80.jpg' alt='' />
                            <p>Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type 
                                and scrambled it to make a type specimen book
                            </p>
                            <span>
                                1 Min ago
                            </span>
                        </div>
                    </div>

                {/* <div className='message own'>
                    <div className='texts'>
                        <img src='' alt='' />
                    </div>
                </div> */}
                <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <label htmlFor='file'>
                        <ImageIcon />
                    </label>
                    <input type='file' id='file' style={{display:'none'}} />
                    <CameraAltIcon />
                    <MicIcon />
                </div>
                <input 
                    type='text' 
                    placeholder="Type a message"  
                />
                <button className='sendButton'>Send</button>
            </div>
        </div>
    )
}

export default ChatMessage