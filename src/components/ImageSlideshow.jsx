'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '../../public/images/slideshow/burger.jpg';
import curryImg from '../../public/images/slideshow/curry.jpg';
import dumplingsImg from '../../public/images/slideshow/dumplings.jpg';
import macncheeseImg from '../../public/images/slideshow/macncheese.jpg';
import pizzaImg from '../../public/images/slideshow/pizza.jpg';
import schnitzelImg from '../../public/images/slideshow/schnitzel.jpg';
import tomatoSaladImg from '../../public/images/slideshow/tomato-salad.jpg';
import classes from './ImageSlideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
