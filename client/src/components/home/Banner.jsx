import React from 'react'
import Carousel from "react-multi-carousel";
import { bannerData } from '../../constants/data';  
import {styled } from '@mui/material';
import "react-multi-carousel/lib/styles.css";

import { useTheme } from '@mui/material/styles'; 


const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  [theme.breakpoints.down('md')]: { // Use the theme object from useTheme
    objectFit: 'cover',
    height: 180,
  },
}));


function Banner() {
  const theme = useTheme();


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <Carousel responsive={responsive}
    swipeable={false}
    draggable={false}
    keyBoardControl={true}
    slidesToSlide={1}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={2000}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    containerClass="carousel-container"
    >
    {
        bannerData.map(data=>(
            <Image src={data.url} alt="banner" />
        ))
    }
        
    </Carousel>
  )
}

export default Banner


// https://images.novatech.co.uk/productpagebanners/BUNDLE-BANNER-1.jpg