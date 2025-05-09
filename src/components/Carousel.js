import React from 'react';
import './Carousel.css';

const Carousel = () => {
  return (
    <div className="w-75 mx-auto">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="images/image4.jpg"
              className="d-block w-100 carousel-img"
              alt="The Provost"
            />
            <div className="carousel-caption">
              <h5>The Sahara Desert, the Great Symbol of the Sahara Journal</h5>
              <p>The Desert</p>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="images/image5.jpg"
              className="d-block w-100 carousel-img"
              alt="The Sahara Journal"
            />
            <div className="carousel-caption">
              <h5>The Camel in the Sahara</h5>
              <p>The Great Sahara Internation Journal of Teacher Education</p>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="images/image3.jpg"
              className="d-block w-100 carousel-img"
              alt="The Sahara Journal"
            />
            <div className="carousel-caption">
            <h5>The Sahara International Journal of Teacher Education</h5>
            <p>The Sahara Journal</p>
              
            </div>
          </div>



          {/* Additional Slides */}
          {/* Slide 3 to Slide 11 go here... */}
          {/* Copy the structure of Slide 1 and Slide 2 for the remaining slides */}

        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;