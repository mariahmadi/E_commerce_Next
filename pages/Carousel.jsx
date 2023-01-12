import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ShowCarousel() {
    return (

        <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
            <div >
                <img src={`/download.jpeg`}  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" />
                <p className="legend">Bear 1</p>
            </div>
            <div>
                <img src={`/dowwnload (1).jpg `}  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"  />
                <p className="legend">Bear 2</p>
            </div>
            <div>
                <img src={`/download (1).jpg`}  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"  />
                <p className="legend">Bear 3</p>
            </div>
        </Carousel>
    )
}