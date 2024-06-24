import './notification.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '10%',
  left: '70%',
  transform: 'translate(-50%, 0%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  border:'none',
  boxShadow: 24,
  // p: 4,
  maxHeight:'80vh',
  overflowY: 'auto'
};


const Notification = ({notifications, setNotifications, notificationList}) => {
  console.log('notifications : ', notificationList)
  return (
    <Modal
      open={notifications}
      onClose={()=> setNotifications(!notifications)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='notification-mo'>
          <div className='head'>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Notifications
            </Typography>
            <button onClick={()=>setNotifications(!notifications)}>x</button>
          </div>
          <hr />
          {notificationList.map(notification => (

          <Typography id="modal-modal-description" sx={{ mt: 2 }} key={notification.id}>
            {notification.noti_content}
          </Typography>
          ))}
        </Box>
    </Modal>
  )
}
export default Notification






















// import Modal from 'react-bootstrap/Modal'



// function Example({notifications, setNotifications, notificationList}) {
//   return (
//     <>
//     <Modal show={notifications} onHide={()=>setNotifications(!notifications)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Notifications</Modal.Title>
//         </Modal.Header>
//         {notificationList.map(notification => (
//             <Modal.Body key={notification.id}>
//                 {notification.noti_content}
//                 <span className=''></span>
//             </Modal.Body>
            
//         ))}
        
        
//       </Modal>
//     </>
//   );
// }

// export default Example;