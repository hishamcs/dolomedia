import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreInfo from '../moreInfo/MoreInfo';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LikeComponent from '../like/LikeComponent';
import Share from '../share/Share';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';

const Post = ({post, setPosts, setUpdatePosts}) => {
    const userLogin = useSelector(state=>state.userLogin)
    const [postLike, setPostLike] = useState()
    const [likeCount, setLikeCount] = useState()
    const [commentCount, setCommentCount] = useState(post.comment_count)
    const [commentOpen, setCommentOpen] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const {userInfo} = userLogin
    const userId = userInfo?.id
    
    // const handleReport = (postId) => {
    //     console.log('post id : ', postId)
    //     axios.patch('/posts/post-report/',{postId:postId}).then(response=> {
    //         console.log(response.data.message)
    //         toast('Report is submitted...')
    //     })
    // }
    // const likePostHandler = () => {
    //     axiosInstance.get(`/posts/like-post/${userId}/${post.id}`).then(function (response) {
    //         const post_action = response.data.postliked
    //         setPostLike(post_action)
    //         setLikeCount(response.data.likeCount)
    //     })
        
    // }

    const likePostHandler = async() => {
        try {
            const response = await axiosInstance.get(`/posts/like-post/${userId}/${post.id}`)
            setPostLike(response.data.postliked)
            setLikeCount(response.data.likeCount)

        }catch(error) {
            console.log('an error occured during liking the post')
            toast.error('error occured...')
        }
    }

    useEffect(()=> {
        axiosInstance({
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
        <>
        {!editPost ?
                        (
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
                                        <MoreInfo info={post} userId={userId} title='Post' setUpdateData={setPosts} setEdit={setEditPost}/>
                                            {/* <DropdownButton size='sm' variant='none'>
                                                <Dropdown.Item onClick={()=>handleReport(post.id)}>Report</Dropdown.Item>
                                                
                                            </DropdownButton>   */}
                                            
                                        </div>
                                    </div>

                                    <div className='content'>
                                        <p style={{overflowWrap:'anywhere'}}>{post.content}</p>
                                        {post.image && <img src={post.image} alt=''/>}
                                        {post.video && ( <video controls>
                                                            <source src={post.video} type='video/mp4' />
                                                            Your browser doesn't support the video tag
                                                        </video>
                                                        )
                                        }
                                    </div>

                                    <div className='info'>
                                        <div className='item' onClick={likePostHandler}>
                                            {postLike ? <FavoriteOutlinedIcon />: <FavoriteBorderOutlinedIcon />}
                                            {/* {likeCount} likes                  */}
                                            <LikeComponent likeCount={likeCount}/>
                                        </div>

                                        <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
                                            <TextsmsOutlinedIcon />
                                            {commentCount} Comments
                                        </div>
                                    </div>
                                    {commentOpen && <Comments postId={post.id} setCommentCount={setCommentCount}/>}
                                </div>
            
                            </div>
                        )
                     :<Share post={post} setEditPost={setEditPost} userInfo={userInfo} onUpdatePosts={()=>setUpdatePosts(true)} editPost={editPost}/>
        }
        
        
        </>
    )
}

export default Post