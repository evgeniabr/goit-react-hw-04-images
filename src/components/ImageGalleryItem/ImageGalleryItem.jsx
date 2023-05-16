import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ img: { webformatURL, tags } }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => {}}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
};
