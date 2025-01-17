'use-client'
import React, { useState } from 'react';
import './App.css';
import './instruct.css'

function Instructions() {
  const [cID, setcID] = useState("");
  const [secret, setSecret] = useState("");
  const [refresh, setRefresh] = useState("");
  const [code, setCode] = useState("");
  console.log(cID)
  console.log(secret)
  console.log(refresh)
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(apiUrl)

  const getTokens = (cID) => {
    window.open(`https://www.strava.com/oauth/authorize?client_id=${cID}&redirect_uri=http://localhost&response_type=code&scope=activity:read_all`, '_blank');
  };

  const getData = (access_token) => {
    const act_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}&per_page=200&page=13cd`;
  
    fetch(act_link)
      .then((res) => res.json())
      .then(data => {
        const chunkSize = 20; 
        const totalChunks = Math.ceil(data.length / chunkSize);
        console.log(totalChunks)
        const sendChunk = async (chunk, index) => {
          try {
            const response = await fetch(`${apiUrl}/activities`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(chunk)
            });
            console.log("HERE")
            if (!response.ok) {
              throw new Error(`Failed to send chunk ${index + 1}`);
            }
            console.log(`Chunk ${index + 1} sent successfully`);
          } catch (error) {
            console.error(`Error sending chunk ${index + 1}:`, error);
            // Optionally implement retry logic here
          }
        };
        (async () => {
          for (let i = 0; i < totalChunks; i++) {
            const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
            console.log(chunk)
            await sendChunk(chunk, i);
            console.log("SENT")
          }
        })();
        }).then(res => console.log(res))
        .catch(err => console.error('Error setting data:', err))
      };

  const reAuthorize = () => {
    const authUrl = "https://www.strava.com/oauth/token";

    const payload = {
      client_id: cID,
      client_secret: 'a9fc58d18d2397cc49c8ba852d572403dc1cfe3b',
      refresh_token: '6c198f1d1e0602d4bb1c5b92f51b332ddc487e66',
      grant_type: "refresh_token",
    };
    console.log(payload)
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
    .then(()=>{
      const url = new URL(window.location.href);
      const baseUrl = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`;
      // window.location.href = baseUrl + '/results'
    })
    .catch(err => console.error('Error:', err));
  };

  const addUser = () => {
    const payload = { id:'Test', refresh: 'TEster' }
    // console.log(payload)

    fetch(`${apiUrl}/users`, {
      method:'POST',
      headers: {
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {return response.json()})
  }

  const getRefresh = () => {
    const authUrl = "https://www.strava.com/oauth/token";
    const activitiesUrl = "https://www.strava.com/api/v3/athlete/activities";

    const payload = {
      client_id: 143040,
      client_secret: "aba2ae5a34d514c6c4cfb0dd5f91257e01221bf6",
      code: code,
      grant_type: "authorization_code",
    };

    fetch(authUrl, {
      method: 'POST',
      headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization':"0f60886862e5285a5a8c04bd69e6748af3490976"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))    
  };

  return (
    <div className="instructions">
      <header className="instruct-header">
        <h2 style={{paddingTop:'20px'}}>Instructions</h2>
        <p>
          First-time users follow steps 1-3 below. Otherwise, skip to step 4.
        </p>
        <ol>
          <li>
            Log in or create a Strava account{' '}
            <a href="https://www.strava.com/login" target="_blank" rel="noopener noreferrer">
              here
            </a>.
          </li>
          <li>
            Submit an API Application{' '}
            <a href="https://www.strava.com/settings/api" target="_blank" rel="noopener noreferrer">
              here
            </a>.
          </li>
          <li>Enter your Client ID below:</li>
        </ol>
        <form className="form-container">
          <div className="form-group">
            <label htmlFor="clientID">Client ID:</label>
            <input
              id="clientID"
              type="number"
              value={cID}
              onChange={(e) => setcID(e.target.value)}
            />
            <button type="button" className="submit-button" onClick={() => getTokens(cID)}>
              Submit Client ID
            </button>
            
          </div>
          <div className="form-group">
            <label htmlFor="clientSecret">Client Secret:</label>
            <input
              id="clientSecret"
              type="text"
              value={secret}
              maxLength="30"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="refreshToken">Refresh Token:</label>
            <input
              id="refreshToken"
              type="text"
              value={refresh}
              maxLength="30"
              onChange={(e) => setRefresh(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code:</label>
            <input
              id="code"
              type="text"
              value={code}
              maxLength="60"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="button" className="submit-button" onClick={getRefresh}>
            Submit Refresh Token
          </button>
        </form>
        <p>4. Collect the data:</p>
        <button type="button" className="data-button" onClick={reAuthorize}>
          Get Data
        </button>
      </header>
    </div>
  );
}


export default Instructions;
