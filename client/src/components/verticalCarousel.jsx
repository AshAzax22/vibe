import React from "react";
import PropTypes from "prop-types";
import styles from "./css/verticalCarousel.module.css";

const VerticalCarousel = ({ images, direction }) => {
  // Duplicate the images array to create an infinite loop effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className={styles.carouselContainer}>
      <div
        className={`${styles.carouselColumn} ${
          direction === "down" ? styles.scrollDown : ""
        }`}
      >
        {duplicatedImages.map((src, index) => (
          <div key={index} className={styles.carouselItem}>
            <img src={src} alt={`Carousel item ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

VerticalCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  direction: PropTypes.oneOf(["up", "down"]).isRequired,
};

export default VerticalCarousel;
