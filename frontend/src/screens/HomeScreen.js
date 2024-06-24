import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import Share from '../components/share/Share'
import Posts from '../components/posts/Posts'
import './home.scss'
import toast from 'react-hot-toast'
import axiosInstance from '../axios'

function HomeScreen() {
    const userLogin = useSelector(state=> state.userLogin)
    const userPics = useSelector(state=>state.userPicture)
    const {userPicture} = userPics
    const {userInfo} = userLogin
    const [updatePosts, setUpdatePosts] = useState(false)
    const [posts, setPosts] = useState()

    const fetchPosts = async() => {
        try {
            const response = await axiosInstance.get('/posts/fetch-posts/')
            console.log('response in home : ', response)
            setPosts(response.data.results)
        } catch(error) {
            toast.error('An error occured while fetching posts')
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return(
        
        <div className='home'>
            <Share userInfo={userInfo} userPicture={userPicture} onUpdatePosts={()=> setUpdatePosts(true)} />
            {/* <Posts updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/> */}
            <Posts updatePosts={updatePosts} setUpdatePosts={setUpdatePosts} posts={posts} setPosts={setPosts}/>
        </div>
    )
}

export default HomeScreen





// import {useState} from 'react'
// import {useSelector} from 'react-redux'

// import Share from '../components/share/Share'
// import Posts from '../components/posts/Posts'
// import './home.scss'

// function HomeScreen() {
//     const userLogin = useSelector(state=> state.userLogin)
//     const userPics = useSelector(state=>state.userPicture)
//     const {userPicture} = userPics
//     const {userInfo} = userLogin
//     const [updatePosts, setUpdatePosts] = useState(false)
//     return(
        
//         <div className='home'>
//             <Share userInfo={userInfo} userPicture={userPicture} onUpdatePosts={()=> setUpdatePosts(true)} />
//             <Posts updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
//         </div>
//     )
// }

// export default HomeScreen