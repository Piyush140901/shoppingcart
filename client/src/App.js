import Header from './components/header/Header';
import Home from './components/home/Home';
import DetailView from './components/details/DetailView';
import { Box } from '@mui/material';
import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Payme from './components/payment/Payme';
import Paybuy from './components/payment/Paybuy';



      function App() {
          return (
            <DataProvider>
              <BrowserRouter>
                <Header />
                <Box style={{ marginTop: 54 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<DetailView />} />
                    <Route path='/cart' element={<Cart/>} />
                    <Route path='/payment' element={<Payme />} />
                    <Route path='/paybuy' element={<Paybuy />} />
                  </Routes>
                </Box>
              </BrowserRouter>
            </DataProvider>
          );
        }
        
        export default App;
        







        
// import Header from './components/header/Header';
// import Home from './components/home/Home';
// import DetailView from './components/details/DetailView';
// import { Box } from '@mui/material';
// import DataProvider from './context/DataProvider';

// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// function App() {
//   return (
//     <DataProvider>
//       <Router>
//         <Header/>
//           <Box style={{marginTop:54}}>
//             <Routes>
//                 <Home/>
//             </Routes>
//           </Box>
//       </Router>
//     </DataProvider>
//   );
// }

// export default App;

