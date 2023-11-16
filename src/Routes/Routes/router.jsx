/* eslint-disable no-unused-vars */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Home from '../../components/Home/Home';
import Dashboard from '../../Layout/Dashboard/Dashboard/Dashboard';
import AllBuyer from '../../components/AllUser/AllBuyer';
import Error from '../../Error/Error';
import AddProduct from '../../components/AddProduct/AddProduct';
import MyProducts from '../../components/MyProducts/MyProducts';
import Shop from '../../components/Shop/Shop';
import AllShop from '../../components/Shop/AllShop/AllShop';
import Women from '../../components/Shop/Women/Women';
import Men from '../../components/Shop/Men/Men';
import Shoes from '../../components/Shop/Shoes/Shoes';
import Blogs from '../../components/Blogs/Blogs';
import Register from '../../components/Account/Register';
import Login from '../../components/Account/Login';
import AllSeller from '../../components/AllUser/AllSeller';
import Products from '../../components/Products/Products';
import AddBlogs from '../../components/Blogs/AddBlogs/AddBlogs';
import MyBlogs from '../../components/Blogs/myBlogs/MyBlogs';
import AllBlogs from '../../components/Blogs/AllBlogs/AllBlogs';
import Contact from '../../components/Contact/Contact';
import PrivateRouter from '../../Private/PrivateRouter';
import EmptyPage from '../../Layout/Dashboard/emptyPage';
import Cart from '../../components/Cart/Cart';
import AdminRouter from '../AdminRouter/AdminRouter';
import Kids from '../../components/Shop/Kids/Kids';
import Messages from '../../components/Messages/Messages';
import Orders from '../../components/Orders/Orders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <PrivateRouter><Shop></Shop></PrivateRouter>,
                children: [
                    {
                        path: '/shop/all',
                        element: <AllShop></AllShop>
                    },
                    {
                        path: '/shop/women',
                        element: <Women></Women>
                    },
                    {
                        path: '/shop/men',
                        element: <Men></Men>
                    },
                    {
                        path: '/shop/kid',
                        element: <Kids></Kids>
                    },
                    {
                        path: '/shop/shoe',
                        element: <Shoes></Shoes>
                    },
                ]
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
            {
                path: '/dashboard',
                element: <EmptyPage></EmptyPage>
            },
            {
                path: '/dashboard/all-buyer',
                element: <AdminRouter><AllBuyer></AllBuyer></AdminRouter>
            },
            {
                path: '/dashboard/messages',
                element: <AdminRouter><Messages></Messages></AdminRouter>
            },
            {
                path: '/dashboard/all-seller',
                element: <AdminRouter><AllSeller></AllSeller></AdminRouter>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/all-products',
                element: <AdminRouter><Products></Products></AdminRouter>
            },
            {
                path: '/dashboard/add-blogs',
                element: <AddBlogs></AddBlogs>
            },
            {
                path: '/dashboard/my-blogs',
                element: <MyBlogs></MyBlogs>
            },
            {
                path: '/dashboard/all-blogs',
                element: <AdminRouter><AllBlogs></AllBlogs></AdminRouter>
            },
            {
                path: '/dashboard/cart',
                element: <Cart></Cart>
            },
            {
                path: '/dashboard/orders',
                element: <Orders></Orders>
            },
        ]
    },
    {
        path: '*',
        element: <Error></Error>
    }
]);

export default router;