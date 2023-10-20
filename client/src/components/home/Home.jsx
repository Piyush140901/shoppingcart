import React, { Fragment, useEffect } from 'react'
import NavBar from './NavBar'
import Banner from './Banner'
import {Box,  styled } from '@mui/material';
import { getProducts } from '../../redux/actions/productAction';
import {useDispatch,useSelector} from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';
import Fooooter from '../footer/Fooooter';

const Component =styled(Box)`
padding: 10px 10px;
background:#F2F2F2;

`

function Home() {

  // const getProducts=useSelector(state =>state.getProducts)
  // const {products} = getProducts;
  

  const {products}=useSelector(state =>state.getProducts)
  

  console.log(products);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      <NavBar/>
      <Component>
        <Banner/>
        <MidSlide products={products} title="Deal of the Day" timer={true}/>
        <MidSection/>
        <Slide products={products} title="Discounts for You" timer={false}/>
        <Slide products={products} title="Suggesting Items" timer={false}/>
        <Slide products={products} title="Top Selection" timer={false}/>
        <Fooooter/>
        
      </Component>
      
    </>
  )
}

export default Home
