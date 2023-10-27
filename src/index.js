import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingScreen, HomeScreen, Dashboard, CreateScreen, ErrorPage } from "./routes";
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingScreen />,
        errorElement : <ErrorPage />
    },
    {
        path : '/home',
        element : <HomeScreen />,
        errorElement : <ErrorPage />,
        children : [
            {
                path : '/home/dashboard',
                element : <Dashboard />,
                errorElement : <ErrorPage />,
            },
            {
                path : '/home/create',
                element : <CreateScreen />,
                errorElement : <ErrorPage />,
            },
        ]
     }

])

ReactDOM.render(
    <RouterProvider router={router} />, document.getElementById('root')
)