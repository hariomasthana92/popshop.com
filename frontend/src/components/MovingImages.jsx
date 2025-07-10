import React from 'react';
import './MovingImages.css';

const images = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
  "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg"
];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      <div className="slider-track">
        {images.concat(images).map((src, index) => (
          <img key={index} src={require(`../pages/assets/${src}`)} alt={`slide-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
