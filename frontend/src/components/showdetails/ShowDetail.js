import './showdetails.scss'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';



const ShowDeatils = ({detail, setDetail, lists, listInfo}) => {
    console.log('fo lists : ', lists)
    return (
      <Modal
        size="lg"
        show={detail}
        onHide={() => setDetail(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {listInfo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
            {lists.map((list) => (
                <div className='d-flex justify-content-between px-5 align-items-center fol-container'key={list.id}>
                    <div className='d-flex flex-row gap-2 align-items-center fol-body'>
                        <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user'/>
                        {listInfo === 'Following List'?(<Link to={`/home/profile/${list.following.id}`}><span>{list.following.name}</span></Link>):(<span></span>)}
                        {listInfo==='Followers List'?(<Link to={`/home/profile/${list.follower.id}`}><span>{list.follower.name}</span></Link>):(<span></span>)}
                        {listInfo==='SearchResult' ?(<Link to={`/home/profile/${list.id}`}><span>{list.name}</span></Link>):(<span></span>)}
                    </div>
                
                    {/* <button>Follow</button> */}
                </div>
            ))}
        </Modal.Body>
      </Modal>
    )
    
}


export default ShowDeatils