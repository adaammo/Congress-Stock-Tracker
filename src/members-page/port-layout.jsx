import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './members.css';
import MembersIntro from "./mem_card_info.jsx"
 import Financials from './mem_financial_data.jsx';
export default function Port({n, data, trades, value, spy}){
    const person = data.filter(e => `${e.first_name} ${e.last_name}` === n)[0];
const party = person.party;
const time_dates = spy.data.chart.spy[0].timestamp
const indicators = spy.data.chart.spy[0].indicators;
const open = spy.data.chart.spy[0].indicators.quote[0].open;
const close = spy.data.chart.spy[0].indicators.quote[0].close;
const high = spy.data.chart.spy[0].indicators.quote[0].high;
const low = spy.data.chart.spy[0].indicators.quote[0].low; 
      console.log(spy);
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
        <div className = "card chart">3</div>
        <div className = "card stock">4</div>
    </div>
    </div>
    );

}