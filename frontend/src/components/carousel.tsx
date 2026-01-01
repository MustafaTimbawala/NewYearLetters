import { useState } from "react";

interface Props {
  images: string[];
}

export default function Carousel({ images }: Props) {
  const [index, setIndex] = useState(0); 

  const increment = ()=>{ 
    setIndex((i) => Math.min(i + 1, images.length - 1)); 
  }; 
  const decrement = ()=>{ 
    setIndex((i) => Math.max(i - 1, 0))
  };

  return (
    <div className="carousel">
      <img src={images[index]} className="carousel-image" />

      <div className="carousel-controls">
        <button
          onClick={decrement}
          disabled={index === 0}
        >
          ‹
        </button>
        <button
          onClick={ increment}
          disabled={index === images.length - 1}
        >
          ›
        </button>
      </div>
    </div>
  );
}
