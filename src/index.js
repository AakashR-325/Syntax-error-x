import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingScreen, HomeScreen, Dashboard, CreateScreen, ErrorPage, Marketplace, WelcomeScreen, BuyListings, OwnListings } from "./routes";
import store from "./app/store";
import { Provider } from "react-redux";
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingScreen />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home',
        element: <HomeScreen />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home/',
                element: <WelcomeScreen />,
                errorElement: <ErrorPage />
            },
            {
                path: '/home/dashboard',
                element: <Dashboard />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/home/create',
                element: <CreateScreen />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/home/marketplace',
                element: <Marketplace />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '/home/marketplace/buy',
                        element: <BuyListings />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: '/home/marketplace/listings',
                        element: <OwnListings />,
                        errorElement: <ErrorPage />,
                    },
                ]
            },
        ]
    }

])

ReactDOM.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
    document.getElementById('root')
)