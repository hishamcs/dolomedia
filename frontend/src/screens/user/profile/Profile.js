import './profile.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axios';
import PictureChange from '../../../components/PictureChange';
import Posts from '../../../components/posts/Posts';
import ShowDeatils from '../../../components/showdetails/ShowDetail';
import toast from 'react-hot-toast';







const Profile = () => {

    const userLogin = useSelector(state=>state.userLogin)
    const [pictureChange, setPictureChange] = useState(false)
    const [change, setChange] = useState()
    const [proPicSrc,setProPicSrc] = useState()
    const [coverPicSrc, setCoverPicSrc] = useState()
    const [loading, setLoading] = useState(true)
    const [followersCount, setFollowersCount] = useState()
    const [followingCount, setFollowingCount] = useState()
    const [lists, setListss] = useState([])
    const [listInfo, setListInfo] = useState('')
    const [detail, setDetail] = useState(false)
    const [userPosts, setUserPosts] = useState()
    const {userInfo} = userLogin
    const userId = userInfo?.id
    const [name, setName] = useState()
    const {id} = useParams()
    const [updatePosts, setUpdatePosts] = useState(false)
    const [postsCount, setPostsCount] = useState(0)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [isFollowing, setIsFollowing] = useState()

    const changePic = (e) => {
        setChange(e.currentTarget.getAttribute('title'))
        setPictureChange(true)
    }
    const followingList = () => {
        axiosInstance.post('/posts/profile/following-list/').then((response) => {
            setListInfo('Following List')
            setListss(response.data)
        })
        setDetail(true)
    }

    const followersList = async () => {
        await axiosInstance.post('/posts/profile/follower-list/', {userId:id, info:2}).then(response=> {
            console.log('res : ', response.data)
            setListInfo('Followers List')
            setListss(response.data)
        })
        setDetail(true)
    }

    const handleFollowing = async() => {
        try {
            const response = await axiosInstance.post(`/posts/follow-user/${id}/`)
            setIsFollowing(response.data.is_following)
            
        }catch(error) {
            console.log('error occured while following...')
        }
    }

    useEffect(()=>{
        setLoading(true)
        axiosInstance.get(`/posts/profile/${id}`).then((response)=>{
            console.log('posts count : ',response.data)
            setCoverPicSrc(response.data.user.cover_pic)
            setProPicSrc(response.data.user.pro_pic)
            setName(response.data.user.name)
            setIsFollowing(response.data.user.is_following)
            setPostsCount(response.data.posts.length)
            setFollowersCount(response.data.followersCount)
            setFollowingCount(response.data.followingCount)
            setUserPosts(response.data.posts)
            setLoading(false)
        })
    }, [id, isFollowing])

    console.log('id : ', id)
    return(
        <div className='profile'>
            <div className='images'>
                {userId==id && (
                                    <div className='cover-edit-icon' title='Change Cover picture' onClick={changePic}>
                                        <EditSharpIcon />
                                    </div>
                                )
                }
                <img 
                    src={coverPicSrc}
                    alt=''
                    className='coverPic'
                />
                
                <div className='profilePic-container'>
                    <img 
                        src={proPicSrc}
                        alt=''
                        className='profilePic'
                    />
                    {userId==id && (
                                        <div className='proPic-edit-icon' onClick={changePic} title='change profile picture'>
                                            <EditSharpIcon />
                                        </div>
                                    )
                    }
                    
                </div>
                
            </div>

            <div className='profileContainer'>
                <div className='user-info'>
                    <div className='center'>
                        <span>{name}</span>
                        {/* {userId == id && <button onClick={()=>setOpenUpdate(!openUpdate)}>Update Profile</button>}
                        {isFollowing ? <button style={{backgroundColor:"red"}} onClick={handleFollowing}>Unfollow</button>:<button onClick={handleFollowing}>Follow</button>} */}

                        {userId == id ? <button onClick={()=>setOpenUpdate(!openUpdate)}>Update Profile</button>
                                      : isFollowing ? <button style={{backgroundColor:"red"}} onClick={handleFollowing}>Unfollow</button>
                                                    : <button onClick={handleFollowing}>Follow</button>
                        }

                        <div className='infos'>
                            <div className='postCount'>
                                <span>{postsCount}</span>
                                <span style={{fontSize:"small", fontWeight:"300"}}>Posts</span>
                            </div>

                            <div className='follower'>
                                <span>{followersCount} {userId==id && (<VisibilityIcon onClick={followersList}/>)}</span>
                                <span style={{fontSize:"small", fontWeight:"300"}}>Followers</span>
                            </div>

                            <div className='following'>
                                <span>{followingCount} {userId == id && (<VisibilityIcon onClick={followingList}/>)}</span>
                                <span style={{fontSize:"small", fontWeight:"300"}}>Following</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Posts posts={userPosts} setPosts={setUserPosts} updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
                {detail && <ShowDeatils detail={detail} setDetail={setDetail} lists={lists} listInfo={listInfo}/>}
            </div>
            {pictureChange && <PictureChange open={pictureChange} setOpenChange={setPictureChange} change={change} setProPicSrc={setProPicSrc} setCoverPicSrc={setCoverPicSrc}/>}
            {/* {updateProfile} */}
        </div>
    )
}

export default Profile
