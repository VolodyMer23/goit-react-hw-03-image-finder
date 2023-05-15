import styled from '@emotion/styled';

export const GalleryItem = styled.li`
  display: flex;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
  transition: transform 250ms;
  :hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
