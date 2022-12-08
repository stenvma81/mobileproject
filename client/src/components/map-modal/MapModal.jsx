import './modal.scss';
import ImageMarker from 'react-image-marker';
import { MdClose } from 'react-icons/md';

export default function MapModal(props) {
    const modalState = props.toggle;
    const closeModal = props.action;
    const markers = props.markers;
    const setMarkers = props.setMarkers;
    const map = require('./images/nokia_kartta.png');

    return (
        <div className={`${"modal_container"} ${modalState ? "active" : ''}`}>
            <div className="modal">
                <ImageMarker
                    src={map}
                    markers={markers}
                    onAddMarker={(marker) => setMarkers([...markers.splice(0, marker), marker])}
                />
                <MdClose className="close" onClick={closeModal} color="black"/>
            </div>
        </div>
    );
};