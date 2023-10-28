import React, { useEffect, useState } from 'react'

import { Box,styled,Button } from "@mui/material";





const StyledButton=styled(Button)`
display:flex;
margin-left:auto;
background:#fb641b;
color:white;
width:250px;
height:51px;
border-radius:2px;
`



function Paybuy({cartItems}) {
  const [price,setPrice] = useState(0);
  const [discount, setDiscount]=useState(0);

  useEffect(()=> {
    totalAmount();
  },[cartItems]);

  const totalAmount=()=>{
    let price=0, discount=0;
    cartItems.map(item => {
      price+= item.price.mrp;
      discount+=(item.price.mrp - item.price.cost);
    });
    setPrice(price);
    setDiscount(discount);
  }


  const handleSubmit = (e)=>{
    

    
    var options = {
    key: "rzp_test_3c0rgFHcYyF1no",
    key_secret:"1k7W0AYA2KfLrs368KEeyMXk",
    amount: (price -discount + 40) *100,
    currency:"INR",
    name:"STARTUP_PROJECTS",
    description:"for testing purpose",
    handler: async function(response){   


        alert(response.razorpay_payment_id);
        alert("yo")
    },
    prefill: {
        name:"harry",
        email:"kolih453@gmail.com",
        contact:"9326580920"
    },
    notes:{
        address:"Razorpay Corporate office"
    },
    theme: {
        color:"#3399cc"
    }
    };
    var pay = new window.Razorpay(options);
    pay.open();

  }

  return (
   
        
    <StyledButton ><Button onClick={handleSubmit}
    
    
    >Place </Button></StyledButton>
                        
        
   
  )
}

export default Paybuy
