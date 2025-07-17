import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './index.css';
import Pictures from "./Congress_Images.jsx";
import Logo from "./Logo.jsx";
import Footer from "./Footer.jsx";
export default function Front({data}){
    return (
            <>
            <Footer />
            <Logo />
            <Pictures data = {data}/>
        </>
        );
}