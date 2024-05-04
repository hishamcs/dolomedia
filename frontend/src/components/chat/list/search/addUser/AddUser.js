import { useSelector } from 'react-redux'
import './addUser.scss'
import axios from 'axios'
import { useContext, useState } from 'react'
import toast from "react-hot-toast";
import ChatContext from '../../../../../context/ChatContext';


const AddUser = () => {
    const {token, id} = useSelector(state=>state.userLogin.userInfo)
    const {fetchChatlist} = useContext(ChatContext)
    const [users, setUsers] = useState([])
    const [userCount, setUserCount] = useState()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userName = formData.get('username')
        if (userName.trim() === '') {
            toast.error('please enter the username')
            return
        }
        
        const config = {
            params:{'user':userName,'userId':id},
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get('/api/user-search/', config)
            setUserCount(response.data.length)
            setUsers(response.data)
            console.log('resp : ', response)
        } catch (error) {
            toast.error(error.response.data.message
                            ?
                                error.response.data.message
                            :   error.message
                        )
        }
    }

    const handleAdd = async(receiverId) => {
        const data = {'userId':id, 'receiverId':receiverId}
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try{
            const response = await axios.post('/api/chatroom/', data, config)
            console.log(response)
            if(response.status === 200) {
                fetchChatlist()
                console.log('success')
            }
        } catch(error) {
            toast.error(error.response.data 
                            ? error.response.data.message
                            : error.message
                        )
        }
    }


    return (
        <div className='addUser'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter the username' name='username'/>
                <button>Search</button>
            </form>
            {userCount >= 0 && <div className='result'>-----------------{userCount} results-----------------</div>}
            {users.map(user=> (
                <div className='user' key={user.id}>
                    <div className='detail'>
                        <img src={user.pro_pic} alt='' />
                        <span>{user.name}</span>
                    </div>
                    <button onClick={()=>handleAdd(user.id)}>Add User</button>
                </div>
            ))}
        </div>


    )
        
    
}

export default AddUser  