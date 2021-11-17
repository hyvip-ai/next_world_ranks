import Head from "next/head";
import CountryTable from "../components/CountryTable/CountryTable";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import classes from "../styles/Home.module.css";
export default function Home({ worldData }) {
  // console.log(worldData)
  return (
    <Layout>
      <div className={classes.inputContainer}>
        <div className={classes.counts}>
          Found {worldData.length} Countries
        </div>
        <div className={classes.input}>
          <SearchInput placeholder="Filter By Name, Region, or SubRegion" />
        </div>
      </div>
      <CountryTable countries={worldData} />
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
