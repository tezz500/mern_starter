import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/index.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'

// eslint-disable-next-line
import 'admin-lte/dist/css/adminlte.min.css'
import $ from 'jquery';

import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js'

import {RouterProvider} from 'react-router-dom';
import router from './routes';

window.$ = window.jQuery = $;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
