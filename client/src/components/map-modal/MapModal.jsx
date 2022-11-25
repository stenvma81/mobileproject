// adapted from https://github.com/trananhtuat/react-modal

import { useEffect, useState, useRef } from 'react';
import './modal.scss';
import logo from '../header/images/nokia.jpg';
import PropTypes from 'prop-types';
import ImageMarker from 'react-image-marker';

export default function MapModal(props) {
    const modalState = props.toggle;
    const closeModal = props.action;

    const [markers, setMarkers] = useState([        {
        top: 10,
        left: 50,
    },]);

    return (
        <div className={`${"container"} ${modalState ? "active" : ''}`}>
            <div className="modal">
                <ImageMarker
                    src={logo}
                    markers={markers}
                    onAddMarker={(marker) => setMarkers([...markers.splice(0, marker), marker])}
                />
                <div className="close" onClick={closeModal}>x</div>
            </div>
        </div>
    );
};