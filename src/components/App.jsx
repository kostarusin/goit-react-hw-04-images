import { useState, useEffect } from 'react';
import { fatchImages } from './service/fatch-service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalIsOpen] = useState(false);
  const [imageModal, setimageModal] = useState('');
  const [imageDescription, setimageDescription] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const perPage = 12;

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fatchImages(query, page, perPage)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setImages(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(setLoading(false));
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setShowBtn(false);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModalOpen = (largeImageURL, imageDescription) => {
    setimageModal(largeImageURL);
    setimageDescription(imageDescription);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setimageModal('');
    setimageDescription('');
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} onModalOpen={handleModalOpen} />
      {showBtn && <Button onLoadMore={handleLoadMore} />}
      {isEmpty && (
        <p
          style={{
            fontSize: 'xx-large',
            textAlign: 'center',
          }}
        >
          Sorry. There are no images ... 😭
        </p>
      )}
      {error && (
        <p
          style={{
            fontSize: 'xx-large',
            textAlign: 'center',
          }}
        >
          Sorry. {error} 😭
        </p>
      )}
      {loading && <Loader />}
      {modalOpen && (
        <Modal
          image={imageModal}
          imageDescription={imageDescription}
          onModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
