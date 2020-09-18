import React, {useEffect} from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
// makes it easy to interact with the spotify-web-api
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
// Provides a way to grab the data from the data layer
import {useDataLayerValue} from './DataLayer';
// import "bootstrap/dist/css/bootstrap.css";

const spotify = new SpotifyWebApi();

function App() {

  // pulling data from data layer , used to update or dispatch actions
  const [{ user, token }, dispatch] = useDataLayerValue();


  useEffect(()=>{
    // exporting from spotify.js
    const hashObj = getTokenFromUrl();
    window.location.hash = "";//clearing the url

    const _token = hashObj.access_token;

    if(_token){

      dispatch({
        type:'SET_TOKEN',
        token:_token
      })

      //SWA
      spotify.setAccessToken(_token);

      // returns a promise
      spotify.getMe().then(user=>{
        console.log("Person", user);

        // pushing it in the data layer
        dispatch({
          type: 'SET_USER',
          user: user
        });

      });

      spotify.getUserPlaylists().then((playlists)=>{
        // dispatching the user playlist in the data layer

        dispatch({
          type:"SET_PLAYLISTS",
          playlists:playlists
        })
      });

      // spotify.getPlaylist("0vZcMiYx5QFnwB3Ppw55Eh").then(response=>{
      //         console.log(response);
      //           dispatch({
      //             type:"SET_DISCOVER_WEEKLY",
      //             discover_weekly:response
      //           });
      //         });

    }

  }, [token, dispatch]);

  console.log("Person", user);
  console.log("Token", token);

  return (
    <div className="app">
      {
        // doing normally without context & reducer
        token ? (
          // Player
          <Player spotify={spotify}/>
        ) : (
          // Login
          <Login/>
        )
      }
      
    </div>
  );
}

export default App;
