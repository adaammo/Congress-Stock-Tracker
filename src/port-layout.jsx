import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './members.css';
import ScottFranklin from '../public/congress people/scott_franklin.jpg';
import JoshGottheimer from '../public/congress people/Josh_Gottheimer.jpg';
import NancyPelosi from '../public/congress people/Nancy_Pelosi.jpg';
import DebbieSchultz from '../public/congress people/Debbie_Wasserman.jpg';
import TommyTuberville from '../public/congress people/Tommy_tuberville.jpg';
import RonWyden from '../public/congress people/Ron_Wyden.jpeg';
import RoKhanna from '../public/congress people/Ro_Khanna.jpg';
import MichaelMcCaul from '../public/congress people/Michael_McCaul.jpg';
import KathyManning from '../public/congress people/Kathy_Manning.jpeg';
import states from "./states.jsx"
import MarjorieTaylorGreene from '../public/congress people/Marjorie_Greene.jpeg';
import {socialLinks} from "./socials.jsx";
import X from "../public/X.png";
import facebook from "../public/facebook.png";
import instagram from "../public/instagram.png"
import website from "../public/web.png";
import Info from "./member_txt.jsx"
export default function Port({n, data}){
    const imageMap = {
        ScottFranklin,
        RoKhanna,
        JoshGottheimer,
        MichaelMcCaul,
        NancyPelosi,
        KathyManning,
        DebbieSchultz,
        TommyTuberville,
        MarjorieTaylorGreene,
        RonWyden,
      };
let cleaned = n.replaceAll(" ", "");
const imgSrc = imageMap[cleaned];
const person = data.filter(e => `${e.first_name} ${e.last_name}` === n)[0];
const rep = person.first_name + " " + person.last_name;
const pos = person.gov_pos;
const party = person.party;
const dist = person.district;
const state_code = person.state;
console.log(n);
function PolitcalParty(p){
    return p[0].party === "R" ? "r" : "d";
}
console.log(socialLinks[n])
    useEffect (() => {
       window.scrollTo(0,0);
    },[]);
    return(
        <div className = "body">
        <div>
            <div className = "title-flex">Temp</div>
        </div>
    <div className = "page-container">
    <div className= "card info_mem">
        <img className={`${person.party === "R" ? "hue-rotate-130" : ""} bg`} src="../public/blue.png" />
        <img className={`${person.party === "R" ? "hue-rotate-130" : ""} bg`} src="../public/blue.png" />
        <img className={`${person.party === "R" ? "hue-rotate-130" : ""} bg`} src="../public/blue.png" />
    <img className={`${PolitcalParty(data.filter(e => `${e.first_name} ${e.last_name}` === n)) === 'r' ? "border-red-600" : "border-blue-500"} member_pfp`}
    src={imgSrc} alt = {cleaned}/>
         <p className = "name_info">{pos === "Representative" ? "Rep." : "Sen."} {rep ? rep : "No Name Found."}</p>
         <p className = {`desc ${party === "R" ? "border-b-2 border-red-500" : "border-b-2 border-blue-500"}`}>{party === "R" ? "Republican" : "Democrat"} |
            {` ${states[state_code]}`}</p>
            <Info d = {n}/>
            <div className = "socials">
            <a href = {socialLinks[n].website} target = "_blank" rel="noopener noreferrer">
            <img className = "web png"src={website}/>
                </a>
                <a href = {socialLinks[n].instagram} target = "_blank" rel="noopener noreferrer">
                <img className = "insta png"src  = {instagram}/>
                </a>
                <a href = {socialLinks[n].twitter} target = "_blank" rel="noopener noreferrer">
                <img className = "twitter png"src  = {X}/>
                </a>
                <a href = {socialLinks[n].facebook} target = "_blank" rel="noopener noreferrer">
                <img className = "facebook png"src  = {facebook}/>
                </a>
            </div>
        </div>
        <div className = "card data"></div>
        <div className = "card chart">3</div>
        <div className = "card stock">4</div>
    </div>
    </div>
    );

}