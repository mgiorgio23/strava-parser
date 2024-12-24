import React, { useState } from 'react'
import strava_btn from './strava-orange.svg';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Results() {
    let url = window.location.href;
    const [filters, setFilters] = useState({
        type: '',
        startDate: '',
        endDate: '',
        minDist: '',
        maxDist: '',
        minElev: '',
        maxElev: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
          ...filters,
          [name]: value,
        });
      };



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
            return data;
            } catch (error) {
            console.error('Error fetching filtered data:', error);
            }
    }
    
    const switchWindow = () => {
    const newUrl = url + "instructions";
    window.location.href = newUrl
    };

    return (
        <div className="App">
          <header className="App-header">
            <div className="filter-container">
              <h3>Filter Options</h3>
              <form id="filterForm">
                <div className="filter-option">
                  <label htmlFor="type">type:</label>
                  <select id="type" name="type" value={filters.type} onChange={handleInputChange}>
                    <option value="">Any</option>
                    <option value="Run">Run</option>
                    <option value="Hike">Hike</option>
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
                </div>
                <button type="button" onClick={applyFilters}>Apply Filters</button>
              </form>
            </div>
          </header>
          {/* <button type="button" onClick={null}>Get Stored Data</button> */}
        </div>
      );
    }