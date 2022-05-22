import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import moment from 'moment';
import { getReadings } from '../utils/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Hours Spent'
      },
    },
    x: {
      title: {
        display: false,
        text: 'Date'
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: true,
      text: 'Statistics',
    },
  },
};

const Chart = ( {meetData }) => {
  const [graphData, setGraphData] = useState([]);
  const [daysCount, setDaysCount] = useState(7);

  useEffect(() => {
    setGraphData(getReadings(daysCount, meetData));
  }, [daysCount, meetData]);


  const handleDaysChange = (event) => {
    setDaysCount(parseInt(event.target.value));
  };

  const labels = graphData.map((data) => moment(data.time).format("DD/MM/YYYY"));

  const data = {
    labels,
    datasets: [
      {
        label: "Hours spent",
        data: graphData.map((data) => data.value),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: "#000",
        tension: 0.1,
        borderWidth: 0.2
      }
    ],
  };

  return (
    <div>
      <FormControl sx={{float: 'right'}}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="chart-radio-buttons"
          value={daysCount}
          onChange={handleDaysChange}
        >
          <FormControlLabel value="7" control={<Radio />} label="7 days" />
          <FormControlLabel value="15" control={<Radio />} label="15 days" />
          <FormControlLabel value="30" control={<Radio />} label="30 days" />
        </RadioGroup>
      </FormControl>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Chart;