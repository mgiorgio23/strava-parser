import React from 'react'
import strava_btn from './strava-orange.svg';
import './App.css';

export default function Results() {
    let url = window.location.href;

    const filterResults = () => {
        fetch('/activities')
    };

    const switchWindow = () => {
    const newUrl = url + "instructions";
    window.location.href = newUrl
    };

    return (
    <div className="App">
        <header className="App-header">
        <a href="https://www.strava.com/login" target="_blank" rel="noopener noreferrer">
            <img src={strava_btn} alt="Strava Button" />
        </a>
        <form action="https://www.strava.com/settings/api" target='_blank'>
            <button type="submit" > Step 1</button>
        </form>
        <button onClick={switchWindow} > Instructions</button>
        
        <button type="submit" onClick={filterResults}> Get Stored Data</button>
        
        </header>
    </div>
    );
}
