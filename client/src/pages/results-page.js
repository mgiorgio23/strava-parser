import React, { useState } from 'react'
import './App.css';
import Plot from '../components/plot'

const apiUrl = process.env.REACT_APP_API_URL;


//TODO: Convert data from meters to miles 
export default function Results() {

  const [plots, setPlots] = useState([]);
  const [filters, setFilters] = useState({
      type: '',
      startDate: '',
      endDate: '',
      minDist: '',
      maxDist: '',
      minElev: '',
      maxElev: '',
      minKud:'',
      maxKud:'',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value,
      });
    };

    const addPlot = () => {
      const newPlot = { id: plots.length+1};
      if (!sessionStorage.getItem('data')) {
        console.log("No session data")
        alert("Perform a Query First")
        return 
      };
      console.log("NEW",newPlot);
      setPlots([...plots, newPlot]);
    };

    const deletePlot = (id) => {
      setPlots(plots.filter(plot => plot.id !== id))
    }


    const applyFilters = async() => {
        const queryString = new URLSearchParams(filters).toString();
        const url = `${apiUrl}/activities?${queryString}`;
        console.log(url);
        console.log(filters)
        try {
            const response = await fetch(url, {
                'headers': {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Filtered Data:', data);
            sessionStorage.setItem("data",JSON.stringify(data));
            return data;
            } catch (error) {
            console.error('Error fetching filtered data:', error);
            }
    };

    return (
        <div className="App">
          <header className="App-header">
            <div className="filter-container">
              <h3>Filter Options</h3>
              <form id="filterForm">
                <div className="filter-option">
                  <label htmlFor="type">Type:</label>
                  <select id="type" name="type" value={filters.type} onChange={handleInputChange}>
                    <option value="">Any</option>
                    <option value="Run">Run</option>
                    <option value="Hike">Hike</option>
                    <option value="Ride">Ride</option>
                  </select>
                </div>
                <div className="filter-option">
                  <label htmlFor="dateRange">Date Range:</label>
                  <input type="date" id="startDate" name="startDate" value={filters.startDate} onChange={handleInputChange} />
                  <input type="date" id="endDate" name="endDate" value={filters.endDate} onChange={handleInputChange} />
                </div>
                <div className="filter-option">
                  <label htmlFor="minDist">Min Distance:</label>
                  <input type="number" id="minDist" name="minDist" step="0.01" value={filters.minDist} onChange={handleInputChange} />
                </div>
                <div className="filter-option">
                  <label htmlFor="maxDist">Max Distance:</label>
                  <input type="number" id="maxDist" name="maxDist" step="0.01" value={filters.maxDist} onChange={handleInputChange} />
                </div>
                <div className="filter-option">
                  <label htmlFor="minElev">Min Elev Gain:</label>
                  <input type="number" id="minElev" name="minElev" step="0.01" value={filters.minElev} onChange={handleInputChange} />
                </div>
                <div className="filter-option">
                  <label htmlFor="maxElev">Max Elev Gain:</label>
                  <input type="number" id="maxElev" name="maxElev" step="0.01" value={filters.maxElev} onChange={handleInputChange} />
                </div><div className="filter-option">
                  <label htmlFor="maxKud">Max Kudos:</label>
                  <input type="number" id="maxKud" name="maxKud" step="0.01" value={filters.maxKud} onChange={handleInputChange} />
                </div>
                <div className="filter-option">
                  <label htmlFor="minKud">Min Kudos:</label>
                  <input type="number" id="minKud" name="minKud" step="0.01" value={filters.minKud} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={applyFilters}>Apply Filters</button>
              </form>
            </div>
            <h1> Plots</h1>
            <button onClick={addPlot}>Add Plot</button>
            <div>
              {plots.map(plot => (
                <Plot key={plot.id} id={plot.id} onDelete={deletePlot} />
              ))}
            </div>
          </header>
          {/* <button type="button" onClick={null}>Get Stored Data</button> */}
        </div>
      );
    }