import React from 'react';
// import ReactDom from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Redux Toolkit
import { Provider } from 'react-redux';
import store from './store.js';

// Component
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

// Screens
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import CreateCategory from './screens/category/CreateCategory.jsx';
import EditCategory from './screens/category/EditCategory.jsx';
import FactScreen from './screens/facts/FactScreen.jsx';
import EditFact from './screens/facts/EditFact.jsx';
import CreateFact from './screens/facts/CreateFact.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/facts/:category" element={<FactScreen />} />

      {/*Private Routes*/}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/fact/:category" element={<CreateFact />} />
        <Route path="/fact/:category/:id" element={<EditFact />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/category/create" element={<CreateCategory />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
