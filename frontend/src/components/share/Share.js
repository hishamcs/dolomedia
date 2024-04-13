
import "./share.scss";
import {useState} from 'react'
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';

import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';



const Share = ({userInfo,onUpdatePosts, userPicture}) => {

  const name = userInfo?.name
  const userId = userInfo?.id
  const proPicSrc = userPicture?.pro_pic
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const setImage = (e) => {
    const selectedFile = e.target.files[0]
    setFile(e.target.files[0])

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(selectedFile)
  }
  const handlePost = async() => {
    console.log('content : ', content, '\n file : ', file)
    if(content!=='' || file!==null){
      console.log('posting.......')
      const formData = new FormData()
      formData.append('content', content)
      formData.append('image', file)
      const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        }
      }
    
      const response = await axios.post(
      `/posts/addposts/${userId}`,
      formData,
      config
      )

      console.log(response)
      if(response.status === 200){
        onUpdatePosts()
        setContent('')
        setFile('')
        setImagePreview(null)
        
      }
    
    }
    else {
      alert('please fill it')
    }
  }
  return (
    <div className="share">
      <div className="containerr">
        <div className="top">
          <img
            src={proPicSrc}
            alt=""
          />
          {/* <input type="text" placeholder={`What's on your mind "${name}?`} value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <TextareaAutosize placeholder={`What's on your mind "${name}?`} value={content} onChange={(e) => setContent(e.target.value)} style={{width:'100%'}}/>
          
        </div>
        {/* {imagePreview && <img src={imagePreview} alt="Selected" style={{height:'100px', width:'100px'}}/>} */}
        <hr />
        {imagePreview && (
                            <div className="text-center">
                              <img src={imagePreview} alt="Selected" style={{height:'200px', width:'200px'}}/>
                              <hr />
                          </div>
                         )
        }
        
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=>{
              setImage(e)
            }}/>
            {imagePreview 
                  ? (<div className="item" onClick={()=>{
                          setImagePreview(null)
                          setFile(null)
                  }}>
                      <DeleteIcon color="action"/>
                      <span>Remove Image</span>
                    </div>)
                  : (<label htmlFor="file">
                      <div className="item">
                        <AddPhotoAlternateIcon color="action"/>
                        <span>Add Image</span>
                      </div>
                    </label>)
            }
            <div className="item">
              <img src='' alt="" />
              <VideoCallOutlinedIcon color="action" />
              <span>Add Video</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handlePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;