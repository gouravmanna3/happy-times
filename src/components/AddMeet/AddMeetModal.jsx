import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import AddMeetForm from './AddMeetForm';
import { createMeet } from '../../utils/firebaseCalls';

// const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,

  // position: 'absolute',
  // width: '88%',
  // height: 'auto',
  // top: '10%',
  // left: '50%',
  // right: 'auto',
  // bottom: 'auto',
  // bgcolor: 'background.paper',
  // transform: 'translate(-50%, -50%)',
// };

const AddMeetModal = ({open, handleClose}) => {
  const [date, setDate] = React.useState(new Date().getTime());
  const [time, setTime] = React.useState({from: new Date().getTime(), to: new Date().getTime(), error: false});
  const [placesCount, setPlacesCount] = React.useState('');
  const [places, setPlaces] = React.useState({placesCount: '', placesName: {}});
  const [disableAddBtn, setDisableAddBtn] = React.useState(true);

  const onTimeChange = (newValue, name) => {
    setTime(prevState => ({...prevState, [name]: newValue.getTime()}));
  };

  const onDateChange = (newDate) => {
    setDate(newDate);
  }

  const handlePlacesCountChange = (event) => {
    setPlacesCount(Number(event.target.value) || '');
  };

  const debouncedSearch = debounce(async (name, place) => {
    setPlaces(prevState => ({...prevState, [name]: place}));
  }, 500);

  const handlePlacesChange = (event) => {
    if(event.target.value) {
      setDisableAddBtn(false);
    } else {
      setDisableAddBtn(true);
    }
    debouncedSearch(event.target.name, event.target.value)
  };

  const onAddClick = async () => {
    try {
      await createMeet({ date: date, fromTime: time.from, toTime: time.to, id: uuidv4(), places: Object.values(places) });
      toast.success(`Added Succesfully! ${String.fromCodePoint('0x1F603')}`, {theme: 'colored'});
    } catch(e) {
      console.log(e);
      toast.error(`Adding Failed! ${String.fromCodePoint('0x1F622')}`, {theme: 'colored'});
    }
    handleClose();
  }

  useEffect(() => {
    setTime(prevState => ({...prevState, from: date, to: date}));
  }, [date]);

  useEffect(() => {
    if(placesCount !== Object.keys(places).length && Object.keys(places).length) {
      const newPlaces = Object.keys(places).reduce((acc, current, currentIndex) => {
          if(currentIndex <= placesCount-1) {
            acc = {...acc, [current]: places[current]}
          }
          return acc;
      },{});
      setPlaces(newPlaces);
    };
  }, [placesCount]);

  useEffect(() => {
    if(moment.duration(moment(time.to).diff(moment(time.from))).asHours() < 0) {
      setTime(prevState => ({...prevState, error: true}));
    } else {
      setTime(prevState => ({...prevState, error: false}));
    }
  }, [time.from, time.to]);

  return (
    // <Modal
    //     aria-labelledby="transition-modal-title"
    //     aria-describedby="transition-modal-description"
    //     open={open}
    //     onClose={handleClose}
    //     closeAfterTransition
    //     BackdropComponent={Backdrop}
    //     BackdropProps={{
    //       timeout: 500,
    //     }}
    //   >
    //     <Fade in={open}>
    //       <Box sx={style}>
    //       <AddMeetForm 
    //       date={date} 
    //       setDate={setDate} 
    //       time={time}
    //       onTimeChange={onTimeChange}
    //       onDateChange={onDateChange}
    //       places={places} 
    //       handlePlacesChange={handlePlacesChange} 
    //       placesCount={placesCount}
    //       handlePlacesCountChange={handlePlacesCountChange}
    //     />
    //       </Box>
    //     </Fade>
    //   </Modal>
    
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        <AddMeetForm 
          date={date} 
          setDate={setDate} 
          time={time}
          onTimeChange={onTimeChange}
          onDateChange={onDateChange}
          places={places} 
          handlePlacesChange={handlePlacesChange} 
          placesCount={placesCount}
          handlePlacesCountChange={handlePlacesCountChange}
        />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onAddClick} disabled={disableAddBtn}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMeetModal;