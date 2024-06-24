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
import toast from 'react-hot-toast';
import axiosInstance from '../../axios';

const Comment = ({comment, setComments, setCommentCount}) => {
    const [replies, setReplies] = useState([])
    const [repliesCount, setRepliesCount] = useState(comment.count_replies)
    const [replyOpen, setReplyOpen] = useState(false)
    const [replyFormOpen, setReplyFormOpen] = useState(false)
    const [commentLike, setCommentLike] = useState(comment.isUserLiked)
    const [commentLikeCt, setCommentLikeCt] = useState(comment.likeCount)
    const [content, setContent] = useState('')
    const [editComment, setEditComment] = useState(false)
    const [editCmtContent, setEditCmtContent] = useState(comment.content)
    const userLogin = useSelector(state=>state.userLogin)
    // const userPic = useSelector(state=>state.userPicture)
    // const {userPicture} = userPic
    // const proPicSrc = userPicture?.pro_pic
    
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const proPicSrc = userInfo?.pro_pic
    const commentId = comment?.id


    const handleCmtUpdate = async(e) => {
        e.preventDefault()
        const data = {'commentId':comment.id,'content':editCmtContent}
        const url = '/posts/comment/'
        try {
            const response = await axiosInstance.patch(url, data)
            
            if(response.status===200) {
                setEditComment(false)
                setComments(response.data.data)
                toast.success(response.data.message)
            } else{
                toast.error(response.data.messgae)
            }
        } catch(error) {
            console.log(error)
            toast.error('error occured during updation')
        }
    } 
    const handlelike = async() => {
        try {
            const response = await axiosInstance.post('/posts/like-comment/', {'commentId':commentId})
            setCommentLikeCt(response.data.likeCount)
            setCommentLike(response.data.commentLike)
        } catch(error) {
            console.log("Error occured during liking the comment : ", error)
        }
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance({
            method:'post',
            url:'/posts/comment/',
            data:{
                commentId:commentId,
                content:content
            },
        }).then((response) => {
            console.log('res : ', response.data.length)
            setReplies(response.data)
            setRepliesCount(response.data.length)
            setReplyFormOpen(false)
            setReplyOpen(true)
            setContent('')
        })

    }


    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios({
    //         method:'post',
    //         url:'/posts/comment/',
    //         data:{
    //             commentId:commentId,
    //             userId:userId,
    //             content:content
    //         },
    //         headers:{
    //             Authorization:`Bearer ${userInfo?.token}`
    //         }
    //     }).then((response) => {
    //         console.log('res : ', response.data.length)
    //         setReplies(response.data)
    //         setRepliesCount(response.data.length)
    //         setReplyFormOpen(false)
    //         setReplyOpen(true)
    //         setContent('')
    //     })

    // }

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
                    {!editComment ? <>
                                    <div className='info-dt'>
                                        <div className='info-user'>
                                            <span>{comment.user.name}</span>
                                            <span className='comment-time'>{comment.time}</span>
                                        </div> 
                                        <MoreInfo info={comment} userId={userId} title='Comment' setUpdateData={setComments} setUpdateDataCount={setCommentCount} setEdit={setEditComment}/>
                                    </div>
                                    <p>{comment.content}</p>
                                    <div className='sub'>
                                        <p onClick={handlelike}>
                                            {commentLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                            <LikeComponent likeCount={commentLikeCt} />
                                        </p>
                                        <p onClick={()=>setReplyFormOpen(!replyFormOpen)}>Reply</p>
                                    </div>

                                    {replyFormOpen && (
                                        <form onSubmit={handleSubmit}>
                                            <div className='reply-send'>
                                                <img src={proPicSrc} alt="" />
                                                <input type='text' placeholder='write your reply' required value={content} onChange={(e)=>setContent(e.target.value)}/>
                                                <button type='submit' style={{cursor:"pointer"}}>Reply</button>
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
                                    </>
                                 :(
                                    <div className='edit-comment'>
                                        <form onSubmit={handleCmtUpdate}>
                                            <div className='reply-send'>
                                
                                                <input type='text' placeholder='write your comment' required value={editCmtContent} onChange={(e)=>setEditCmtContent(e.target.value)}/>
                                                <button type='submit'style={{cursor:"pointer"}}>Update</button>
                                                <span onClick={()=> setEditComment(false)}>Cancel</span>
                                            </div>              
                                        </form>
                                    </div>
                                 )
                    }
                    
                </div>
                
            </div>
            {replyOpen && <Replies commentId={commentId} replies={replies} setReplies={setReplies} setRepliesCount={setRepliesCount}/>}
        </div>
    )
}

export default Comment