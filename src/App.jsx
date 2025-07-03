import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import FirstPage from './loading_page.jsx';
import Member from './member_content.jsx'
import axios from 'axios';
export default function App(){
    const [congressData, setCongressData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
                setCongressData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    if (loading) return <div>Loading...</div>;
    return (
        <Routes>
          <Route path="/" element={<FirstPage data = {congressData}/>} />
          <Route path="/member/:name" element={<Member data = {congressData}/>} />
        </Routes>
      );
    }