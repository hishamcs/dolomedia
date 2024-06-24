import { useState } from 'react'
import { useSelector } from 'react-redux'
import './reply.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreInfo from '../moreInfo/MoreInfo';
import toast from 'react-hot-toast';
import axiosInstance from '../../axios';




const Reply = ({reply,refreshReply, setRefreshReply, setReplies, setRepliesCount}) => {
    const [replyLike, setReplyLike] = useState(reply.isUserLiked)
    const [replyLikeCt, setReplyLikeCt] = useState(reply.likeCount)
    const [editReply, setEditReply] = useState(false)
    const [editReplyContent, setEditReplyContent] = useState(reply.content)
    const userLogin = useSelector(state=>state.userLogin)
    const [mesg, setMesg] = useState('')
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const [replyForm, setReplyForm] = useState(false)

    const handleSubmit = (e) => {
        const data = {content:mesg, commentId:reply.parent, replyId:reply.id}
        e.preventDefault()
        axiosInstance.post('/posts/comment/',data).then((response) => {
            // console.log(response.data)
            setRepliesCount(response.data.length)
            setRefreshReply(!refreshReply)
            setMesg('')
            setReplyForm(false)
        })

    }

    const handleReplyLike = async() => {
        try {
            const response = await axiosInstance.post('/posts/like-comment/', {'commentId':reply.id})
            setReplyLikeCt(response.data.likeCount)
            setReplyLike(response.data.commentLike)
        } catch(error) {
            console.log('error occured during liking the reply : ', error)
        }
        
    }

    const handleEditReply = async(e) => {
        e.preventDefault()
        const data = {'content':editReplyContent,'commentId':reply.id}
        try {
            const response = await axiosInstance.patch('/posts/comment/', data)
            
            if (response.status===200) {
                setEditReply(false)
                setReplies(response.data.data)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.error)
            }
        } catch(error) {
            console.log('error : ', error)
            toast.error('error occured during updation')
        }
        
        
    }

    return(
        <div className='reply-container'>
    
            <div className='ii'>
                <img src={reply.user.pro_pic} alt="pro-pic"/>
            </div>
            <div className='reply-info'>
                {!editReply ? (<>
                                <div className='reply-info-tot d-flex justify-content-between'>
                                    <div>
                                        <span>{reply.user.name}</span> 
                                        <span className='reply-time'>{reply.time}</span>
                                    </div>
                                    <MoreInfo info={reply} userId={userId} title='Reply' setUpdateData={setReplies} setUpdateDataCount={setRepliesCount} setEdit={setEditReply}/>
                                </div>

                                <div className='reply-content'>
                                    <p>{reply.content}</p>
                                </div>
                                <div className='reply-action'>
                    
                                    <p onClick={handleReplyLike} className='d-flex align-items-center justify-content-between' style={{cursor:'pointer'}}>
                                        {replyLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                        {replyLikeCt>0 && replyLikeCt}
                                    </p>
                                    <p style={{cursor:'pointer'}} onClick={()=>{
                                        setReplyForm(!replyForm)
                                        if(reply.user.id !== userId) {
                                        setMesg('@' + reply.user.name+' ')
                                        }
                                        
                                    }}>Reply</p>
                                </div>

                                {replyForm && (<div className='reply-form'>
                                                    <form onSubmit={handleSubmit}>
                                                        <input placeholder='Enter your reply...' value={mesg} onChange={(e)=>setMesg(e.target.value)} required/>
                                                        <button type='submit' style={{cursor:"pointer"}}>Reply</button>
                                                    </form>
                                                </div>
                                                )
                                }

                            </>)
                            :(
                                <div className='edit-reply'>
                                    <form onSubmit={handleEditReply}>
                                        <input placeholder='Enter your reply...' value={editReplyContent} required onChange={(e)=>setEditReplyContent(e.target.value)}/>
                                        <button type='submit' style={{cursor:"pointer"}}>Update</button>
                                        <button onClick={()=>setEditReply(false)}>Cancel</button>
                                    </form>
                                </div>
                            )                           
                
                }
                
            </div>
            
        </div>
    )
}

export default Reply