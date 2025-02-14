
import React from 'react'
import Slider from 'react-slick';
import { Image } from 'antd';

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="1300px" height="450px"/>
                )
            })}
        </Slider>
    )
}

export default SliderComponent