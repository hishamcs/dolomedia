import React, { useEffect, useState } from 'react'
import './rightBar.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios'

function RightBar() {

  const userLogin = useSelector(state=> state.userLogin)
  const navigate = useNavigate()
  const {userInfo} = userLogin
  const userId = userInfo?.id
  const [userList, setUserList] = useState(null)

  const followUserHandler = async(fuser_id) => {

    const config = {
      headers: {
          'Content-type': 'application/json'
      }
  }
    const response = await axios.post(`/posts/follow-user/${userId}/${fuser_id}`,config)
    setUserList(response.data)
  }

  useEffect(() =>{
    if(!userInfo) {
      navigate('/')
    } else {
    const fetchData = async() => {
      // const config = {
      //   headers:{
      //       'Content-type':'application/json',
      //   }
      // }
      const response = await axiosInstance.get(`/posts/usersuggestion/${userId}`)
      setUserList(response.data)
    }

    fetchData()
  }
  },[navigate, userId, userInfo,setUserList])
  return (
    <div className='rightbar'>
      <div className='container'>
      
        
          <div className='item'>
          <span>Suggestions For You</span>
          {userList?.map((user)=> (
          <div className='user' key={user.id}>
            <Link to={`/home/profile/${user.id}`}>
            <div className='userinfo'>
              <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user'/>
              <span>{user.name}</span>
            </div>
            </Link>
            <div className='buttons'>
              <button onClick={()=>followUserHandler(user.id)}>Follow</button>
              {/* <button>Dismiss</button> */}
            </div>
          </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default RightBar