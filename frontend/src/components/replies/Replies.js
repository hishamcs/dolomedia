import './replies.scss'
import Reply from '../reply/Reply'
import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'




const Replies = ({commentId, replies, setReplies, setRepliesCount}) => {
    const userLogin = useSelector(state=>state.userLogin)
    const [refreshReply, setRefreshReply] = useState(false)
    // const [replies, setReplies] = useState([])
    const {userInfo} = userLogin 
    const userId = userInfo?.id
    
    
    
    useEffect(() => {
        axios.get('/posts/comment/', {params: {commentId:commentId, userId:userId}}).then((response) => {
            setReplies(response.data)
        })
    }, [commentId, refreshReply, userId, setReplies])
    
    
    
    return (
        <div className='replies'>
            <div className='reply'>
                {replies?.map(reply=> (
                    <Reply reply={reply} key={reply.id} setRefreshReply={setRefreshReply} refreshReply={refreshReply} setReplies={setReplies} setRepliesCount={setRepliesCount}/>
                ))}
            </div>
            
        </div>
    )
}

export default Replies