import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <ul className={style.imageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageDescription={image.tags}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGallery;
