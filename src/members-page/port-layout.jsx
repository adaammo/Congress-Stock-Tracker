import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './members.css';
import MembersIntro from "./mem_card_info.jsx"
 import Financials from './mem_financial_data.jsx';
 import LineChart from './LineChart.jsx';
export default function Port({n, data, trades, value, spy}){
    const person = data.filter(e => `${e.first_name} ${e.last_name}` === n)[0];
const party = person.party;
    useEffect (() => {
       window.scrollTo(0,0);
    },[]);
    return(
        <div className = "body">
        <div>
            <div className = "title-flex">Temp</div>
        </div>
    <div className = "page-container">
        <MembersIntro n = {n} data = {data}/>
        <Financials n = {n} data = {data} trades = {trades} value = {value}/>
        <div className = "card chart"><LineChart spy = {spy} party = {party} trades = {trades}/></div>
        <div className = "card stock">4</div>
    </div>
    </div>
    );

}