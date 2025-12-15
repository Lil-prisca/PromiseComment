import React from "react";
import "../styles/gallery.css";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import pic5 from "../assets/pic5.jpg";
import pic6 from "../assets/pic6.jpg";
// import pic7 from "../assets/pic7.jpg";
import video1 from "../assets/VID-20251215-WA0016.mp4";
import video2 from "../assets/VID-20251215-WA0024.mp4";

const Gallery = () => {
  return (
    <>
      <div className="gallery-grid">
        <div className="gallery-item tall">
          <img src={pic1} alt="" />
        </div>
        <div className="gallery-item ">
          <video
            controls
            muted
            autoplay
            loop
            playsInline
            preload="metadata"
            width="100%"
            height="100%"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="gallery-item tall">
          <img src={pic2} alt="" />
        </div>
        <div className="gallery-item ">
          <video
            controls
            muted
            autoplay
            loop
            playsInline
            preload="metadata"
            width="100%"
            height="100%"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="gallery-item tall">
          <img src={pic4} alt="" />
        </div>
        <div className="gallery-item tall">
          <img src={pic5} alt="" />
        </div>
        <div className="gallery-item ">
          <img src={pic6} alt="" />
        </div>
        <div className="gallery-item">
          <img src={pic3} alt="" />
        </div>
        {/* <div className="gallery-item"></div> */}
      </div>
    </>
  );
};
export default Gallery;
