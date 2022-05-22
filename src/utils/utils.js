import moment from 'moment';
import { sortBy } from 'lodash';

const getHoursDiff = (from, to) => {
  const hoursDiff = moment.duration(moment(new Date(to)).diff(moment(new Date(from)))).asHours();
  const roundedHoursDiff = parseFloat(hoursDiff.toFixed(1));
  return roundedHoursDiff;
}

const mapValues = (readings, meetData) => {
  const filledReadings = readings.map((data) => {
    const match = meetData.find(({date}) => formatDate(date, 'DD/MM/YYYY') === formatDate(data.time, 'DD/MM/YYYY'));

    if(match) {
      const obj = {time: data.time, value: getHoursDiff(match.fromTime, match.toTime)}
      return obj;
    }
    return data;
  });
  console.log(filledReadings);
  return filledReadings;
}

export const getReadings = (length = 60, meetData) => { 
  const current = Date.now();
  const hour = 1000 * 60 * 60 * 24;
  const readings =  [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: 0,
  }))
  return mapValues(readings, meetData);
};

export const sortMeetData = (meetData) => {
  return sortBy(meetData, [(data) => data.date])
};

export const formatDate = (date, format) => {
  return moment(new Date(date)).format(format);
}

export const formatTime = (time) => {
  return moment(new Date(time)).format('hh:mm a');
}

export const formatPlaces = (places) => {
  return places.join(', ');
}