import moment from 'moment';

const formatDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth()+1;
  const year = new Date(date).getFullYear();

  return `${day}`+`${month}`+`${year}`
}

const getHoursDiff = (from, to) => {
  const hoursDiff = moment.duration(moment(new Date(to)).diff(moment(new Date(from)))).asHours();
  const roundedHoursDiff = parseFloat(hoursDiff.toFixed(1));
  return roundedHoursDiff;
}

const mapValues = (readings, meetData) => {

  const filledReadings = readings.map((data) => {
    const match = meetData.find(({date}) => formatDate(date) === formatDate(data.time));

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

