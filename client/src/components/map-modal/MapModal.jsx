// adapted from https://github.com/trananhtuat/react-modal

import { useEffect, useRef } from 'react';
import './modal.css';
import PropTypes from 'prop-types';

const MapModal = props => {
    const modalRef = useRef();

    useEffect(() => {
        const tapOutsideContent = (e) => {
            if (e.target === modalRef.current) {
                props.setShow(false);
            }
        };
        window.addEventListener('click', tapOutsideContent);
        return () => {
            window.removeEventListener('click', tapOutsideContent);
        };
    }, [props]);

    return 
    <div ref={modalRef} className={`modal ${props.show ? 'active' : ''}`}>
        <div className="modal_content">
            {
                !props.hideCloseButton && <span onClick={() => props.setShow(false)} className="modal__close">
                    &times;
                </span>
            }
            {props.children}
        </div>
    </div>;
};

const MapModalHeader = props => {
    return <div className="map_modal_header">
        {props.children};
    </div>
};

const MapModalBody = props => {
    return <div className="map_modal_body">
        {props.children};
    </div>
};

const MapModalFooter = props => {
    return <div className="map_modal_footer">
        {props.children};
    </div>
};

export {MapModal, MapModalBody, MapModalFooter, MapModalHeader};