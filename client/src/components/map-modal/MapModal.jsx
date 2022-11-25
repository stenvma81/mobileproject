import './modal.scss';
import logo from '../header/images/nokia.jpg';
import ImageMarker from 'react-image-marker';

export default function MapModal(props) {
    const modalState = props.toggle;
    const closeModal = props.action;
    const areaMarker = props.areamarker;
    const markers = props.markers;
    const setMarkers = props.setMarkers;

    return (
        <div className={`${"modal_container"} ${modalState ? "active" : ''}`}>
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