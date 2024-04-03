import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './reply.scss'
import LikeComponent from '../like/LikeComponent'




const Reply = ({reply,refreshReply, setRefreshReply}) => {

    const [replyLikeCt, setReplyLikeCt] = useState(reply.likeCount)
    const userLogin = useSelector(state=>state.userLogin)
    const [mesg, setMesg] = useState('')
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const [replyForm, setReplyForm] = useState(false)

    const handleSubmit = (e) => {
        // console.log(reply)
        e.preventDefault()
        axios.post('/posts/comment/', {content:mesg, userId:userId, commentId:reply.parent, replyId:reply.id}).then((response) => {
            console.log(response.data)
            setRefreshReply(!refreshReply)
            setMesg('')
            setReplyForm(false)
        })

    }

    const handleReplyLike = async() => {
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const response = await axios.post('/posts/like-comment/', {'commentId':reply.id, 'userId':userId},config)
        setReplyLikeCt(response.data.likeCount)
    }

    return(
        <div className='reply-container'>
    
            <div className='ii'>
                {/* <img src={reply.profilePicture} alt="pro-pic"/> */}
                <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="pro-pic"/>
            </div>
            <div className='reply-info'>
                <span>{reply.user.name}</span> 
                <span className='reply-time'>1 hour ago</span>
                <div className='reply-content'>
                    <p>{reply.content}</p>
                </div>
                <div className='reply-action'>
                    {/* <p onClick={handleReplyLike}>Like</p> */}
                    <p onClick={handleReplyLike}><LikeComponent likeCount={replyLikeCt}/></p>
                    <p onClick={()=>{
                        setReplyForm(!replyForm)
                        if(reply.user.id !== userId) {
                        setMesg('@' + reply.user.name)
                        }
                        
                    }}>Reply</p>
                </div>
                
                {replyForm && (<div className='reply-form'>
                                <form onSubmit={handleSubmit}>
                                    <input placeholder='Enter your reply...' value={mesg} onChange={(e)=>setMesg(e.target.value)} required/>
                                    <button type='submit'>Reply</button>
                                </form>
                            </div>
                        )
                }
            </div>
            
        </div>
    )
}

export default Reply