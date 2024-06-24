import './showdetails.scss'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: 400,
  boxShadow: 24,
  maxHeight:'80vh',
  overflowY:'auto'
};
const ShowDeatils = ({detail, setDetail, lists, listInfo, searchContent}) => {
    
    const [userList, setUserList] = useState([])
    
    const handleFollow = async(fuser) => {
      try {
        const response = await axiosInstance.post(`/posts/follow-user/${fuser.id}/`, {'info':listInfo, 'search_content':searchContent})
        setUserList(response.data)
        console.log('response from handling : ', response.data)
      }catch(error) {
        console.log('error occured during following handling.... : ',error)
      }
    }
    
    useEffect(()=> {
      setUserList(lists)
    }, [lists])

    return (
      
      <Modal
        open={detail}
        onClose={()=> setDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} className='MyMod'>
          <div className='heading'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {listInfo}
            </Typography>
            <button onClick={()=> setDetail(false)}>x</button>
          </div>
          {userList.map((list) => (
            <Typography id="modal-modal-description" className='cont-itemss' sx={{ mt: 2 }} key={list.id}>
              {listInfo === 'Following List' && ( <>
                                                    <Link to={`/home/profile/${list.following.id}`} style={{textDecoration:"none"}}>
                                                      <div className='mod-itemm'>
                                                        <img src={list.following.pro_pic} alt='user'/>
                                                        <span>{list.following.name}</span>
                                                      </div>
                                                    </Link>
                                                    {list.following.is_following ? <button style={{backgroundColor:"red"}} onClick={()=>handleFollow(list.following)}>Unfollow</button>:<button onClick={()=>handleFollow(list.following)}>Follow</button>}
                                                  </>
                                                )
              }
              {listInfo === 'Followers List' && (<>
                                                  <Link to={`/home/profile/${list.follower.id}`} style={{textDecoration:"none"}}>
                                                    <div className='mod-itemm'>
                                                      <img src={list.follower.pro_pic} alt='user'/>
                                                      <span>{list.follower.name}</span>
                                                    </div>
                                                  </Link>
                                                  {list.follower.is_following ? <button style={{backgroundColor:"red"}} onClick={()=>handleFollow(list.follower)}>Unfollow</button>:<button onClick={()=>handleFollow(list.follower)}>Follow</button>}
                                                
                                                </>
                                                ) 
              }
              {listInfo === 'SearchResult' && (<>
                                                <Link to={`/home/profile/${list.id}`} style={{textDecoration:"none"}} onClick={()=> setDetail(false)  }>
                                                  <div className='mod-itemm'>
                                                    <img src={list.pro_pic} alt='user'/>
                                                    <span>{list.name}</span>
                                                  </div>
                                                </Link>
                                                  {list.is_following ? <button style={{backgroundColor:"red"}} onClick={()=>handleFollow(list)}>Unfollow</button>:<button onClick={()=>handleFollow(list)}>Follow</button>}
                                                </>
                                              )
              }
          </Typography>
          ))}
          {userList.length ===0 && (
            <Typography id="modal-modal-description" className='cont-itemss' sx={{ mt: 2 }}>
              No records
            </Typography>
          )}
          
        </Box>
      </Modal>
    
    )
    
}


export default ShowDeatils




















// import './showdetails.scss'
// import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';



// const ShowDeatils = ({detail, setDetail, lists, listInfo}) => {
//     console.log('fo lists : ', lists)
//     return (
//       <Modal
//         size="lg"
//         show={detail}
//         onHide={() => setDetail(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             {listInfo}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className='modal-body'>
//             {lists.map((list) => (
//                 <div className='d-flex justify-content-between px-5 align-items-center fol-container'key={list.id}>
//                     <div className='d-flex flex-row gap-2 align-items-center fol-body'>
//                         <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user'/>
//                         {listInfo === 'Following List'?(<Link to={`/home/profile/${list.following.id}`}><span>{list.following.name}</span></Link>):(<span></span>)}
//                         {listInfo==='Followers List'?(<Link to={`/home/profile/${list.follower.id}`}><span>{list.follower.name}</span></Link>):(<span></span>)}
//                         {listInfo==='SearchResult' ?(<Link to={`/home/profile/${list.id}`}><span>{list.name}</span></Link>):(<span></span>)}
//                     </div>
                
//                     {/* <button>Follow</button> */}
//                 </div>
//             ))}
//         </Modal.Body>
//       </Modal>
//     )
    
// }


// export default ShowDeatils