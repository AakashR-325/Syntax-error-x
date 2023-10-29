import React from "react";
import ReactDOM from "react-dom";
import { ethers } from "ethers";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingScreen, HomeScreen, Dashboard, CreateScreen, ErrorPage, Marketplace, WelcomeScreen, BuyListings, OwnListings } from "./routes";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
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
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)