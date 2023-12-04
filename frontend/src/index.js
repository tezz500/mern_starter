import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.css';


import $ from 'jquery';
window.$ = window.jQuery = $;
import App from './components/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
import {RouterProvider} from 'react-router-dom';
import router from './routes';

root.render(
  <React.StrictMode>
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
