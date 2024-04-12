import React, { useEffect, useState } from 'react'
import './posts.scss'
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Posts({updatePosts, setUpdatePosts, userPosts}) {
  const userLogin = useSelector(state=>state.userLogin)
  const navigate = useNavigate()
  const {userInfo} = userLogin
  const userId = userInfo?.id
  const [posts, setPosts] = useState()
  useEffect(() => {

    if (!userInfo){
      navigate('/')
    }else{
      
      if(userPosts){
        setPosts(userPosts)
      } else {
    const fetchPosts = async() => {
      const config = {
        headers:{
          'Content-type':'application/json'
        }
      }

      const response = await axios?.get(`/posts/addposts/${userId}`, config)
      console.log('posts : ', response.data)
      setPosts(response.data)
      
    }
    if(updatePosts) {
      console.log('new post')
      fetchPosts()
      setUpdatePosts(false)
    }

    fetchPosts()

  }  
  }
  },[userPosts,updatePosts,userInfo,userId,navigate,setUpdatePosts])
  
  return (
    <div className='posts'>
      {posts?.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts