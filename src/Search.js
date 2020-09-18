import React, {useEffect} from 'react';
import './Search.css';
import { useDataLayerValue } from './DataLayer';
import Row from './Row';
import SearchRow from './SearchRow';
import SearchLogo from './assets/magnifying-glass.svg';


function Search({spotify}) {
    const [{search_result}, dispatch] = useDataLayerValue();

    const gensearchResult = (e) => {
        e.preventDefault();
        console.log(e.target.value);

        spotify.search(e.target.value, ["album","artist","playlist","track"]).then(res=>{
            dispatch({
                type:"SET_SEARCH_RESULT",
                search_result:res
            })
        })
    }

    console.log(search_result);

    return (
        <div className="search__div">
            <form role="search">
                <label htmlFor="search">Search for stuff</label>
                <input onChange={gensearchResult}  id="search" type="search" placeholder="Search..." autoFocus required autoComplete="off"/>
            </form>

                {search_result === null ? (
                    <div className="search__logoDiv">
                    <img className="search__logo" src={SearchLogo} alt=""/>
                    <span> . . . Search Musify</span>
                    </div>
                    
                ): (
                    <div className="search_results">
                
                        <SearchRow title="Albums" items={search_result?.albums?.items}/>
                        <SearchRow title="Playlists" items={search_result?.playlists?.items}/>
                        <SearchRow title="Tracks" items={search_result?.tracks?.items}/>
                        <SearchRow title="Artists" items={search_result?.artists?.items}/>
                
                    </div>
                )}
            
        </div>
    )
}

export default Search
