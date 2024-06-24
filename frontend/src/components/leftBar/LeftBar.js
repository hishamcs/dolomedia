
import './leftBar.scss'
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const LeftBar = () => {
  return (
    <div className='leftbar'>
      <div className='container'>
        <div className='menu'>
          <div className='item'>
            <HomeIcon />
            <span>Home</span>
          </div>
          <div className='item'>
            <MessageIcon />
            <span>Messages</span>
          </div>
          <div className='item'>
            <SettingsIcon />
            <span>settings</span>
          </div>
          <div className='item'>
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
