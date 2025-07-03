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
    else if(n === "Michael McCaul"){
       return <p className = "name mccaul">Micheal T. McCaul, {PolitcalParty(user.party)}</p>
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
                <h1 className = "pos">{Pos(user.gov_pos)}</h1>
                <br/>
                {DisplayName(name)}
                <p className = "Sub-info">District: {user.state}{user.district}</p>
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