import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import AddMeetForm from './AddMeetForm';
import { createMeet } from '../../utils/firebaseCalls';

const AddMeetModal = ({open, handleClose}) => {
  const [date, setDate] = React.useState(new Date().getTime());
  const [time, setTime] = React.useState({from: new Date().getTime(), to: new Date().getTime(), error: false});
  const [placesCount, setPlacesCount] = React.useState('');
  const [places, setPlaces] = React.useState({placesCount: '', placesName: {}});

  const onTimeChange = (newValue, name) => {
    console.log(newValue)
    setTime(prevState => ({...prevState, [name]: newValue.getTime()}));
  }

  const handlePlacesCountChange = (event) => {
    setPlacesCount(Number(event.target.value) || '');
  };

  const debouncedSearch = debounce(async (name, place) => {
    setPlaces(prevState => ({...prevState, [name]: place}));
  }, 500);

  const handlePlacesChange = (event) => {
    debouncedSearch(event.target.name, event.target.value)
  };

  const onAddClick = async () => {
    try {
      await createMeet({ date: date, fromTime: time.from, toTime: time.to, id: uuidv4(), places: Object.values(places) });
    } catch(e) {
      console.log(e);
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
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddMeetForm 
          date={date} 
          setDate={setDate} 
          time={time}
          onTimeChange={onTimeChange} 
          places={places} 
          handlePlacesChange={handlePlacesChange} 
          placesCount={placesCount}
          handlePlacesCountChange={handlePlacesCountChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onAddClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMeetModal;