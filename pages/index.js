import CountryTable from "../components/CountryTable/CountryTable";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import classes from "../styles/Home.module.css";
import React,{useState} from 'react'
export default function Home({ worldData }) {
  // console.log(worldData)
  const [country, setcountry] = useState('')

  const filterCountry = (e) =>{
    setcountry(e.target.value.toLowerCase())
  }
  const filteredCountries =  worldData.filter(item =>{
      return item.name.common.toLowerCase().includes(country)
    })
    console.log(filteredCountries)

  return (
    <Layout>
      <div className={classes.inputContainer}>
        <div className={classes.counts}>
          Found {worldData.length} Countries
        </div>
        <div className={classes.input}>
          <SearchInput placeholder="Filter By Name, Region, or SubRegion" onChange={filterCountry}/>
        </div>
      </div>
      {!country?<CountryTable countries={worldData} country={country}/>:<CountryTable countries={filteredCountries} country={country}/>}
    </Layout>
  );
}
export async function getStaticProps() {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const worldData = await data.json();

  return {
    props: {
      worldData,
    },
  };
}
