// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getProductDetails } from '../../redux/actions/productAction';
// import {Box} from '@mui/material';
// import { Typography } from '@material-ui/core';
// import ActionItem from './ActionItem';


// function DetailView() {

//   const dispatch = useDispatch();
//   const {id} = useParams();

//   const {loading,product}=useSelector(state => state.getProductDetails);

//   useEffect(() => {
//     if(product && id !== product.id)
//       dispatch(getProductDetails(id))
//   }, [dispatch, id, product,loading])

// console.log(product);

//   return (
//    <Box>
//      {
//         product && Object.keys(product).length &&
       
//        <Box>
//           <Box>
//             {/* <ActionItem product={product}/> */}
//           </Box>
//           <Box>
//             <Typography>{product.title.longTitle}</Typography>
//           </Box>
//        </Box>
//      }
//    </Box>
//   )
// }

// return (
//   <Box>
//     {loading ? (
//       <Typography>Loading...</Typography>
//     ) : (
//       product && Object.keys(product).length && (
//         <Box>
//           <Box>
//             <ActionItem product={product}/>
//           </Box>
//           <Box>
//             <Typography>{product.title.longTitle}</Typography>
//           </Box>
//         </Box>
//       )
//     )}
//   </Box>
// );
//       }
// export default DetailView;




// #################



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productAction';
import { Box, Typography, Grid,styled } from '@mui/material';
import ActionItem from './ActionItem';

import ProductDetail from './ProductDetail';
import Fooooter from '../footer/Fooooter';
// import {LocalOffer as Badge} from '@mui/icons-material';

const Component= styled(Box)`
  background:#F2F2F2;
  margin-top: 55px;
;`

const Container= styled(Grid)(({ theme})=> ({
  background:'#FFFFFF',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin:0
  }
}))
const RightContainer=styled(Grid)`
margin-top:50px;
padding-left:200px;
`





function DetailView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector(state => state.getProductDetails);

  

  useEffect(() => {
    if (product && id !== product.id)
      dispatch(getProductDetails(id));
  }, [dispatch, id, product, loading]);

  return (
    <Component>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        product && Object.keys(product).length && (
          <Container container>
            <Grid item lg={4} md={4} sm={8} xs={12}>
              <ActionItem product={product} />
            </Grid>
            <RightContainer item lg={8} md={8} sm={8} xs={12}>
                <ProductDetail product={product} />
            </RightContainer>
            <div style={{paddingLeft:300}}>
            <Fooooter/>
          </div>
          </Container>
        
        )
      )}
    </Component>
  );
}

export default DetailView;
