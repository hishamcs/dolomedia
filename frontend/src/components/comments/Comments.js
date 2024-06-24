import {useState, useEffect} from 'react'
import "./comments.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
// import Replies from '../replies/Replies';
import Comment from '../comment/Comment';
import axiosInstance from '../../axios';


const Comments = ({postId, setCommentCount}) => {
  // console.log('post')
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
  const userLogin = useSelector(state=>state.userLogin)
  // const userPics = useSelector(state=>state.userPicture)
  // const {userPicture} = userPics
  const {userInfo} = userLogin
  // const userId = userInfo?.id

  // const proPicSrc = userPicture?.pro_pic
  const proPicSrc = userInfo?.pro_pic
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const response = await axiosInstance.post('/posts/comment/',{'content':content,'postId':postId})
    setCommentCount(response.data.length)
    setComments(response.data)
    setContent('')
  }

  useEffect(()=> {
    const config = {
      params: {'postId':postId},
    }
    axiosInstance.get('/posts/comment/', config).then((response)=> {
      console.log('res : ', response.data)
      setComments(response.data)
    })
  }, [postId])
  

  return(
    <div className='comments'>
      <form onSubmit={handleSubmit}>
        <div className='write'>
          <img src={proPicSrc} alt="" />
          <input type="text" placeholder="write a comment" value={content} onChange={(e)=>setContent(e.target.value)} required/>
          <button type='submit'>Send</button>
        </div>
      </form>
      <div className='comment' >
        {comments.map((comment) => (
        
          <Comment comment={comment} key={comment.id} setComments={setComments} setCommentCount={setCommentCount}/>
        
        ))}
      </div>
    </div>
  )
};

export default Comments;






























// import {useState, useEffect} from 'react'
// import "./comments.scss";
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// // import Replies from '../replies/Replies';
// import Comment from '../comment/Comment';


// const Comments = ({postId, setCommentCount}) => {
//   // console.log('post')
//   const [content, setContent] = useState('')
//   const [comments, setComments] = useState([])
//   const userLogin = useSelector(state=>state.userLogin)
//   const userPics = useSelector(state=>state.userPicture)
//   const {userPicture} = userPics
//   const {userInfo} = userLogin
//   const userId = userInfo?.id

//   const proPicSrc = userPicture?.pro_pic
//   const handleSubmit = async(e) =>{
//     e.preventDefault()
//     const config = {
//       headers:{
//         'Content-type':'application/json',
//         Authorization: `Bearer ${userInfo?.token}`
//       }
//     }
//     const response = await axios.post('/posts/comment/',{'content':content, 'userId':userId, 'postId':postId},config)
//     setCommentCount(response.data.length)
//     setComments(response.data)
//     setContent('')
//   }

//   useEffect(()=> {
//     const config = {
//       params: {'userId':userId, 'postId':postId},
//       headers:{
//         'Content-type':'application/json',
//         Authorization:`Bearer ${userInfo?.token}`
//       }
//     }
//     axios.get('/posts/comment/', config).then((response)=> {
//       console.log('res : ', response.data)
//       setComments(response.data)
//     })
//   }, [postId, userId])
  

//   return(
//     <div className='comments'>
//       <form onSubmit={handleSubmit}>
//         <div className='write'>
//           <img src={proPicSrc} alt="" />
//           <input type="text" placeholder="write a comment" value={content} onChange={(e)=>setContent(e.target.value)} required/>
//           <button type='submit'>Send</button>
//         </div>
//       </form>
//       <div className='comment' >
//         {comments.map((comment) => (
        
//           <Comment comment={comment} key={comment.id} setComments={setComments} setCommentCount={setCommentCount}/>
        
//         ))}
//       </div>
//     </div>
//   )
// };

// export default Comments;