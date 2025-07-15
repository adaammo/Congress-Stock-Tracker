import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import './members.css';
import MembersIntro from "./mem_card_info"
 import StockPng from '../public/stock.png';
export default function Port({n, data, trades, value}){
    const person = data.filter(e => `${e.first_name} ${e.last_name}` === n)[0];
const party = person.party;

    const numbers = value.map(e => {
        if(e.trade_value.includes('-')){
            const [min, max] = e.trade_value.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
            return {
                min: min,
                max: max,
            }
        }
    });
    console.log(numbers);
    const totalLowest = numbers.reduce((acc, curr) => {
        if (!Number.isNaN(curr.min)) {
          return acc + curr.min;
        }
        return acc;
      }, 0);
      
      const totalHighest = numbers.reduce((acc, curr) => {
        if (!Number.isNaN(curr.max)) {
          return acc + curr.max;
        }
        return acc;
      }, 0);
      const total_cost_basis = (totalLowest+totalHighest)/2;
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
        <div className = "card data">
            <div className = "bubbles total_trades">
            <p className = {`num ${party === "R" ? "text-red-200" : "text-blue-200"}`}>{trades.length}</p>
            <p className = {`txt ${party === "R" ? "text-red-200" : "text-blue-200"}`}>Tracked Trades</p>
            </div>

            <div className = "bubbles net_profit">
            <p className = 'num trade_num'>${total_cost_basis.toLocaleString()}</p>
            <p className = {`txt ${party === "R" ? "text-red-200" : "text-blue-200"}`}>Volume</p>
            </div>

            <div className = "bubbles ovr_cost_basis">
            <p>1</p>
            </div>

        </div>
        <div className = "card chart">3</div>
        <div className = "card stock">4</div>
    </div>
    </div>
    );

}