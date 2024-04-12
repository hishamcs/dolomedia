import './profile.scss'
import Posts from '../components/posts/Posts'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowDeatils from '../components/showdetails/ShowDetail'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import PictureChange from '../components/PictureChange';
import { Toaster } from 'react-hot-toast';


const Profile = () => {

    const userLogin = useSelector(state=>state.userLogin)
    const userPicture = useSelector(state=>state.userPicture)
    const userPic = userPicture.userPicture
    const [pictureChange, setPictureChange] = useState(false)
    const [change, setChange] = useState()
    const [proPicSrc,setProPicSrc] = useState()
    const [coverPicSrc, setCoverPicSrc] = useState()
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

    const changePic = (e) => {
        setChange(e.currentTarget.getAttribute('title'))
        setPictureChange(true)
    }
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
            // console.log(response.data)
            setCoverPicSrc(response.data.user.cover_pic)
            setProPicSrc(response.data.user.pro_pic)
            setName(response.data.user.name)
            setFollowersCount(response.data.followersCount)
            setFollowingCount(response.data.followingCount)
            setUserPosts(response.data.posts)
            setLoading(false)
        })
    }, [id,userPic])
    
    return(
        <div className='profile'>
            <div className='images'>
                {userId==id && (<div className='cover-edit-icon position-absolute' title='Change Cover picture' onClick={changePic}>
                                    <EditSharpIcon />
                                </div>)
                }
                <img
                    src={coverPicSrc}
                    alt=''
                    className='cover' 
                />
                <div className='pro-pic-container'>
                    <div className='pro-cont d-flex justify-content-center'>
                        <img 
                        src={proPicSrc}
                        alt=''
                        className='profilePic'
                        />
                        {userId==id && (<div className='edit-icon position-absolute' title='change profile picture' onClick={changePic}>
                            <EditSharpIcon className='p-1'/>
                        </div>)}
                    </div>
                </div>
            </div>
            <Toaster/>
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
                    <SettingsSharpIcon/>
                    </div>
                </div>
                {loading ? (<p>loadinggg</p>):(<Posts userPosts={userPosts} />)}
                {detail && <ShowDeatils detail={detail} setDetail={setDetail} lists={lists} listInfo={listInfo}/>}
            </div>
            {pictureChange && <PictureChange open={pictureChange} setOpenChange={setPictureChange} change={change} setProPicSrc={setProPicSrc} setCoverPicSrc={setCoverPicSrc}/>}

        </div>
    )
}

export default Profile