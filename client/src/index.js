// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// // import { ThemeProvider, createTheme } from '@mui/material';
// // import { CacheProvider } from '@emotion/react';
// // import createCache from '@emotion/cache';
// // import MidSection from './components/home/MidSection';
// // import MidSlide from './components/home/MidSlide';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   </Provider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();






// // Create an Emotion cache
// // const cache = createCache({ key: 'css', prepend: true });

// // // Define your theme (example)
// // const theme = createTheme({
// //   breakpoints: {
// //     values: {
// //       xs: 0,
// //       sm: 600,
// //       md: 960,
// //       lg: 1280,
// //       xl: 1920,
// //     },
// //   },
// // });

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <ThemeProvider theme={theme}>
// //       <CacheProvider value={cache}>
// //         <App />
// //         <MidSection/>
// //         <MidSlide/>
// //       </CacheProvider>
// //     </ThemeProvider>
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material'; // Add ThemeProvider and createTheme
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

// Define your theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}> {/* Wrap App with ThemeProvider */}
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
