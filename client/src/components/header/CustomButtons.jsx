import { Box , Button, Typography,Badge,styled} from '@mui/material'
import React from 'react'
import { ShoppingCart} from '@mui/icons-material';
import LoginDailog from '../login/LoginDailog';
import { useState,useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)(({theme})=>({

display:'flex',
margin: '0 3% 0 auto',
'& > *': {
    marginRight: '40px !important',
    fontSize:16,
    alignItems:'center'
},
[theme.breakpoints.down('md')]:{
  display:'block'
}

}));

const Container = styled(Link)(({theme})=> ({
  textDecoration:'none',
  color:'inherit',
  display:'flex',
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}));



const LoginButton=styled(Button)`
color: #2874f0;
background: #FFF;
text-transform:none;
padding: 5px 47px;

border-radius: 2px;
box-shadow:none;
font-weight:600;
height:32px;
`

function CustomButtons() {

  const [open ,setOpen] = useState(false);

  const{account, setAccount} = useContext(DataContext);

  const {cartItems}= useSelector(state => state.cart)

  const openDailog=()=>{
    setOpen(true);
  }

  return (
    <Wrapper>
    {
      account ? <Profile account={account} setAccount={setAccount}/>:

      <LoginButton variant="contained" onClick={()=> openDailog()}>Login</LoginButton>
    }
        

        {/* <Typography style={{marginTop:3, width:135}}>Become a Seller</Typography> */}
        <Typography style={{marginTop:3}}>More</Typography>

        <Container to="/cart">
            <Badge badgeContent={cartItems?.length} color='secondary'>
              <ShoppingCart/>
            </Badge>
            <Typography style={{marginLeft:10}}>Cart</Typography>
        </Container>
        <LoginDailog open={open} setOpen={setOpen}/>

    </Wrapper>
  )
}


export default CustomButtons
