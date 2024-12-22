'use-client'
import React from 'react'
import strava_btn from './strava-orange.svg';
import './App.css';

function Home() {
  let url = window.location.href;

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
        <button onClick={sendRequest}>Send Request</button>
      </header>
    </div>
  );
}

export default Home;
