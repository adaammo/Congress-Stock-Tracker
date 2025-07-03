// This will be the home page. introduces the website and shows what politians we track.
import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import Pictures from "./Congress_Images.jsx";
import Logo from "./Logo.jsx";
import Footer from "./Footer.jsx";
import Front from "./front-page.jsx";
export default function Page(data){
    return (
        <>
        <Front data={data}/>
    </>
    );
}