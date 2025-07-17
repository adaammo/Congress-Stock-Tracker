import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import axios from 'axios';
const[spy, setSpy] = useState([]);
export default function DisplaySpy(){
const time_dates = result.data.chart.result[0].timestamp
const indicators = result.data.chart.result[0].indicators;
const open = result.data.chart.result[0].indicators.quote[0].open;
const close = result.data.chart.result[0].indicators.quote[0].close;
const high = result.data.chart.result[0].indicators.quote[0].high;
const low = result.data.chart.result[0].indicators.quote[0].low; 
}