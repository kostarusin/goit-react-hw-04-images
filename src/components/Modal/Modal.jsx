import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ image, imageDescription, onModalClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onModalClose();
    }
  };

  return (
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.modal}>
        <img src={image} alt={imageDescription} />
      </div>
    </div>
  );
};

Modal.propsTypes = {
  image: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
