import React from 'react';
import ReactDOM from "react-dom";
import './members.css';
export default function Financials({data, n, trades, value}){
    const person = data.filter(e => `${e.first_name} ${e.last_name}` === n)[0];
const party = person.party;

    const numbers = value.map(e => {
        if(e.trade_value.includes('-') && e.trade_value != 'Unknown'){
            const [min, max] = e.trade_value.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
            return {
                min: min,
                max: max,
            }
        }
    });
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
      var total_cost_basis = (totalLowest+totalHighest)/1.8;
      const  str = total_cost_basis.toLocaleString();
      const index = str.indexOf(',');
      var temp = str.slice(0,index+3);
      const volume = temp.replace(',','.');
      const netWorths = [
        { id: 1, name: "Scott Franklin", netWorth: "$25.70M" },      
        { id: 2, name: "Josh Gottheimer", netWorth: "$50.40M" },     
        { id: 3, name: "Nancy Pelosi", netWorth: "$114.70M" },  
        { id: 4, name: "Tommy Tuberville", netWorth: "$37.1M" },    
        { id: 5, name: "Ron Wyden", netWorth: "$20.07M" },            
        { id: 6, name: "Ro Khanna", netWorth: "$45.80M" },           
        { id: 7, name: "Michael T. McCaul", netWorth: "$200M" },    
        { id: 8, name: "Kathy Manning", netWorth: "$63.20M" },       
        { id: 9, name: "Marjorie Taylor Greene", netWorth: "$22.0M" }
      ];
      const person_networth = netWorths.find(e => e.name === n);
      return (
        <div className = "card data">
            <div className = {`bubbles total_trades ${party === "R" ?  "border-red-200" : "border-blue-200"}`}>
            <p className = {`num ${party === "R" ? "text-red-200" : "text-blue-200"}`}>{trades.length}</p>
            <p className = {`txt ${party === "R" ? "text-red-200" : "text-blue-200"}`}>Tracked Trades</p>
            </div>

            <div className = {`bubbles total_trades ${party === "R" ?  "border-red-200" : "border-blue-200"}`}>
            <p className ={`num ${party === "R" ? "text-red-200" : "text-blue-200"}`}>${volume}M</p>
            <p className = {`txt ${party === "R" ? "text-red-200" : "text-blue-200"}`}>Trade Volume</p>
            </div>

            <div className = {`bubbles total_trades ${party === "R" ?  "border-red-200" : "border-blue-200"}`}>
            <p className ={`num ${party === "R" ? "text-red-200" : "text-blue-200"}`}>{person_networth.netWorth}</p>
            <p className = {`txt ${party === "R" ? "text-red-200" : "text-blue-200"}`}>Est. Net Worth</p>
            </div>
        </div>
      );
}