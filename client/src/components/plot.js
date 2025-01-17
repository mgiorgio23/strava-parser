import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);

const Plot = ({ id, onDelete }) => {
  const key_map = {
    'Distance':'distance',
    'Kudos':'kudos_count',
    'Elevation':'total_elevation_gain',
    'Max Heartrate':'max_heartrate',
    'Avg Heartrate':'average_heartrate',
    'Total Time':'elapsed_time'
  }
  const keys = ['Distance', 'Kudos', 'Elevation', 'Avg Heartrate', 'Max Heartrate', 'Total Time'];
  

  
  const [xCat, setXCat] = useState('distance' || ''); // Default to the first key or empty
  const [yCat, setYCat] = useState('elapsed_time' || '');

  const sesData = JSON.parse(sessionStorage.getItem('data'));
  console.log("X",xCat)
  console.log("Y",yCat)

  const dataForChart = sesData
    .filter(item => item[xCat] != null && item[yCat] != null)
    .map(item => ({ x: Number(item[xCat]).toFixed(2), y: Number(item[yCat]).toFixed(2) }))
    .sort((a, b) => a.x - b.x);
  const data = {
      datasets: [
          {
          // label: `${xCat} vs ${yCat}`,
          data: dataForChart,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          },
      ],
      };
      const options = {
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display:true,
            text:`${xCat}`
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display:true,
            text:`${yCat}`
          }
        },
      },
  };

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>Plot {id}</h3>
      <div>
      <label>
        X-Axis:
        <select value={key_map[xCat]} onChange={(e) => setXCat(key_map[e.target.value])}>
          {keys.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
      <label style={{'font':'10px'}}>
        Y-Axis:
        <select value={key_map[yCat]} onChange={(e) => setYCat(key_map[e.target.value])}>
          {keys.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
    </div>
      <Bar data={data} options={options} />
      <button onClick={() => onDelete(id)}>Delete Plot</button>
      {/* Plot rendering logic goes here */}
    </div>
  );
};

export default Plot;