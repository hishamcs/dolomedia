import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './navBar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../acitons/userActions';
import { useState } from 'react';
import axios from 'axios';
import ShowDeatils from '../showdetails/ShowDetail';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notification from '../notification/Notification';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';



function NavBar() {
  const [notiCount, setNotiCount] = useState()
  const [notifications, setNotifications] = useState(false)
  const [notificaitonList, setNotificationList] = useState([])
  const userLogin = useSelector(state=>state.userLogin)
  const [userLists, setUserLists] = useState([])
  const [detail, setDetail] = useState(false)
  const {userInfo} = userLogin
  const userId = userInfo?.id
  const dispatch = useDispatch()
  const [searchContent, setSearchContent] = useState('')
  const handleSearch = () => {
    if(searchContent!==''){
      setDetail(true)
    axios.get('/api/user-search/', {params:{user:searchContent, userId:userId}}).then(response=> {
      console.log(response.data)
      setUserLists(response.data)
    })
  }
  }
  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/notification/${userId}/`)

    socket.onopen = function(e) {
      console.log('connection established..')
    }

    socket.onmessage = function(e) {
      const data = JSON.parse(e.data)
      setNotiCount(data.message)
    }

    socket.onclose = function(e) {
      console.log('e :', e)
    }
  }, [userId])

  const handleFetchNotifications = () => {
    console.log('notifications')
    axios.get('/posts/notifications/', {params:{userId:userId}}).then(response => {
      console.log(response.data.notifications)
      setNotificationList(response.data.notifications)
      setNotifications(!notifications)
    })
  }

  
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div className='navbarr'>
        <div className='left'>
            <Link to='/' style={{textDecoration:'none'}}>
                <span>Dolophonoz</span>
            </Link>
            {/* <HomeOutlinedIcon /> */}
             
            {/* <DarkModeOutlinedIcon /> */}
            
            {/* <GridViewOutlinedIcon /> */}
            <div className='search'>
                <SearchOutlinedIcon onClick={handleSearch}/>
                <input placeholder='Search' value={searchContent} onChange={(e)=>setSearchContent(e.target.value)}/>
            </div>
        </div>

        <div className='right'>
            <MessageOutlinedIcon />
            <div className='notification'  onClick={handleFetchNotifications}>
              
              <NotificationsNoneOutlinedIcon/>
              <div className='noti-count'>{notiCount}</div>
            </div>
            
            {/* <NotificationsIcon /> */}
            <div className='user'>
                <Link to={`/home/profile/${userId}`} style={{textDecoration:'none'}}>
                <div className='userDet'>
                  <img alt='userimage'src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600'/>
                  <span>{userInfo?.name}</span>
                </div>
                </Link>
                <LogoutOutlinedIcon onClick={logoutHandler}/>
            </div>
        </div>
        {detail && <ShowDeatils detail={detail} setDetail={setDetail} lists={userLists} listInfo='SearchResult'/>}
        {notifications && <Notification notifications={notifications} setNotifications={setNotifications} notificationList={notificaitonList}/>}
    </div>
  )
}

export default NavBar