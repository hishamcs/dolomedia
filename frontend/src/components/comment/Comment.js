import {useState} from 'react';
import { useSelector } from 'react-redux';
import './comment.scss'
import Replies from '../replies/Replies'
import axios from 'axios';
import LikeComponent from '../like/LikeComponent';

const Comment = ({comment}) => {
    const [replyOpen, setReplyOpen] = useState(false)
    const [commentLikeCt, setCommentLikeCt] = useState(comment.likeCount)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const commentId = comment.id

    const handlelike = async() => {
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const response = await axios.post('/posts/like-comment/', {'commentId':commentId, 'userId':userId}, config)
        setCommentLikeCt(response.data.likeCount)
    }

    return(
        <div className='comment-container'>
            <div className='comme-cont'>
                <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                <div className='infoo'>
                    <span>{comment.user.name}</span>
                    <p>{comment.content}</p>
                    <div className='sub'>
                        {/* <p onClick={handlelike}>Like</p> */}
                        <p onClick={handlelike}><LikeComponent likeCount={commentLikeCt} /></p>
                        <p onClick={()=>setReplyOpen(!replyOpen)}>Reply</p>
                    </div>
                    
                </div>
                <span className='date'>1 hour ago</span>
            </div>
            {replyOpen && <Replies commentId={commentId}/>}
        </div>
    )
}

export default Comment