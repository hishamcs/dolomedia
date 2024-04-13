import {useState} from 'react';
import { useSelector } from 'react-redux';
import './comment.scss'
import Replies from '../replies/Replies'
import axios from 'axios';
import LikeComponent from '../like/LikeComponent';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreInfo from '../moreInfo/MoreInfo';

const Comment = ({comment, setComments, setCommentCount}) => {
    const [replies, setReplies] = useState([])
    const [repliesCount, setRepliesCount] = useState(comment.count_replies)
    const [replyOpen, setReplyOpen] = useState(false)
    const [replyFormOpen, setReplyFormOpen] = useState(false)
    const [commentLike, setCommentLike] = useState(comment.isUserLiked)
    const [commentLikeCt, setCommentLikeCt] = useState(comment.likeCount)
    const [content, setContent] = useState('')
    const userLogin = useSelector(state=>state.userLogin)
    const userPic = useSelector(state=>state.userPicture)
    const {userPicture} = userPic
    const proPicSrc = userPicture?.pro_pic
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const commentId = comment?.id

    const handlelike = async() => {
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const response = await axios.post('/posts/like-comment/', {'commentId':commentId, 'userId':userId}, config)
        setCommentLikeCt(response.data.likeCount)
        setCommentLike(response.data.commentLike)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method:'post',
            url:'/posts/comment/',
            data:{
                commentId:commentId,
                userId:userId,
                content:content
            }
        }).then((response) => {
            console.log('res : ', response.data.length)
            setReplies(response.data)
            setRepliesCount(response.data.length)
            setReplyFormOpen(false)
            setReplyOpen(true)
            setContent('')
        })

    }

    // useEffect(()=> {

    //     axios.get('/posts/like-comment/', {params: {commentId:commentId, userId:userId}}).then((response) => {
    //         console.log(response.data)
    //     })
    // })


    return(
        <div className='comment-container'>
            <div className='comme-cont'>
                <img src={comment.user.pro_pic} alt="" />
                <div className='infoo'>
                    <div className='info-dt'>
                        <div className='info-user'>
                            <span>{comment.user.name}</span>
                            <span className='comment-time'>{comment.time}</span>
                        </div> 
                        <MoreInfo info={comment} userId={userId} title='Comment' setUpdateData={setComments} setUpdateDataCount={setCommentCount}/>
                    </div>
                    {/* <div className='info-user'>
                        <span>{comment.user.name}</span>
                        <span className='comment-time'>{comment.time}</span>
                    </div> */}
                    
                    <p>{comment.content}</p>
                    <div className='sub'>
                        {/* <p onClick={handlelike}>Like</p> */}
                        <p onClick={handlelike}>
                            {commentLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                            <LikeComponent likeCount={commentLikeCt} />
                        </p>
                        {/* <p onClick={()=>setReplyOpen(!replyOpen)}>Reply</p> */}
                        <p onClick={()=>setReplyFormOpen(!replyFormOpen)}>Reply</p>
                    </div>
                    {replyFormOpen && (
                                    <form onSubmit={handleSubmit}>
                                        <div className='reply-send'>
                                            <img src={proPicSrc} alt="" />
                                            <input type='text' placeholder='write your reply' required value={content} onChange={(e)=>setContent(e.target.value)}/>
                                            <button type='submit' className=''>Reply</button>
                                            <span onClick={()=>setReplyFormOpen(!replyFormOpen)}>Cancel</span>
                                        </div>
                                    </form>
                    )}
                    
                    <div className='cmt-replies' onClick={()=>setReplyOpen(!replyOpen)}>
                        {repliesCount > 0 &&   <span>
                                                            {replyOpen? <ArrowDropDownIcon />:<ArrowDropUpIcon />}
                                                            {repliesCount} Replies
                                                        </span>}
                    </div>
                    
                </div>
                {/* <span className='date'>1 hour ago</span> */}
            </div>
            {replyOpen && <Replies commentId={commentId} replies={replies} setReplies={setReplies} setRepliesCount={setRepliesCount}/>}
        </div>
    )
}

export default Comment