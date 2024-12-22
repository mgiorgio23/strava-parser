'use-client'
import strava_btn from './strava-orange.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import './instruct.css'

function Instructions() {
  const [cID, setcID] = useState("");
  const [secret, setSecret] = useState("");
  const [refresh, setRefresh] = useState("");
  const [code, setCode] = useState("");

  const getTokens = (cID) => {
    window.open(`https://www.strava.com/oauth/authorize?client_id=${cID}&redirect_uri=http://localhost&response_type=code&scope=activity:read_all`, '_blank');
  };

  const getData = (access_token) => {
    const act_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}&per_page=200&page=1`;
  
    fetch(act_link)
      .then((res) => res.json())
      .then(data => {console.log(data)
        // console.log(data[0]["map"]["summary_polyline"])
      sessionStorage.setItem('activities', JSON.stringify(data))})
      .catch(err => console.error('Error getting data:', err))
  };

  const reAuthorize = () => {
    const authUrl = "https://www.strava.com/oauth/token";

    const payload = {
      client_id: 143040,
      client_secret: "aba2ae5a34d514c6c4cfb0dd5f91257e01221bf6",
      refresh_token: "998d549eaca092e97a37e3d2164d2116d3219e5a",
      grant_type: "refresh_token",
    };
    console.log(payload);
    fetch(authUrl, {
      method:'POST',
      headers: {
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {return response.json()})
    .then(data => {
      getData(data.access_token)
    })
    .catch(err => console.error('Error:', err));
  }

  const getRefresh = () => {
    const authUrl = "https://www.strava.com/oauth/token";
    const activitiesUrl = "https://www.strava.com/api/v3/athlete/activities";

    const payload = {
      client_id: 143040,
      client_secret: "aba2ae5a34d514c6c4cfb0dd5f91257e01221bf6",
      code: "91afe9a6e355884edb0262e91300b3257ea46c36",
      grant_type: "authorization_code",
    };

    fetch(authUrl, {
      method: 'POST',
      headers: {
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
          'Authorization':"0f60886862e5285a5a8c04bd69e6748af3490976"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))    
  };

  const getStoredData = () => {
    const value = sessionStorage.getItem('activities');
    console.log(JSON.parse(value))
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          1. Log in or create a Strava account <a href="https://www.strava.com/login" target='_blank'>here.</a> <br />
          2. Submit an API Application <a href="https://www.strava.com/settings/api" target='_blank'>here</a> <br />
          3. Enter your Client ID below
        </p>
        <label>
          Client ID: 
          <input id="cID" type='number' value={cID} onChange={(e) => setcID(e.target.value)}></input>
          <button className='submit-cID' id="submit-cID" onClick={() => getTokens(cID)}>Enter</button>
        </label>
        <label>
          Client Secret: 
          <input id="cSecret" type='text' value={secret} maxLength="30" onChange={(e) => setSecret(e.target.value)}></input>
        </label>
        <label>
          Refresh Token: 
          <input id="cID" type='text' value={refresh} maxLength="30" onChange={(e) => setRefresh(e.target.value)}></input>
        </label>
        <label>
          Code: 
          <input id="cID" type='text' value={code} maxLength="60" onChange={(e) => setCode(e.target.value)}></input>
        </label>
        <button className='submit-cID' id="submit-cID" onClick={() => getRefresh()}> Enter</button>
        <p>
          4. Collect the data:
        </p>
        <button type="submit" onClick={reAuthorize}> Get Data</button>
        <button type="submit" onClick={getStoredData}> Get Stored Data</button>
        {/* TODO: Change the target to same page if successful collection of data */}

      </header>
    </div>
  );
}

export default Instructions;
