import './replies.scss'
import Reply from '../reply/Reply'
import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'




const Replies = ({commentId}) => {
    const userLogin = useSelector(state=>state.userLogin)
    const [refreshReply, setRefreshReply] = useState(false)
    const [replies, setReplies] = useState([])
    const [content, setContent] = useState('')
    const {userInfo} = userLogin 
    const userId = userInfo?.id
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('comment id : ', commentId)
        // console.log('user id : ', userId)
        // console.log('content : ', content)
        axios({
            method:'post',
            url:'/posts/comment/',
            data:{
                commentId:commentId,
                userId:userId,
                content:content
            }
        }).then((response) => {
            console.log(response.data)
            setReplies(response.data)
            setContent('')
        })
    }
    
    
    useEffect(() => {
        axios.get('/posts/comment/', {params: {commentId:commentId}}).then((response) => {
            // console.log(response.data)
            setReplies(response.data)
        })
    }, [commentId, refreshReply])
    
    
    // const replies = [
        // {
        //     id: 1,
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        //     name: "John Doe",
        //     userId: 1,
        //     profilePicture:
        //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        // },
        // {
        //     id: 2,
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        //     name: "Jane Doe",
        //     userId: 2,
        //     profilePicture:
        //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // },
        // {
        //     id: 3,
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        //     name: "Thomas",
        //     userId: 3,
        //     profilePicture:
        //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // },
        // {
        //     id: 4,
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        //     name: "John Doe",
        //     userId: 1,
        //     profilePicture:
        //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        // },
    // ]
    return (
        <div className='replies'>
            <form onSubmit={handleSubmit}>
                <div className='reply-send'>
                    <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="" />
                    <input type='text' placeholder='write your reply' required value={content} onChange={(e)=>setContent(e.target.value)}/>
                    <button type='submit' className=''>Reply</button>
                </div>
            </form>
            <div className='reply'>
                {replies?.map(reply=> (
                    <Reply reply={reply} key={reply.id} setRefreshReply={setRefreshReply} refreshReply={refreshReply}/>
                ))}
            </div>
            
        </div>
    )
}

export default Replies