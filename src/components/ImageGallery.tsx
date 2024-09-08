import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_1280.jpg',
    thumbnail: 'https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_150.jpg',
  },
  {
    original: 'https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg',
    thumbnail: 'https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_150.jpg',
  },
  {
    original: 'https://cdn.pixabay.com/photo/2023/08/05/15/42/panda-8171354_1280.jpg',
    thumbnail: 'https://cdn.pixabay.com/photo/2023/08/05/15/42/panda-8171354_150.jpg',
  },
];





const imageGallery: React.FC = () => {
  return (
    <div>
      <h2>画像ギャラリー</h2>
      <ImageGallery items={images} />
    </div>
  );
};

export default imageGallery;
