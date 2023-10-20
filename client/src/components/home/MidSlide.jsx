import { Box } from '@mui/material';
import React from 'react';
import Slide from './Slide';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';


// CSS

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '81%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  background: '#FFFFFF',
  padding: 5,
  paddingTop:15,
  marginTop: 12,
  marginLeft: 10,
  width: '39%',
  height:325,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

function MidSlide({ products, timer, title }) {
  const adURL = 'https://img.freepik.com/premium-vector/discount-special-offer-word-concept-vector-illustration-with-lines-modern-futuristic-3d-style_737072-268.jpg?w=996';
  
  const theme = useTheme(); // Access the theme object using useTheme

  return (
    <Component>
      <LeftComponent theme={theme}>
        <Slide products={products} title={title} timer={timer} />
      </LeftComponent>
      <RightComponent theme={theme}>
        <img src={adURL} alt="ad" style={{ width: 245,height:314 }} />
      </RightComponent>
    </Component>
  );
}

export default MidSlide;










// import { Box } from '@mui/material';
// import React from 'react';
// import Slide from './Slide';
// import styled from '@emotion/styled';

// // CSS

// const Component = styled(Box)`
//   display: flex;
// `;

// const LeftComponent = styled(Box)(({ theme }) => ({
//   width: '83%',
//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//   },
// }));

// const RightComponent = styled(Box)(({ theme }) => ({
//   background: '#FFFFFF',
//   padding: 5,
//   marginTop: 10,
//   marginLeft: 10,
//   width: '17%',
//   textAlign: 'center',
//   [theme.breakpoints.down('md')]: {
//     display: 'none',
//   },
// }));

// function MidSlide({ products, timer, title }) {
//   const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
  
//   const theme = useTheme(); // Access the theme object using useTheme

//   return (
//     <Component>
//       <LeftComponent theme={theme}> {/* Pass theme prop to LeftComponent */}
//         <Slide products={products} title={title} timer={timer} />
//       </LeftComponent>
//       <RightComponent theme={theme}> {/* Pass theme prop to RightComponent */}
//         <img src={adURL} alt="ad" style={{ width: 217 }} />
//       </RightComponent>
//     </Component>
//   );
// }

// export default MidSlide;
