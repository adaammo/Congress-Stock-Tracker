// The loading page for the members data. configures instantly towards whatever icon was pressed on the loading page.
import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import Port from "./port-layout.jsx";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function MemberPage({data}){
    const  {name} = useParams();
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState([]);
    const[spy, setSpy] = useState([]);
    useEffect (() => {
        const tradesData = async () => {
            try{
            const responce = await axios.get(`http://localhost:3000/api/${name}`);
            setTrades(responce.data);
            setLoading(true);
            }
            catch (err){
                console.error(err);
                setLoading(false);
            }
        }
        tradesData();
    }, []);

    useEffect (() => {
        const tradesData = async () => {
            try{
            const responce = await axios.get(`http://localhost:3000/api/trade-value/${name}`);
           setValue(responce.data)
           setLoading(true);
            }
            catch (err){
                console.error(err);
                setLoading(false);
            }
        }
        tradesData();
    }, []);
    useEffect (() => {
        const Spy = async () => {
            try{
            const responce = await axios.get(`http://localhost:3000/yahoo/spy`);
           setSpy(responce.data)
           setLoading(true);
            }
            catch (err){
                console.error(err);
                setLoading(false);
            }
        }
        Spy();
    }, []);
    if(!loading){
        return <div>Loading...</div>
    }
    return(
        <>
 <Port n = {name} data = {data} trades = {trades} value = {value} spy = {spy}/>
 </>
    );
}