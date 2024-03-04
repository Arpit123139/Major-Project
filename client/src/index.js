import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider, IdProvider } from './Auth/Auth';
import { BrowserRouter } from "react-router-dom"
ReactDOM.render(
    <AuthProvider>
        <IdProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </IdProvider>
    </AuthProvider>
    ,
    document.getElementById("root")
);