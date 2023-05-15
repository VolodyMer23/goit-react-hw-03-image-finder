import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    open: true,
  };
  componentDidMount() {
    this.setState({ open: true });
    window.addEventListener('keydown', this.handleKeyDown);
    if (this.state.open) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.setState({ open: false });
    document.body.style.overflow = 'unset';
  }

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage, tags } = this.props;

    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalContainer>
          <Img src={selectedImage} alt={tags} />
        </ModalContainer>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
