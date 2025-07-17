import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './index.css';
import git from "../../public/git.svg";
import linked from "../../public/linkedin.svg"

export default function Footer(){
    return(
        <div className = "ref">
            <div className = "icon">
                <a href = "https://github.com/adaammo" target ="_blank">
            <img src = {git} className = "git"/>
            </a>
            </div>

            <div className = "icon">
                <a href="https://www.linkedin.com/in/adam-mohamed-a119b5312/" target="_blank" >
            <img src = {linked} className = "linked"/>
            </a>

            </div>
        </div>
        );
    }
