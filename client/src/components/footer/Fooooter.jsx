// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Button, styled } from '@mui/material';

// function Fooooter() {
//   const Wrapper = styled('section')`
//   .contact-short{
//     max-width: 60vw;
//     margin:auto;
//     padding: 5rem 10 rem;
//     ${'' /* background-color: ${({theme}) => theme.colors.bg}; */}
//     border-radius: 1rem;
//     ${'' /* box-shadow: ${({ theme }) => theme.colors.shadowSupport}; */}
//     ${'' /* transform: translateY(50%); */}

//     .grid div:last-child {
//       justify-self: end;
//       align-self: center;
//     }
//   }
//   `;

//   const StyledButton = styled(Button)`
//     background-color: blue;
//     color: white;
//   `;

//   return (
//     <Wrapper>
//       <section className="contact-short">
//         <div className="grid grid-two-column">
//           <div>
//             <h3>Ready to get started</h3>
//             <h3>Talk to us today</h3>
//           </div>
//           <div>
//             <NavLink>
//               <StyledButton>Buy Now</StyledButton>
//             </NavLink>
//           </div>
          
//         </div>
//       </section>

//       <footer>
//         <div className='container grid grid-four-column'>
//             <div className='footer-about'>
//               <h3>yash jagdale</h3>
//               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             </div>

//             <div className='footer-about'>
//               <h3>yash jagdale</h3>
//               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             </div>
//         </div>
//       </footer>
//     </Wrapper>
//   );
// }

// export default Fooooter;




import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Retail-Snap company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Mumbai, India
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: Retailsnap@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +91-7045453432
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              Retail Snap
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}