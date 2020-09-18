id - f70e5e3de3884c0d87882f1303c1008f

<div className="row__posters">
{items && items.map(item=>(   
        <div className="row__poster" key={item?.id}>
            <div className="inner_post">
                <img src={item?.images[0].url} className="row__image" alt="..."/>
                <h3>{item?.name}</h3>
                {
                    item?.artists.map(artist=>(
                        <span>{artist?.name}</span>
                    ))
                }
            </div>
        </div>
           
           ))     
}
</div>