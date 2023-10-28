import React, { useState } from 'react'
import {AppBar , Toolbar, Box,Typography,IconButton,Drawer,List,ListItem,styled} from '@mui/material';
import {Menu} from '@mui/icons-material';
import myImage from '../Images/logg1.png';


// Import
import Search from './Search';
import CustomButtons from './CustomButtons';
import {Link} from 'react-router-dom';
// import { IconButton } from '@material-ui/core';

const StyledHeader=styled(AppBar)`
background:#2874f0;
height:55px;
`;

const Component=styled(Link)`
margin-left:9%;
line-height:0;
text-decoration:none;
color:inherit;
`

const SubHeading=styled(Typography)`
font-size:10px;
font-style:italic;
`

const PlusImage = styled('img')({
  width: 10,
  height:10,
  marginLeft: 4
})

const CustomButtonWrapper=styled(Box)(({ theme})=>({
  margin: '0 5% 0 auto',
  [theme.breakpoints.down('md')]:{
    display:'none'
  }
}));

const MenuButton=styled(IconButton)(({theme})=>({
    display:'none',
    [theme.breakpoints.down('md')]:{
      display:'block'
    }
}))

// const PlusImage = styled('img')({
//   width: 10,
//   height:10,
//   marginLeft: 4
// })





function Header() {

  // const logoURL = 'C:\\Users\\Yash\\Desktop\\AllProject\\FlipCart_React\\mern-stack\\client\\src\\components\\Images\\pic.png';
  // const subURL = '';
  // <img src={myImage} alt="My Image" />
  


  // Drawer

  const[open, setOpen] =useState(false);

  const handleOpen=()=>{
    setOpen(true);
  }

  const handleClose=()=>{
    setOpen(false);
  }

  const list=()=>(
    <Box style={{width:200}} onClick={handleClose}>
      <List>
        <ListItem button>
          <CustomButtons/>
        </ListItem>
      </List>
    </Box>
  )




  return (
    <StyledHeader>
      <Toolbar style={{ minHeight:55}}>
      <MenuButton color='inherit'  onClick={handleOpen}>
          <Menu/>
      </MenuButton>

      <Drawer open={open} onClose={handleClose}>
          {list()}
      </Drawer>


        <Component to='/'>
            <img src={myImage} alt="logo" style={{ width:140  }}/>
              <Box style={{display: 'flex'}}>
                {/* <SubHeading>Explore&nbsp;
                  <Box component="span" style={{color: '#FFE500'}}> Plus</Box>
                </SubHeading> */}

                  {/* <PlusImage src={subURL} alt="sub-logo" /> */}
              </Box>
          </Component>

          <Search/>

          <CustomButtonWrapper>
            <CustomButtons/>
          </CustomButtonWrapper>
          
      </Toolbar>
    </StyledHeader>
  )
}

export default Header;
