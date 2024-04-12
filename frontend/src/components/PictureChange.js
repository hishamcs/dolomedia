
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Avatar from 'react-avatar-edit';
import { useState } from 'react';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import toast from 'react-hot-toast';
import {fetchPicture} from '../acitons/userActions'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const PictureChange = ({open, setOpenChange, change, setProPicSrc, setCoverPicSrc}) => {
    const userLogin = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    const {userInfo} = userLogin
    const userId = userInfo.id
    const [preview, setPreview] = useState(null)  
    const onCrop = (preview) => {
        setPreview(preview)
    }

    const handleSave = () => {
        const token = userInfo.token
        console.log(userInfo)
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        axios.post('/api/user/profile/update-pic/',{'id':userId,'pro_pic':preview,'changePicType':change}, config).then((response) => {
            console.log(response)
            const proPicSrc = response.data.profile_pic
            const coverPicSrc = response.data.cover_pic
            if (proPicSrc){
              dispatch(fetchPicture(userId))
              setProPicSrc(proPicSrc)

            } else {
              setCoverPicSrc(coverPicSrc)
            }
              
            toast.success(response.data.message)
        })
        setOpenChange(false)
    }

    return (
        <>
        <BootstrapDialog
        // onClose={setOpenChange}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {change}
        </DialogTitle>
        <IconButton
          aria-label="close"
        onClick={()=>setOpenChange(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                exportAsSquare={true}
            
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      </>
    )
}

export default PictureChange

