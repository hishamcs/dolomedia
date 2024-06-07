import React, { useEffect, useState } from 'react'
import './posts.scss'
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../axios';


function Posts({updatePosts, setUpdatePosts, userPosts}) {
    const userLogin = useSelector(state=>state.userLogin)
    const navigate = useNavigate()
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const [posts, setPosts] = useState()


    useEffect(() => {

      if (!userInfo){
          navigate('/')
      } else {
      
      if(userPosts){
          setPosts(userPosts)
      }   else {
    const fetchPosts = async() => {
      const token = userInfo?.token
      const config = {
        params:{userId},
        headers:{
          'Content-type':'application/json',
          Authorization:`Bearer ${token}`
        }
      }
      try {
        const response = await axiosInstance.get(`/posts/fetch-posts/`,{params:{userId}})
        
        setPosts(response.data.results)
      } catch(error) {
        console.log('error : ', error)
      }
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
        <Post post={post} key={post.id} setPosts={setPosts} setUpdatePosts={setUpdatePosts}/>
      ))}
    </div>
  )
}

export default Posts