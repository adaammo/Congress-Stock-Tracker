import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './index.css';
import suit from "../../public/suit.jpg";

export default function Logo(){
    const [isScrolled, setIsScrolled] = useState(false);
        useEffect(() => {
            function Scroll(){
                if(window.scrollY > 580){
                    setIsScrolled(true);
                }
                else if(window.scrollY <= 361){
                    setIsScrolled(false)
                }
            }
            window.addEventListener('scroll', Scroll);
            return () => {
                window.removeEventListener('scroll', Scroll);
            };
        }, []);
    return (
<div className={`load-up ${isScrolled ? 'opacity-0' : 'opacity-100 ease-in'} transition-opacity duration-700 ease-out`}>
<img src={suit} alt = "Logo" className = "logo"/>
        <h1 className = "title-text">Congress's Most Succesful // <br/>A Look Into Government Trading</h1>
        <p className = "title-text-2"> View trades from some of the most prominent <br/>and successful traders in Congress </p>
        <p className ="arrow">&darr;</p>
        </div>
    );
}