import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreInfo from '../moreInfo/MoreInfo';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeComponent from '../like/LikeComponent';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import toast, { Toaster } from 'react-hot-toast';

const Post = ({post}) => {
    // console.log('post : ',post)
    const userLogin = useSelector(state=>state.userLogin)
    const [postLike, setPostLike] = useState()
    const [likeCount, setLikeCount] = useState()
    const [commentCount, setCommentCount] = useState()
    const [commentOpen, setCommentOpen] = useState(false)
    // const [dropDown, setDropDown] = useState(false)
    const {userInfo} = userLogin
    const userId = userInfo?.id
    
    const handleReport = (postId) => {
        console.log('post id : ', postId)
        axios.patch('/posts/post-report/',{postId:postId}).then(response=> {
            console.log(response.data.message)
            toast('Report is submitted...')
        })
    }
    const likePostHandler = () => {
        axios.get(`/posts/like-post/${userId}/${post.id}`).then(function (response) {
            const post_action = response.data.postliked
            setPostLike(post_action)
            setLikeCount(response.data.likeCount)
        })
        
    }

    useEffect(()=> {
        axios({
            method:'post',
            url:`/posts/like-post/`,
            data:{
                user_id:userId,
                post_id:post.id
            }
        }).then(function(response) {
            setPostLike(response.data.isLikePost)
            setLikeCount(response.data.likeCount)
            setCommentCount(response.data.commentCount)
        })
    }, [post.id,userId])
    

    return(
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={post.user.pro_pic} alt=''/>
                        <div className='details'>
                            <Link to={`/home/profile/${post.user.id}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span className='name'>{post.user.name}</span>
                            
                            </Link>
                            <span className='date'>{post.post_time}</span>
                        </div>
                    </div>
                    <div>
                    <MoreInfo info={post} userId={userId}/>
                        {/* <DropdownButton size='sm' variant='none'>
                            <Dropdown.Item onClick={()=>handleReport(post.id)}>Report</Dropdown.Item>
                            
                        </DropdownButton>   */}
                        
                    </div>
                </div>

                <div className='content'>
                    <p>{post.content}</p>
                    <img src={post.image} alt=''/>
                </div>

                <div className='info'>
                    <div className='item' onClick={()=>likePostHandler()}>
                        {postLike ? <FavoriteOutlinedIcon />: <FavoriteBorderOutlinedIcon />}
                        {/* {likeCount} likes                  */}
                        <LikeComponent likeCount={likeCount}/>
                    </div>

                    <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                         {commentCount} Comments
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
                <Toaster />
            </div>
        </div>
    )
}

export default Post