'use-client'
import React from 'react'
import strava_btn from './strava-orange.svg';
import './App.css';

function Home() {

  const sendRequest = () => {
    fetch("https://www.strava.com/api/v3/athlete",
      {
          method: "GET",
          headers: {
            "Authorization": "Bearer 8cb4d4d5586ecb088e2ccc0ed234740ec9b167da",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Strava Premium</h1>
        <nav>
          <a href="https://www.strava.com/login" target="_blank" rel="noopener noreferrer">
            <img src={strava_btn} alt="Strava Button" />
          </a>
          <form action="https://www.strava.com/settings/api" target="_blank">
            <button type="submit">Strava API</button>
          </form>
          <button type="button">Strava Acct</button>
        </nav>
      </header>
    </div>
  );
}

export default Home;
