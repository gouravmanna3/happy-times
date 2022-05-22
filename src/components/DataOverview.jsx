import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import Chart from './Chart';
import moment from 'moment';

import './DataOverview.css';
import { getMeets } from '../utils/firebaseCalls';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: '25px 18px',
    backgroundColor: 'rgb(242, 245, 249)'
  },
  cardContainer: {
    padding: '10px 15px',
    height: '126px',
    alignItems: 'flex-end',
    display: 'flex',
    color: '#fff',
    justifyContent: 'space-between',
    borderRadius: '8px'
  },
  cardIcon: {
    fontSize: '84px !important',
    opacity: '0.7'
  }
}));

const GetCards = (meetData) => {
  const classes = useStyles();

  const getHoursSpent = () => {
    const count = meetData.reduce((acc, item) => {
        const hoursDiff = moment.duration(moment(new Date(item.toTime)).diff(moment(new Date(item.fromTime)))).asHours();
        const roundedHoursDiff = parseFloat(hoursDiff.toFixed(1));
        acc = +(acc + roundedHoursDiff).toFixed(12);
        return acc;
    }, 0)
    return count;
  }

  const getPlacesVisitedList = () => {
    const placesList = meetData.reduce((acc, item) => {
        acc = [...acc, ...item.places]
        return acc;
    }, []);
    return placesList;
  }

  const getPlacesCount = () => {
    return [...new Set(getPlacesVisitedList())].length;
  }

  return(
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper elevation={12} sx={{backgroundColor: 'rgb(255, 25, 67)'}}>
          <Box className={classes.cardContainer}>
            <div>
              <Typography component="h2" variant="p" gutterBottom>
                {meetData.length}
              </Typography>
              <Typography component="h6" variant="h6" gutterBottom>
                Meet Count
              </Typography>
            </div>
            <div>
              <PeopleIcon className={classes.cardIcon} />
            </div>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper elevation={12} sx={{backgroundColor: '#5FC3E4'}}>
        <Box className={classes.cardContainer}>
            <div>
              <Typography component="h2" variant="p" gutterBottom>
                {getHoursSpent()}
              </Typography>
              <Typography component="h6" variant="h6" gutterBottom>
                Hours Spent
              </Typography>
            </div>
            <div>
              <AccessTimeIcon className={classes.cardIcon} />
            </div>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper elevation={12} sx={{backgroundColor: 'rgb(87, 202, 34)'}}>
        <Box className={classes.cardContainer}>
            <div>
              <Typography component="h2" variant="p" gutterBottom>
              {getPlacesCount()}
              </Typography>
              <Typography component="h6" variant="h6" gutterBottom>
                Places Visited
              </Typography>
            </div>
            <div>
              <PlaceIcon className={classes.cardIcon} />
            </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

const DataOverview = () => {

  const [meetData, setMeetData] = useState([]);
  const classes = useStyles();

  useEffect(async () => {
    try {
      const res = await getMeets();
      setMeetData(res);
    } catch(e){
      console.log(e);
    }
  }, []);
 

  return (
    <Box className={classes.root}>
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            {GetCards(meetData)}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={12}>
              <Chart meetData={meetData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>         
  )
}

export default DataOverview;