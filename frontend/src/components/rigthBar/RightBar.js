import React, { useEffect, useState } from 'react'
import './rightBar.scss'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios'
import toast from "react-hot-toast";

function RightBar() {

  const userLogin = useSelector(state=> state.userLogin)
  const navigate = useNavigate()
  const {userInfo} = userLogin
  const userId = userInfo?.id
  const [userList, setUserList] = useState(null)

  const followUserHandler = async(fuser) => {
    try {
      const response = await axiosInstance.post(`/posts/follow-user/${fuser.id}/`, {'info':'suggestion'})
      setUserList(response.data)
      console.log('response : ', response)
      if(response.status === 200) {
        toast.success(`You are started to follow ${fuser.name}`)
      }
    } catch(error) {
      console.log('error : ',error)
    }
    
  }

  useEffect(() =>{
    if(!userInfo) {
      navigate('/')
    } else {
    const fetchData = async() => {
      try {
        const response = await axiosInstance.get(`/posts/usersuggestion/${userId}`)
        setUserList(response.data)
      } catch(error) {
        console.log('erorr : ',error)
      }
      
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
            <Link to={`/home/profile/${user.id}`} style={{textDecoration:"none"}}>
            <div className='userinfo'>
              <img src={user.pro_pic} alt=''/>
              <span>{user.name}</span>
            </div>
            </Link>
            <div className='buttons'>
              <button onClick={()=>followUserHandler(user)}>Follow</button>
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