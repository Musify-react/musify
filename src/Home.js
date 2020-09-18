import React, {useEffect} from 'react';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import './Home.css';
import Row from './Row';
import './Row.css';


function Home({spotify}) {

    const [{new_rels, new_fps, new_cats, token, cat_playid, cat_play}, dispatch] = useDataLayerValue();

    useEffect(()=>{

    //   spotify.setAccessToken(token);

        spotify.getNewReleases().then(res=>{
            // console.log("followed artists",res);
            dispatch({
                type:"SET_NEW_RELS",
                new_rels:res
            })
        });

        spotify.getFeaturedPlaylists().then(res=>{
            // console.log("NEW REC",res);
            dispatch({
                type:"SET_NEW_FPS",
                new_fps:res
            })
        });

        spotify.getCategories({locale:"en_US"}).then(res=>{
            console.log("CATS",res);
            dispatch({
                type:"SET_NEW_CATS",
                new_cats:res
            })
        });

        spotify.getCategoryPlaylists(cat_playid).then(res=>{
            dispatch({
                type:"CAT_PLAYLIST",
                cat_play:res
            });
        })

    }, [cat_playid]);

    console.log(cat_play);

    return (
        <div>
            {/* <Header/> */}
            {/* display the different sections in different rows */}
            <div className="home__section1">
                    <Row title="New Releases" items={new_rels?.albums?.items}/>
                    <Row title="Featured Playlists" items={new_fps?.playlists?.items}/>
                    <Row title="Categories" items={new_cats?.categories?.items}/>
                    <Row title="Interests" items={cat_play?.playlists?.items}/>
                    
            </div>
            
        </div>
    )
}

export default Home
