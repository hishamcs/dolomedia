import "./share.scss";
import {useState} from 'react'
import axios from 'axios';



const Share = ({userInfo,onUpdatePosts}) => {

  // console.log('userinfo : ', userInfo,'\nonUpdatePosts : ', onUpdatePosts)
  const name = userInfo?.name
  const userId = userInfo?.id
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const setImage = (e) => {
    setFile(e.target.files[0])
  }
  const handlePost = async() => {

    if(content!=='' || file!==''){
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
            src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600'
            alt=""
          />
          <input type="text" placeholder={`What's on your mind "${name}?`} value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=>{
              setImage(e)
            }}/>
            <label htmlFor="file">
              <div className="item">
                <span>Add Image</span>
              </div>
            </label>
            {/* <div className="item">
              <img src='' alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src='' alt="" />
              <span>Tag Friends</span>
            </div> */}
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