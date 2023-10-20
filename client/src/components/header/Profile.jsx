import { Box,Typography ,MenuItem,Menu,styled} from '@mui/material'
import React, { useState } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Component=styled(Menu)`
margin-top: 5px;
`;

const Logout=styled(Typography)`
font-size: 14px;
margin-left:18px;
`

function Profile({account,setAccount}) {
  // const open = Boolean(anchorEl);

  const [Open,setOpen] = useState(false);

  const handleClick=(event)=>{
    setOpen(event.currentTarget);
  }

  const handleClose=()=>{
    setOpen(false);
  }

  const logoutUser=()=>{
    setAccount('')
  }

  return (
    <>
    <Box onClick={handleClick}>
    <Typography  style={{marginTop:2, cursor:'pointer'}}>{account}</Typography></Box>
    <Component
        anchorEl={Open}
        open={Boolean(Open)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClose(); logoutUser();} }>
          <PowerSettingsNewIcon color='primary' fontSize='small'/>
          <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    
      
    </>
  )
}

export default Profile;
