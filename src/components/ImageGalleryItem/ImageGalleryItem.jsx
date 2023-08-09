import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onModalOpen,
  imageDescription,
}) => {
  return (
    <li className={style.galleryItem}>
      <img
        className={style.image}
        src={webformatURL}
        alt={imageDescription}
        onClick={() => {
          onModalOpen(largeImageURL, imageDescription);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  imageDescription: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
