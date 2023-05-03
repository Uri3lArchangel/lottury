import React from 'react';
import { Carousel } from 'antd';
import carousel from '../../../styles/misc/carousel.module.css'




const CarouselApp: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel style={{position:'absolute',height:'100vh',width:'100%',top:'0',zIndex:'1'}}>
      <div className={carousel.Container1}>
        <h3 >1</h3>
      </div>
      <div className={carousel.Container2}>
        <h3 >2</h3>
      </div>
      <div className={carousel.Container3}>
        <h3 >3</h3>
      </div>
      <div className={carousel.Container4}>
        <h3 >4</h3>
      </div>
    </Carousel>
  );
};

export default CarouselApp;
