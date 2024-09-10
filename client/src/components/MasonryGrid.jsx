import VerticalCarousel from "./verticalCarousel";
import styles from "./css/masonryGrid.module.css";

// Import images
import image1 from "./images/image 2.jpg";
import image2 from "./images/image 3.jpg";
import image3 from "./images/image 4.jpg";
import image4 from "./images/image 5.jpg";
import image5 from "./images/image 6.jpg";
import image6 from "./images/image 7.jpg";
import image7 from "./images/image 8.jpg";
import image8 from "./images/image 9.jpg";
import image9 from "./images/image 10.jpg";
import image10 from "./images/image 11.jpg";
import image11 from "./images/image 12.jpg";
import image12 from "./images/image 13.jpg";
import image13 from "./images/image 14.jpg";
import image14 from "./images/image 15.jpg";
import image15 from "./images/image 16.jpg";
import image16 from "./images/image 17.jpg";
import image17 from "./images/image 18.jpg";
import image18 from "./images/image 19.jpg";
import image19 from "./images/image 20.jpg";
import image20 from "./images/image 21.jpg";
import image21 from "./images/image 22.jpg";
import image22 from "./images/image 23.jpg";
import image23 from "./images/image 24.jpg";
import image24 from "./images/image 25.jpg";

// Add more image imports as needed

// Example images array
const images1 = [image1, image7, image23, image4, image5, image8, image24];
const images2 = [image2, image11, image23, image19, image21, image22, image23];
const images3 = [image3, image9, image18, image17, image16, image7, image15];
const images4 = [image4, image10, image11, image12, image14, image13, image14];
const images5 = [image5, image6, image7, image8, image9];

const MasonryGrid = () => {
  return (
    <div className={styles.masonryGrid}>
      <VerticalCarousel images={images1} direction="down" />
      <VerticalCarousel images={images3} direction="up" />
      <VerticalCarousel images={images2} direction="down" />
      <VerticalCarousel images={images4} direction="up" />
      <VerticalCarousel images={images5} direction="down" />
    </div>
  );
};

export default MasonryGrid;
