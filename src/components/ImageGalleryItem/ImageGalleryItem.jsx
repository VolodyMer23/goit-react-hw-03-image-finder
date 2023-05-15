import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ imageUrl, tags, selectedImage }) {
  return (
    <GalleryItem>
      <Img src={imageUrl} alt={tags} onClick={selectedImage} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
