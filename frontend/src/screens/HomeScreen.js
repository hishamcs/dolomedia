import {useState} from 'react'
import {useSelector} from 'react-redux'

import Share from '../components/share/Share'
import Posts from '../components/posts/Posts'
import './home.scss'

function HomeScreen() {
    const userLogin = useSelector(state=> state.userLogin)
    const userPics = useSelector(state=>state.userPicture)
    const {userPicture} = userPics
    const {userInfo} = userLogin
    const [updatePosts, setUpdatePosts] = useState(false)
    return(
        
        <div className='home'>
            <Share userInfo={userInfo} userPicture={userPicture} onUpdatePosts={()=> setUpdatePosts(true)} />
            <Posts updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
        </div>
    )
}

export default HomeScreen