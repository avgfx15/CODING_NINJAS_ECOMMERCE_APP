import React, { useState } from "react";
import { NavLink } from "react-router";

const images = [
  "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
  "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
  "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
  "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
];
const image1 =
  "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="carousel w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="carousel-item w-full flex-shrink-0">
          <img src={image1} className="w-full" alt={`image1`} />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
