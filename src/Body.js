import React,{useEffect} from 'react';
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


function Body({spotify, match}) {
    const [{discover_weekly}, dispatch] = useDataLayerValue();

    useEffect(()=>{
        spotify.getPlaylist(match.params.playlist_id).then(response=>{
          console.log("-----PLAYLIST DATA------",response);
            dispatch({
              type:"SET_DISCOVER_WEEKLY",
              discover_weekly:response
            });
          });

          //some data remains in the discover__weekly
          //cleaning up the data that remains bcz we need the new discover__weekly
          return ()=> {
            dispatch({
              type:"SET_DISCOVER_WEEKLY",
              discover_weekly:null
            });
          }

    }, [match.params.playlist_id]);

    const playPlaylist = (id) => {
        spotify.play({
            context_uri: `spotify:playlist:${match.params.playlist_id}`,
        }).then(res=>{
            // After playing the playlist update the *item & playing status*
            spotify.getMyCurrentPlayingTrack().then((r) => {
                dispatch({
                  type: "SET_ITEM",
                  item: r.item,
                });
                dispatch({
                  type: "SET_PLAYING",
                  playing: true,
                });
              });
        });
    }

    const playSong = (id) => {
        console.log("Individual song id ----- ",id)
        spotify.play({
            uris: [`spotify:track:${id}`],
        })
        .then((res) => {
            // After playing the song update the *item & playing status*
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
    }

    return (
        <div className="body">
            {/* Header */}
            <Header spotify={spotify}/>
            {/* Banner */}
            <div className="body__info">
                <img src={discover_weekly?.images[0]?.url} alt=""/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{discover_weekly?.name}</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                {/* Body Icons */}
                <div className="body__icons">
                    <PlayCircleFilledIcon
                        className="body__shuffle"
                        onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {/* List of songs */}
                {discover_weekly?.tracks.items.map(item=>(
                    // Passing the playsong FUNCTION to the SONGROW component 
                    <SongRow key={item.track.name} playSong={playSong} track={item.track}/>
                ))}
            </div>
        </div>
    )
}

export default Body
