// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
// import routes from './router'
import './index.css';

import reportWebVitals from './reportWebVitals';

import { AppRouteStoreContainer } from './StoreAppRouter'
import { AppDataStoreContainer } from './StoreAppData'
import ViewsManager from './ViewsManager';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter >
    <AppDataStoreContainer>

      <AppRouteStoreContainer>
        <Routes >
          {/* {
            routes.map((data, index) => (
              <Route exact={true} path={data.path} element={data.component} key={index} />
            ))
          } */}
                  <Route exact path='/' element={<ViewsManager />} />

        </Routes>
        {/* <ViewsManager /> */}
      </AppRouteStoreContainer>
    </AppDataStoreContainer>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
