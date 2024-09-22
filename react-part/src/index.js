import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from './Components/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import AddProduct from './Components/AddProduct';
import LikedProducts from './Components/LikedProducts';
import ProductDetails from './Components/ProductDetails';
import MyUploads from './Components/MyUploads';
import CategoryPage from './Components/CategoryPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/category/:catName",
    element: (
      <CategoryPage/>
    ),
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login/>)
  },
  {
    path: "/Signup",
    element: (<Signup/>)
  },
  {
    path: "/add-product",
    element: (<AddProduct/>)
  },
  {
    path: "/liked-products",
    element: (<LikedProducts/>)
  },
  {
    path: "/product/:productId",
    element: (<ProductDetails/>)
  },
  {
    path: "/my-uploads",
    element: (<MyUploads/>)
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


