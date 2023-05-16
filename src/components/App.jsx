import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetch } from './ApiService/ApiService';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImg, setTotalImg] = useState('');
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    async function fetchImages() {
      try {
        const data = await fetch(query, page);
        setImages(prewImages => [...prewImages, ...data.hits]);
        setTotalImg(data.totalHits);

        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchImages();
  }, [query, page]);

  const onSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };



  const openModal = event => {
    event.preventDefault();
    setShowModal(true);
    setModalImg(event.target);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showMoreButton = totalImg > images.length;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && (
        <ImageGallery onClick={openModal}>
          {images.map(image => (
            <ImageGalleryItem key={image.id} img={image} />
          ))}
        </ImageGallery>
      )}

      {isLoading && <Loader />}
      {showMoreButton && <Button incrementPage={incrementPage} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImg.src} alt="#" />
        </Modal>
      )}
      {error && <h2>No results found</h2>}
    </div>
  );
}
