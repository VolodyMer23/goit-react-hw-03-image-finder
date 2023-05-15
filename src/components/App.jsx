import { Component } from 'react';
import fetchImages from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImage: null,
    alt: null,
    status: 'idle',
    error: null,
  };

  totalHits = null;
  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const imagesData = await fetchImages(searchQuery, page);
        console.log(imagesData);
        this.totalHits = imagesData.total;
        const imageHits = imagesData.hits;
        if (!imageHits.length) {
          toast.warning('No images were found, try something else');
        }
        this.setState(({ images }) => ({
          images: [...images, ...imageHits],
          status: 'resolved',
        }));

        if (page > 1) {
        }
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  onFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      images: [],
      page: 1,
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, error, images, selectedImage, alt } = this.state;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.onFormSubmit} />
        <ToastContainer autoClose={2000} theme="colored" pauseOnHover />
        {status === 'pending' && <Loader />}
        {error && (
          <h1 style={{ color: 'grey', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        <ImageGallery
          images={images}
          selectedImage={this.handleSelectedImage}
        ></ImageGallery>
        {images.length > 0 && images.length !== this.totalHits && (
          <LoadMoreButton onClick={this.loadMore} />
        )}

        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
      </AppContainer>
    );
  }
}
