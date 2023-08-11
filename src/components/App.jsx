import { Component } from 'react';
import { fatchImages } from './service/fatch-service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import {} from 'module';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    modalOpen: false,
    imageModal: '',
    imageDescription: '',
    isEmpty: false,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      const perPage = 12;
      fatchImages(query, page, perPage)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: this.state.page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ loading: false }));
    }
  }

  handleSearch = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isEmpty: false,
      showBtn: false,
      error: null,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = (largeImageURL, imageDescription) => {
    this.setState({
      imageModal: largeImageURL,
      imageDescription: imageDescription,
      modalOpen: true,
    });
  };

  handleModalClose = event => {
    this.setState({ imageModal: '', imageDescription: '', modalOpen: false });
  };

  render() {
    const {
      images,
      modalOpen,
      imageModal,
      imageDescription,
      showBtn,
      error,
      isEmpty,
      loading,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onModalOpen={this.handleModalOpen} />
        {showBtn && <Button onLoadMore={this.handleLoadMore} />}
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
            onModalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
