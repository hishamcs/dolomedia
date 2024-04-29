import './notification.scss'
import Modal from 'react-bootstrap/Modal'



function Example({notifications, setNotifications, notificationList}) {
  return (
    <>
    <Modal show={notifications} onHide={()=>setNotifications(!notifications)}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        {notificationList.map(notification => (
            <Modal.Body key={notification.id}>
                {notification.noti_content}
                <span className=''></span>
            </Modal.Body>
            
        ))}
        
        
      </Modal>
    </>
  );
}

export default Example;