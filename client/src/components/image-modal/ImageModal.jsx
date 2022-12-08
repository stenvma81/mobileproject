import './modal.scss';
import { MdClose } from 'react-icons/md';

export function ImageModal(props) {
    const modalState = props.toggle;
    const closeModal = props.action;
    const imageUrl = props.url;

    return (
        <div className={`${"modal_container"} ${modalState ? "active" : ''}`}>
            <div className="modal">
                <img className="image" src={imageUrl} />
                <MdClose className="close" onClick={closeModal} color="black"/>
            </div>
        </div>
    );
};