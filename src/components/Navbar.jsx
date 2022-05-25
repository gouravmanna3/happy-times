import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import AddMeetModal from './AddMeet/AddMeetModal';
import { useNavigate } from 'react-router-dom'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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