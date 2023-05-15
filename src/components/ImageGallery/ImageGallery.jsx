import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { ImageList } from './ImageGallery.styled';
export default function ImageGallery({ images, selectedImage }) {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags, largeImageURL}) => (
        <ImageGalleryItem
          key={id}
          imageUrl={webformatURL}
          tags={tags}
          selectedImage={() => selectedImage(largeImageURL, tags)}
        />
      ))}
    </ImageList>
  );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
    selectedImage: PropTypes.func,
  };