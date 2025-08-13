import Scott_Franklin from '../../public/congress people/scott_franklin.jpg';
import Josh_Gottheimer from '../../public/congress people/Josh_Gottheimer.jpg';
import Nancy_Pelosi from '../../public/congress people/Nancy_pelosi.jpg';
import Tommy_Tuberville from '../../public/congress people/Tommy_tuberville.jpg';
import Ron_Wyden from '../../public/congress people/Ron_Wyden.jpeg';
import Ro_Khanna from '../../public/congress people/Ro_Khanna.jpg';
import Michael_McCaul from '../../public/congress people/Michael_McCaul.jpg';
import Kathy_Manning from '../../public/congress people/Kathy_Manning.jpeg';
import Marjorie_Taylor from '../../public/congress people/Marjorie_Greene.jpeg';

import React from 'react';
import './index.css';
import Data from "./data.jsx";
import { useNavigate } from 'react-router-dom';

export default function Portraits({ data }) {
  const nav = useNavigate();

  const People = [
    { id: 1, name: "Scott Franklin", img: Scott_Franklin },
    { id: 2, name: "Josh Gottheimer", img: Josh_Gottheimer },
    { id: 3, name: "Nancy Pelosi", img: Nancy_Pelosi },
    { id: 4, name: "Tommy Tuberville", img: Tommy_Tuberville },
    { id: 5, name: "Ron Wyden", img: Ron_Wyden },
    { id: 6, name: "Ro Khanna", img: Ro_Khanna },
    { id: 7, name: "Michael T. McCaul", img: Michael_McCaul },
    { id: 8, name: "Kathy Manning", img: Kathy_Manning},
    { id: 9, name: "Marjorie Taylor Greene", img: Marjorie_Taylor},
  ];
return (
    <>
        <div className="members ">
          {People.map(person => (
            <div key={person.id} className="cards" onClick={() => nav(`/member/${person.name}`)}>
              <img src={person.img} alt={person.name} className="pfp" />
                <Data name={person.name} data={data}
              />
            </div>
          ))}
        </div>
        </>
      );
}