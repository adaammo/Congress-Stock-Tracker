// The loading page for the members data. configures instantly towards whatever icon was pressed on the loading page.
import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import Port from "./port-layout.jsx";
import { useParams } from 'react-router-dom';

export default function MemberPage({data}){
    const  {name} = useParams();
    return(
        <>
 <Port n = {name} data = {data}/>
 </>
    );
}