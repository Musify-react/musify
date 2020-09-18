import React from 'react';
import './Row.css';
import { useDataLayerValue } from './DataLayer';


function SearchRow({items, title}) {

    return (
// {item?.images[0].url}
        <div className="row">
        <h1 className="row__h2">{items && title}</h1>

        <div className="row__posters">
            {title==="Albums" && items && items.map(item=>(   
                    <div className="row__poster" key={item?.id}>
                        <div className="inner_post">
                            { item?.images[0]?.url ? <img src={item?.images[0]?.url} className="row__image" alt="..."/>: <img src="https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg" className="row__image" alt="..."/>}
                            <h3>{item?.name}</h3>
                            {
                                item?.artists && item?.artists.map(artist=>(
                                    <span>{artist?.name}</span>
                                ))
                            }
                        </div>
                    </div>
                    
                    ))     
            }

            {(title==="Playlists") && items && items.map(item=>(   
                    <div className="row__poster" key={item?.id}>
                        <div className="inner_post">
                            { item?.images[0]?.url ? <img src={item?.images[0]?.url} className="row__image" alt="..."/>: <img src="https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg" className="row__image" alt="..."/>}
                            <h3>{item?.owner?.display_name}</h3>
                            <span>{item?.name}</span>
                            <br></br>
                            <br></br>

                            <span>Tracks - {item?.tracks?.total}</span>
                        </div>
                    </div>
                    
                    ))     
            }

            {(title==="Artists") && items && items.map(item=>(   
                    <div className="row__poster" key={item?.id}>
                        <div className="inner_post">
                        { item?.images[0]?.url ? <img src={item?.images[0]?.url} className="row__image" alt="..."/>: <img src="https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg" className="row__image" alt="..."/>}
                            <h3>{item?.name}</h3>
                            <span>Popularity - {item?.popularity}</span>
                            <br></br>
                            <br></br>

                            <span>Followers - {item?.followers?.total}</span>
                        </div>
                    </div>
                    
                    ))     
            }

            {(title==="Tracks") && items && items.map(item=>(   
                    <div className="row__poster" key={item?.id}>
                        <div className="inner_post">
                            <img src={item?.album?.images[0]?.url} className="row__image" alt="..."/>
                            <h3>{item?.name}</h3>
                            {
                                item?.artists && item?.artists.map(artist=>(
                                    <span>{artist?.name}</span>
                                ))
                            }
                        </div>
                    </div>
                    
                    ))     
            }

            </div>

        </div>
    )
}

export default SearchRow
