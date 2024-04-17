import {Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';

export default function DeleteDialog({title, deleteDialog, setDeleteDialog, id, setUpdateData, setUpdateDataCount}) {
  const userLogin = useSelector(state=>state.userLogin)
  const userInfo = userLogin?.userInfo
  const userId = userInfo?.id

  const handleClose = () => {
    setDeleteDialog(false)
  };



  const handleDeleteSubmit = async() => {
    const token = userInfo?.token
    let params, url;

    if (title==='Post') {
      params = {'postId':id}
      url = '/posts/post-delete/'
    } else if (title=== 'Comment' || title === 'Reply') {
      params = {'commentId':id, 'userId':userId}
      url = '/posts/comment/'
    } else return;

    try {
      const config = {
        params:params,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.delete(url, config)
      if(title=== 'Comment' || title === 'Reply') {
        setUpdateDataCount(response.data.length)
      }
      handleClose()
      setUpdateData(response.data)

      toast.success('Deleted...', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    } catch(error) {
      console.log('error : ', error)
      toast.error(error.response.data.detail)
      handleClose()
    }  
  } 

  return (
    <Fragment>
      <Dialog
        open={deleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Delete your ${title} permanently ??`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSubmit}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
