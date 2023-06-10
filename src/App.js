import React from "react";

import "./scss/app.scss";
import Header from "./components/header";
import Home from "./pages/home";
import { Route, Routes, Navigate } from "react-router-dom";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
