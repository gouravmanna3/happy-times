import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import AddMeetModal from './AddMeet/AddMeetModal';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  }


  return (
    <AppBar position="static" color="primary" style={{ background: '#2E3B55' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            Add
          </Button>
        </Typography>
        <Button color="inherit" onClick={handleLogout} endIcon={<LogoutIcon />}>Logout</Button>
      </Toolbar>
      <AddMeetModal handleClose={handleClose} open={open} />
    </AppBar>
  )
}

export default Navbar