import React from "react";
import Background from './images/nokia.jpg';
import './Header.css';

export function Header(){
    return(

        <div className="image_header" style={{ backgroundImage: 'url('+ Background +')'
        }}>
                <h1>Karamalmi Campus</h1>
                <h2>Kiinteistöt</h2>
        </div>
    )
}