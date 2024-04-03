import './profile.scss'
import Posts from '../components/posts/Posts'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowDeatils from '../components/showdetails/ShowDetail'


const Profile = () => {

    const userLogin = useSelector(state=>state.userLogin)
    const [loading, setLoading] = useState(true)
    const [followersCount, setFollowersCount] = useState()
    const [followingCount, setFollowingCount] = useState()
    const [lists, setLists] = useState([])
    const [listInfo, setListInfo] = useState('')
    const [detail, setDetail] = useState(false)
    const [userPosts, setUserPosts] = useState()
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const [name, setName] = useState()
    const {id} = useParams()


    const followingList = () => {
        axios.post('/posts/profile/following-list/', {userId:id}).then((response) => {
            setListInfo('Following List')
            setLists(response.data)
        })
        setDetail(true)
    }

    const followersList = async () => {
        await axios.post('/posts/profile/follower-list/', {userId:id, info:2}).then(response=> {
            // console.log('res : ', response.data)
            setListInfo('Followers List')
            setLists(response.data)
        })
        setDetail(true)
    }

    useEffect(()=>{
        setLoading(true)
        axios.get(`/posts/profile/${id}`).then((response)=>{
            setName(response.data.user.name)
            setFollowersCount(response.data.followersCount)
            setFollowingCount(response.data.followingCount)
            setUserPosts(response.data.posts)
            setLoading(false)
        })
    }, [id])
    
    return(
        <div className='profile'>
            <div className='images'>
                <img
                src='https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt=''
                className='cover' 
                />
                <img 
                src='https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
                alt=''
                className='profilePic'
                />
            </div>
            <div className='profileContainer'>
                <div className='uInfo'>
                    <div className='left'>

                    </div>
                    <div className='center'>
                        <span>{name}</span>
                        <div className='info'>
                            {/* <div className='item'>
                                <PlaceIcon />
                                <span>USA</span>
                            </div>
                            <div className='item'>
                                <LanguageIcon />
                                <span>lama.dev</span>
                            </div> */}
                        </div>
                        <div className='d-flex flex-row gap-5'>
                            <div className='d-flex flex-column align-items-center'>
                                <h5>Following</h5>
                                <h3>{followingCount}</h3>
                                {/* <VisibilityIcon color='primary' onClick={()=>setDetail(true)} role='button' className='py-1'/> */}
                                <VisibilityIcon color='primary' onClick={()=>followingList()} role='button' className='py-1'/>
                            </div>
                            {/* {userId!=id && <button>follow</button>} */}
                            <div className='d-flex flex-column align-items-center'>
                                <h5>Followers</h5>
                                <h3>{followersCount}</h3>
                                <VisibilityIcon color='primary' onClick={()=>followersList()} role='button' className='py-1'/> 
                            </div>
                        </div>
                        
                    </div>
                    <div className='right'>
                        {/* <EmailOutlinedIcon />
                        <MoreVertIcon /> */}
                    </div>
                </div>
                {loading ? (<p>loadinggg</p>):(<Posts userPosts={userPosts} />)}
                {detail && <ShowDeatils detail={detail} setDetail={setDetail} lists={lists} listInfo={listInfo}/>}
            </div>
        </div>
    )
}

export default Profile