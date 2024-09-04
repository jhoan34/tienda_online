import React, { useState } from "react";
import "./slider.css"; // Ensure you have your CSS file for styles

export const Slider = ({ array }) => {
  const [index, setIndex] = useState(0); // State to keep track of the current index

  const handlePrevious = () => {
    if (index === 0) {
      // If at the first image, go to the last one
      setIndex(array.length - 1);
    } else {
      // Go to the previous index
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index === array.length - 1) {
      // If at the last image, go back to the first one
      setIndex(0);
    } else {
      // Go to the next index
      setIndex(index + 1);
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-button" id="previous" onClick={handlePrevious}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <div className="slider-image">
        <img src={array[index]} alt="slider" />
      </div>
      <button className="slider-button" id="next" onClick={handleNext}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
};
