import React, { useState } from 'react';
import {  ButtonGroup, Button, styled } from '@mui/material';
import { useQuantContext } from './QuantContext';


const Component= styled(ButtonGroup)`
margin-top:30px;
`;

const StyledButton = styled(Button)`
border-radius: 50%;
`


function GroupedButton() {
  const { quant, setQuant } = useQuantContext();


  const addition=()=>{
    setQuant(quant => quant + 1);
  
  }
 
  return (
    <Component>
      <StyledButton>-</StyledButton>
      <Button disabled>{quant}</Button>
      <StyledButton onClick={addition}>+</StyledButton>
    </Component>
  )
}

export default GroupedButton;
