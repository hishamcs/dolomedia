import {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteDialog from '../DeleteDialog';

export default function MoreInfo({info, userId, title, setUpdateData, setUpdateDataCount, setEdit}) {
//   console.log('info : ', info)
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    setEdit(true)
  }

  const handleDelete = () => {
    setDeleteDialog(!deleteDialog)
  }

  return (
    <div>
      <MoreHorizIcon
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{'cursor':'pointer'}}
      >
        Dashboard
      </MoreHorizIcon>
      
        {info.user.id == userId
            ? (
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon>
                            <EditIcon fontSize='small'/>
                        </ListItemIcon>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <DeleteIcon fontSize='small'/>
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                </Menu>
                
              )
            : (
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <FlagIcon fontSize='small' />
                        </ListItemIcon>
                        Report
                    </MenuItem>
                </Menu>
              )
        }
        
        
    <DeleteDialog title={title} deleteDialog={deleteDialog} setDeleteDialog={setDeleteDialog} id={info.id} setUpdateData={setUpdateData} setUpdateDataCount={setUpdateDataCount}/>
    
    </div>
  );
}
