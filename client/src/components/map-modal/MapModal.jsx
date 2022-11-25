// adapted from https://github.com/trananhtuat/react-modal

import { useEffect, useRef } from 'react';
import './modal.scss';
import PropTypes from 'prop-types';

export default function MapModal(props) {
    const modalState = props.toggle;
    const closeModal = props.action;

    return (
        <div className={`${"container"} ${modalState ? "active" : ''}`}>
            <div className="modal">
                Modal content
                <div className="close" onClick={closeModal}>x</div>
            </div>
        </div>
    );
};