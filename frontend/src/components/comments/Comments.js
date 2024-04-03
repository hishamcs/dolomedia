import {useState, useEffect} from 'react'
import "./comments.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
// import Replies from '../replies/Replies';
import Comment from '../comment/Comment';


const Comments = ({postId}) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const userId = userInfo?.id
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const config = {
      headers:{
        'Content-type':'application/json'
      }
    }
    const response = await axios.post('/posts/comment/',{'content':content, 'userId':userId, 'postId':postId},config)
    console.log(response)
    setComments(response.data)
    setContent('')
  }

  useEffect(()=> {
    const config = {
      headers:{
        'Content-type':'application/json'
      }
    }
    axios.get('/posts/comment/',{params:{'userId':userId, 'postId':postId}}, config).then((response)=> {
      setComments(response.data)
    })
  }, [postId, userId])
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];

  // return (
  //   <div className="comments">
  //     <form onSubmit={handleSubmit}>
  //       <div className="write">
  //         <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="" />
        
  //         <input type="text" placeholder="write a comment" value={content} onChange={(e)=>setContent(e.target.value)} required/>
  //         <button type='submit'>Send</button>
        
  //       </div>
  //     </form>
      
  //     {comments.map((comment) => (
  //       <div className="comment" key={comment.id}>
  //         {/* <img src={comment.profilePicture} alt="" /> */}
  //         <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
  //         <div className="info">
  //           <span>{comment.user.name}</span>
  //           <p>{comment.content}</p>
  //           <div className="sub">
  //           <p>Like</p>
  //           <p>Reply</p>
  //           </div>
  //         </div>
  //         <span className="date">1 hour ago</span>
  //       </div>
  //     ))}
  //   </div>
  // );


  return(
    <div className='comments'>
      <form onSubmit={handleSubmit}>
        <div className='write'>
          <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="" />
          <input type="text" placeholder="write a comment" value={content} onChange={(e)=>setContent(e.target.value)} required/>
          <button type='submit'>Send</button>
        </div>
      </form>
      <div className='comment' >
        {comments.map((comment) => (
        
          <Comment comment={comment} key={comment.id}/>
        
        ))}
      </div>
    </div>
  )
};

export default Comments;