import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import classes from './country.module.css'

async function getBorderData(id){
    const data = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
    const result = await data.json();
    return result[0];
}
function Country(props) {
    const [borders, setborders] = useState([])
    const country = props.countryData[0]
    useEffect(() => {
       if(country.borders){
        Promise.all(country.borders.map(id=>{
            return getBorderData(id);
        })).then(data=>{
            setborders(data)
        })
       }
  
    }, [country.borders])
    return (
        <Layout title={country.name.common}>
            <div>
                <div className={classes.overview_panel}>
                    <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
                    <h1 className={classes.overview_name}>{country.name.common}</h1>
                    <div className={classes.overview_region}>{country.region}</div>
                    <div className={classes.overview_numbers}>
                        <div className={classes.overview_population}>
                            <div className={classes.overview_value}>{country.population}</div>
                            <div className={classes.overview_label}>Population</div>
                        </div>
                        <div className={classes.overview_area}>
                            <div className={classes.overview_value}>{country.area}</div>
                            <div className={classes.overview_label}>Area</div>
                        </div>
                    </div>
                </div>
                <div className={classes.details_panel}>
                    <h4 className={classes.details_panel_heading}>Details</h4>
                    <div className={classes.details_panel_row}>
                        <div className={classes.details_panel_label}>Capital</div>
                        <div className={classes.details_panel_value}>{country.capital[0]}</div>
                    </div>

                    <div className={classes.details_panel_row}>
                        <div className={classes.details_panel_label}>Sub Region</div>
                        <div className={classes.details_panel_value}>{country.subregion}</div>
                    </div>

                    <div className={classes.details_panel_row}>
                        <div className={classes.details_panel_label}>Languages</div>
                        <div className={classes.details_panel_value}>{Object.values(country.languages).join()
                        
                        }</div>
                    </div>


                    <div className={classes.details_panel_row}>
                        <div className={classes.details_panel_label}>Currencies</div>
                        <div className={classes.details_panel_value}>{Object.keys(country.currencies).join()}</div>
                    </div>

                    {borders.length>0?<div className={classes.details_panel_borders}>
                    <div className={classes.details_panel_borders_label}>Neighbouring Countries</div>
                    <div className={classes.details_panel_borders_container}>
                    {borders.map(item=>{
                            return <div className={classes.details_panel_borders_country} key={item.name.common}>
                                <img src={item.flags.svg} alt={`${item.name.common} Flag`} />
                                <div className={classes.details_panel_borders_name}>{item.name.common}</div>
                            </div>
                        })}
                    </div>
                   
                    </div>:null}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context){
    
  const countryName = context.params.country
  const data = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  const countryData = await data.json()
    return{
        props:{
            countryData
        }
    }
}

export default Country
