
import "./members.css"
export default function Info({d}){
  const members = [
    {
      name: "Scott Franklin",
      birthDate: "1964-08-23",
      firstElected: 2021,
      yearsInOffice: 4,
      info: "U.S. Representative for Florida's 15th Congressional District since 2021."
    },
    {
      name: "Ro Khanna",
      birthDate: "1976-09-13",
      firstElected: 2017,
      yearsInOffice: 8,
      info: "U.S. Representative for California's 17th Congressional District since 2017."
    },
    {
      name: "Josh Gottheimer",
      birthDate: "1975-03-08",
      firstElected: 2017,
      yearsInOffice: 8,
      info: "U.S. Representative for New Jersey's 5th Congressional District since 2017."
    },
    {
      name: "Michael T. McCaul",
      birthDate: "1962-01-14",
      firstElected: 2005,
      yearsInOffice: 20,
      info: "U.S. Representative for Texas's 10th Congressional District since 2005."
    },
    {
      name: "Nancy Pelosi",
      birthDate: "1940-03-26",
      firstElected: 1987,
      yearsInOffice: 38,
      info: "U.S. Representative for California's 11th Congressional District since 1987."
    },
    {
      name: "Kathy Manning",
      birthDate: "1956-12-03",
      firstElected: 2021,
      yearsInOffice: 4,
      info: "U.S. Representative for North Carolina's 6th Congressional District since 2021."
    },
    {
      name: "Debbie Schultz",
      birthDate: "1966-09-27",
      firstElected: 2005,
      yearsInOffice: 20,
      info: "U.S. Representative for Florida's 25th Congressional District since 2017; former DNC Chair."
    },
    {
      name: "Tommy Tuberville",
      birthDate: "1954-09-18",
      firstElected: 2021,
      yearsInOffice: 4,
      info: "U.S. Senator from Alabama since 2021."
    },
    {
      name: "Marjorie Taylor Greene",
      birthDate: "1974-05-27",
      firstElected: 2021,
      yearsInOffice: 4,
      info: "U.S. Representative for Georgia's 14th Congressional District since 2021."
    },
    {
      name: "Ron Wyden",
      birthDate: "1949-05-03",
      firstElected: 1996,
      yearsInOffice: 29,
      info: "U.S. Senator from Oregon since 1996; Ranking Member of the Senate Finance Committee."
    }
  ];
  let mem_info = members.find(info => `${info.name}` === d);
  console.log(mem_info);
  return(
    <>
    <p className = "quick-info">{mem_info.info} Has been at their current government position for the past {mem_info.yearsInOffice} years.</p>
    </>
  );
  
}