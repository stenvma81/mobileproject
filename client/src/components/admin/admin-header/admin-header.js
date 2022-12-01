import React from "react";
import Background from './nokia_header_desktop.jpg';
import './admin-header.css'


export function AdminHeader(){
    return(
        <div className="admin_image_header" style={{backgroundImage: 'url('+ Background +')'
    }}>
            <h1 id="bigger">Karamalmi Campus</h1>
            <h2>Kiinteistöt</h2>
    </div>
    )
}