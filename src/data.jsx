import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
export default function PersonCard({name, data}){
    function PolitcalParty(p){
        return p === "R" ? "Republican" : "Democrat";
    }
function Pos(p){
   return p === "Representative" ? "House of Representatives" : "Senator";
}
function DisplayName(n){
    if(n === "Marjorie Greene"){
    return <p className = "name marjorie">Marjorie Taylor Greene, {PolitcalParty(user.party)}</p>
    }
    else{
       return <p className = "name">{n}, {PolitcalParty(user.party)}</p>
    }
}
const user = data.data.find(cp => name === `${cp.first_name} ${cp.last_name}`);

    function CorrectName(){
        if(user){
            return (
            <div className = "info">
                {DisplayName(name)}
                <br/>
                <h1 className = "pos">{Pos(user.gov_pos)}</h1>           
                 </div>
            );
        }
    }
    
    return (
        <>
        {CorrectName()}
        </>
      ); 
}