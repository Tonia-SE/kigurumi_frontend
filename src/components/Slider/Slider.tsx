import React, { useState } from 'react';
import { backendServer, sliderInterval } from '../../consts';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Spinner } from '../Spinner/Spinner';

export const KigurumiSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const isLoader = useSelector((state: ApplicationState) => state.loader.isLoading);
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return isLoader ? (
    <Spinner />
  ) : (
    <Carousel indicators={false} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{ maxHeight: '514px' }} key={'1'} interval={sliderInterval}>
        <img style={{ maxHeight: '514px' }} className="d-block w-100" src={`${backendServer}/static/images/slider__1.jpg`} />
      </Carousel.Item>
      <Carousel.Item style={{ maxHeight: '514px' }} key={'2'} interval={sliderInterval}>
        <img style={{ maxHeight: '514px' }} className="d-block w-100" src={`${backendServer}/static/images/slider__2.jpg`} />
      </Carousel.Item>
      <Carousel.Item style={{ maxHeight: '514px' }} key={'3'} interval={sliderInterval}>
        <img style={{ maxHeight: '514px' }} className="d-block w-100" src={`${backendServer}/static/images/slider__3.jpg`} />
      </Carousel.Item>
      <Carousel.Item style={{ maxHeight: '514px' }} key={'4'} interval={sliderInterval}>
        <img style={{ maxHeight: '514px' }} className="d-block w-100" src={`${backendServer}/static/images/slider__4.jpg`} />
      </Carousel.Item>
    </Carousel>
  );
};
