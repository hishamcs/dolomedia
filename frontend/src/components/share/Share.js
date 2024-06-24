import "./share.scss";
import {useContext, useState} from 'react'
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Button from '@mui/joy/Button';
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axios";
import AutoTextArea from "../autoTextArea/AutoTextArea";
import LoaderContext from "../../context/LoaderContext";




const Share = ({userInfo,onUpdatePosts, userPicture, post, setEditPost, editPost}) => {
  const {setLoading} = useContext(LoaderContext)
  const name = userInfo?.name
  const userId = userInfo?.id
  // const proPicSrc = userPicture?.pro_pic
  const proPicSrc = userInfo?.pro_pic
  const [content, setContent] = useState(post ? post.content: '')
  const [file, setFile] = useState('')
  const [imagePreview, setImagePreview] = useState(post ? post.image: null)
  const [videoPreview, setVideoPreview] = useState(post ? post.video: null)

  const handleUpdate = async() => {
    if(content.trim() === '' && file === ''){
      toast.error('please fill the post')
      return
    }
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('content', content)
    formData.append('postId', post.id)
    if(file && file.type.startsWith('image/')) {
      formData.append('image', file)
      formData.append('video', '')
    } else if (file && file.type.startsWith('video/')) {
      formData.append('video', file)
      formData.append('image', '')
    }else {
      imagePreview ? formData.append('video', ''):formData.append('image', '')
      videoPreview ? formData.append('image', ''):formData.append('video', '')
    }
    // const config = {
    //   headers: {
    //       'Content-type': 'multipart/form-data',
    //       Authorization: `Bearer ${userInfo.token}`
    //   }
    // }
    try {
      setLoading(true)
      const response = await axiosInstance.patch('/posts/update-posts/',formData)
      console.log('response : ', response.data)
      if (response.message==='success'|| response.status===200){
        
        console.log('updateposts: ', onUpdatePosts)
        onUpdatePosts()
        setContent()
        removeMedia()
        setEditPost(false)
        toast.success('post is updated successfully')
      } else {
        toast.error(response.data)
      }

    } catch(error) {
      console.log('error : ', error)
    } finally {
      setLoading(false)
    }
  }
  
  const removeMedia = () => {
    setImagePreview(null)
    setVideoPreview(null)
    setFile('')
  }
  const setImage = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return;
    
    const reader = new FileReader()
    reader.onload = () => {
      if(selectedFile.type.startsWith('image/')) {
        setVideoPreview(null)
        setFile(selectedFile)
        setImagePreview(reader.result)
      } else if (selectedFile.type.startsWith('video/')) {
        setImagePreview(null)
        setFile(selectedFile)
        setVideoPreview(reader.result)
      }
    }
    reader.readAsDataURL(selectedFile)
    e.target.value = null
  }
  const handlePost = async() => {
    
    if(content.trim() !== '' || file!==''){
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('content', content)

      if (file && file.type.startsWith('image/')) {
        formData.append('image', file)
        
      } else if (file && file.type.startsWith('video/')) {
        formData.append('video', file)
        
      }
      setLoading(true)
      try {
        const response = await axiosInstance.post(
          `/posts/addposts/`,
          formData
        )
        console.log(response.data)
        if(response.status === 201|| response.data.message==='success'){
          onUpdatePosts()
          setContent('')
          removeMedia()
          toast.success('Post added successfully')
        } else {
          toast.error(response.data.message || 'Failed to add post')
        }

      } catch(error) {
        console.log(error.response.data)
      } finally {
        setLoading(false)
      }
    } else {
      setContent('')
      toast.error('Please fill the post')
    }
  }
  return (
    <div className="share">
      <div className="containerr">
        <div className="top">
          
          {!editPost && <img src={proPicSrc} alt=""/>}
          {/* <TextareaAutosize placeholder={`What's on your mind "${name}?`} value={content} onChange={(e) => setContent(e.target.value)} style={{width:'100%'}}/> */}
          <AutoTextArea placeholder={`What's on your mind "${name}?`} value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        {/* {imagePreview && <img src={imagePreview} alt="Selected" style={{height:'100px', width:'100px'}}/>} */}
        <hr />
        {imagePreview && (
                            <div className="mediaPreview">
                              <img src={imagePreview} alt="Selected" style={{height:'200px', width:'200px'}}/>
                              <hr />
                          </div>
                         )
        }
        {videoPreview && (
                            <div className="mediaPreview">
                              <video src={videoPreview} controls style={{width:'100%', height:'500px'}}/>
                              <hr />
                            </div>
                          )

        }
        
        <div className="bottom">
          <div className="left">
            <input type="file" id={post?post.id:"file"} style={{display:"none"}} onChange={(e)=>{setImage(e)}}/>
            {imagePreview 
                  ? (<div className="item" onClick={removeMedia}>
                      <DeleteIcon color="action"/>
                      <span>Remove Image</span>
                    </div>)
                  : (<label htmlFor={post?post.id:"file"}>
                      <div className="item">
                        <AddPhotoAlternateIcon color="action"/>
                        <span>Add Image</span>
                      </div>
                    </label>)
            }
            <input type="file" id={post?post.id:"file"} style={{display:"none"}} onChange={(e)=>{
              setImage(e)
            }}/>
            {videoPreview
                          ? (
                              <div className="item" onClick={removeMedia}>
                                  <DeleteIcon color="action"/>
                                  <span>Remove Video</span>
                              </div>
                            )
                          :(<label htmlFor={post?post.id:"file"}>
                            <div className="item">
                              <img src='' alt="" />
                              <VideoCallOutlinedIcon color="action" />
                              <span>Add Video</span>
                            </div>
                            </label>
                            )      
            }
            
          </div>
          <div className="right">
            {post ? ( 
                      <>
                        <Button size="medium" onClick={handleUpdate}>Update</Button>
                        <Button size="medium" onClick={()=>setEditPost(false)} style={{marginLeft:"5px"}}>Cancel</Button>
                      </>
                    )
                  : <Button size="medium" onClick={handlePost}>Share</Button>
            }
            {/* <Button size="medium" onClick={handlePost} disabled={!content && !file}>Share</Button> */}
            
          </div>
        </div>
        {/* <Toaster position="top-center"reverseOrder={false}/> */}
      </div>
    </div>
  );
};

export default Share;

















