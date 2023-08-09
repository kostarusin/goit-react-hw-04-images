import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onModalClose();
    }
  };

  render() {
    const { image, imageDescription } = this.props;
    return (
      <div className={style.overlay} onClick={this.handleOverlayClick}>
        <div className={style.modal}>
          <img src={image} alt={imageDescription} />
        </div>
      </div>
    );
  }
}

Modal.propsTypes = {
  image: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
