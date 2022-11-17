import React from "react";
import classes from "./smallCard.css"


export default function Card(props) {
    return (
        <div className="card">
            <div className="post-state">
                    <div className="argumenpoststate">{props.argumenpoststate+props.posttate}</div>
                    <div className="card-date">{props.date}</div>
            </div>
            <div className="post-text">
                    <div className="card-title">{props.title}</div>
                    <div className="card-text">{props.description}</div>
            </div>
            <div className="post-place">
                    <div className="argumentplace">{props.argumentplace}</div>
                    <div className="place">{props.place}</div>
            </div>
            <div className="post-modify">
                    <button id="modify-button">
                        Muokkaa ilmoitusta
                    </button>
            </div>
            <div className="post-message">
                <div className="argumentmessage">{props.argumentmessage}</div>
                <button id="send-button">
                    Lähetä
                </button>
            </div>

        </div>

    );
}

