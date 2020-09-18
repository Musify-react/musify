import React from 'react';
import './SidebarOption.css';

function SidebarOption({ title, Icon}) {
    return (
        <div className="sidebarOption">

            {Icon && <Icon className="sidebarOption__icon" />}

            {Icon ? <h3>{title}</h3> : <h4 className="sidebarOption__ptitle">{title}</h4>}

            
        </div>
    )
}

export default SidebarOption
