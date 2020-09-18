import React, {useEffect} from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from './DataLayer';

// WE CHANGE THE STATE OF THE SPOTIFY APP THROUGH OUR APP THEN ---->
// WE GET THE STATE OF THE SPOTIFY APP & THEN FIX OUR APP STATE ACCORDINGLY

function Footer({spotify}) {
    // getting the playing state, the item-song and token
    const [{token, item, playing}, dispatch] = useDataLayerValue();

    //when the component will load dispatch an action aetting the *item & playing*
    useEffect(()=>{
        spotify.getMyCurrentPlaybackState().then(res=>{
            console.log("----Footer--------", res);

            dispatch({
                type:"SET_PLAYING",
                playing:res.is_playing
            });

            dispatch({
                type:"SET_ITEM",
                item:res.item
            });
        })
    }, [spotify]);

    const handlePlayPause = () => {
        //dispatch an action setting *the state of the song(playing)*
        if(playing){
            spotify.pause();
            dispatch({
                type:"SET_PLAYING",
                playing:false
            });
        }else{
            spotify.play();
            dispatch({
                type:"SET_PLAYING",
                playing:true
            });
        }
    }

    const skipNext = () => {
        // first move to the next song using spotify api
        //  get the state from spotify & dispatch an action setting the *item & playing*
        spotify.skipToNext();
        spotify.getMyCurrentPlaybackState().then(res=>{
            dispatch({
                type:"SET_ITEM",
                item:res.item
            });

            dispatch({
                type:"SET_PLAYING",
                playing:res.is_playing
            })
        })

    }

    const skipPrevious = () => {
        // first move to the previous song
        //dispatch an action setting the *item & playing*
        spotify.skipToPrevious();
        spotify.getMyCurrentPlaybackState().then(res=>{
            dispatch({
                type:"SET_ITEM",
                item:res.item
            });

            dispatch({
                type:"SET_PLAYING",
                playing:res.is_playing
            });
        });
    }


    return (
        <div className="footer">
            <div className="footer__left">
                {/* Album & Song Details */}
                <img
                className="footer__albumLogo"
                src="https://i.scdn.co/image/ab67616d00004851f4c962d358de7ed4548d00b3"
                alt="Album Logo"
                />
                
                <div className="footer__songInfo">
                    <h4>hans zimmer</h4>
                    <p>superman</p>
                </div>
            </div>
            <div className="footer__center">
                {/* Player Controls */}
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
                {
                    playing ? (
                        <PlayCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    ):(
                        <PauseCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    )
                }
                
                <SkipNextIcon onClick={skipNext} className="footer__icon" />
                <RepeatIcon className="footer__green" />
            </div>
            <div className="footer__right">
                {/* Volume Controls */}
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
