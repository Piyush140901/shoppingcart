// import { Box, Grid } from '@mui/material'
// import React from 'react'
// import {imageURL} from '../../constants/data';
// import styled from '@emotion/styled';



// const Wrapper =styled(Grid)`
// margin-top:11px;
// justify-content: space-between;
// `

// const Image=styled('img')(({ theme })=>({
//     marginTop:15,
//     width:'100%',
//     height:350,
//     display:'flex',
//     justifyContent:'space-between',
//     [theme.breakpoints.down('md')]:{
//         objectFit:'cover',
//         height:120
//     }
// }));

// function MidSection() {
//     const url = 'https://www.shopavenue.co.za/wp-content/uploads/2018/08/banner.jpg';
//   return (
//     <>
//         <Wrapper lg={12} sm={12} md={12} xs={12} container>
//         {
//            imageURL.map(image=>(
//             <Grid item lg={4} md={4} sm={12} xs={12}>
//             <img src={image} alt="image" style={{width:'100%'}} />
//             </Grid>
//            ))

//         }
//     </Wrapper>
//     <Image src={url} alt="Covid" />
//     </>
    
//   )
// }

// export default MidSection



import {  Grid } from '@mui/material';
import React from 'react';
import { imageURL } from '../../constants/data';
import styled from '@emotion/styled';
// import { Theme } from "@mui/system";

const Wrapper = styled(Grid)`
  margin-top: 11px;
  justify-content: space-between;
`;

const Image = styled('img')(({ theme }) => ({
  marginTop: 15,
  width: '100%',
  height: 400,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    objectFit: 'cover',
    height: 120,
  },
}));

function MidSection() {
  const url = 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/1760/innergigabyteimages/banner3.jpg';

  return (
    <>
      <Wrapper lg={12} sm={12} md={12} xs={12} container>
        {imageURL.map((image) => (
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <img src={image} alt="image" style={{ width: '95%' }} />
          </Grid>
        ))}
      </Wrapper>
      <Image src={url} alt="Covid" />
    </>
  );
}

export default MidSection;
