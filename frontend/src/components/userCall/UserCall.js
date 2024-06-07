import { useContext, useEffect, useRef, useState } from 'react';
import './userCall.scss'
import Draggable from 'react-draggable';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ChatContext from '../../context/ChatContext';


const UserCall = () => {

    const {skt, setCall, stream, setStream, callUser, user,myVideo, userVideo} = useContext(ChatContext)

    const handleVideoCallEnd = () => {
        setCall(false)
    }

    useEffect(() => {
        console.log('media devices : ', navigator.mediaDevices)
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((currentStream) => {
            // console.log('current stream : ', currentStream)
            // setStream(currentStream)
            // console.log('udpated Stream : ', stream)
            callUser(user.id, currentStream)
            if(myVideo.current) {
                myVideo.current.srcObject = currentStream
            }
            // if(userVideo.current) {
            //     userVideo.current.srcObject = currentStream
            // } 
        })
        
    }, [])

    return (
        <Draggable bounds="html">
                <div className='video-container'>
                    <video ref={userVideo} autoPlay playsInline className='user-video'/>
                    <div className="buttons">
                        <VideocamOffIcon />
                        <CallEndIcon onClick={handleVideoCallEnd}/>
                    </div>
                    <video ref={myVideo} autoPlay playsInline muted width='100' className='my-video'/>
                </div>
        </Draggable>
    )
}

export default UserCall