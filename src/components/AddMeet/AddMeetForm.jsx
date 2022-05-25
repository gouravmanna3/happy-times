import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => createStyles({
  timeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '1em'
  }
}));

const AddMeetForm = ({date, time, onDateChange, onTimeChange, handlePlacesChange, placesCount, handlePlacesCountChange}) => {
  
  const classes = useStyles();
  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          inputFormat="dd/MM/yyyy"
          label="Date (dd/mm/yyyy)"
          value={date}
          onChange={(newDate) => {
            onDateChange(newDate.getTime());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box className={classes.timeContainer}>
          <MobileTimePicker
            label="From Time"
            value={time.from}
            onChange={(newTime) => {
              onTimeChange(newTime, 'from');
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileTimePicker
            label="To Time"
            value={time.to}
            onChange={(toTime) => {
              onTimeChange(toTime, 'to');
            }}
            renderInput={(params) => <TextField 
              {...params} 
              error={time.error} 
              helperText={time.error? "Should be greater than From Time" : ""} 
            />}
          />
        </Box>
        <TextField
          id="places-count"
          select
          label="Places Count"
          value={placesCount}
          onChange={handlePlacesCountChange}
          SelectProps={{
            native: true,
          }}
        >
          {[...new Array(10)].map((_, index) => {
          return(
            <option key={index} value={index+1}>{index+1}</option>
          )})}
        </TextField>
          {[...new Array(placesCount)].map((_, index) => {
            return (
              <TextField name={`Place${index+1}`} key={`Place ${index+1}`} label={`Place ${index+1}`} variant="outlined"  onChange={handlePlacesChange} required/>
            )})
          }
      </Stack>
    </LocalizationProvider>
  )
}

export default AddMeetForm;