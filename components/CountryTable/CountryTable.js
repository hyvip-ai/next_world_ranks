import React, { useState } from "react";
import classes from "./CountryTable.module.css";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={classes.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={classes.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const orderBy = (countries, value, direction) => {
  if (direction === "asc"){
    if(value === 'name'){
       return [...countries].sort((a,b)=>{
        if (a.name.common > b.name.common) {
            return 1;
          } else if (a.name.common < b.name.common) {
            return -1;
          } else {
            return 0;
          }
        })
    }
    else{
        return [...countries].sort((a,b)=>{
            if (a[value] > b[value]) {
                return 1;
              } else if (a[value] < b[value]) {
                return -1;
              } else {
                return 0;
              }
            })
    }
  }
  else if(direction === 'desc'){
    if(value === 'name'){
        return [...countries].sort((a,b)=>{
         if (a.name.common > b.name.common) {
             return -1;
           } else if (a.name.common < b.name.common) {
             return 1;
           } else {
             return 0;
           }
         })
     }
     else{
         return [...countries].sort((a,b)=>{
             if (a[value] > b[value]) {
                 return -1;
               } else if (a[value] < b[value]) {
                 return 1;
               } else {
                 return 0;
               }
             })
     }
  }
 
      return countries;


};
function CountryTable({ countries }) {
  // console.log(countries)
  const [value, setValue] = useState(null);
  const [direction, setDirection] = useState(null);
  const orderedCountries = orderBy(countries, value, direction);

  const gotoCountryDetailsPageHandler = (countryName) => {
    console.log(countryName);
  };
  const setNewDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
    console.log(value,direction)
  };
  const  setValueandDirection =  (newValue) => {

    setValue(newValue);
    setNewDirection()
  };

  return (
    <div>
      <div className={classes.heading}>
        <div className={classes.heading_flag}>
          <div>Flag</div>
        </div>
        <button
          className={classes.heading_name}
          onClick={() => setValueandDirection("name")}
        >
          <div >
            <div className={classes.flex}>Name{value ==='name'?<SortArrow direction={direction}/>:null}</div>
          </div>
        </button>
        <button
          className={classes.heading_population}
          onClick={() => setValueandDirection("population")}
        >
          <div>
            <div className={classes.flex}>Population {value ==='population'?<SortArrow direction={direction}/>:null}</div>
          </div>
        </button>
        <button
          className={classes.heading_area}
          onClick={() => setValueandDirection("area")}
        >
          <div>
            <div className={classes.flex}>Area (km <sup>2</sup> ) {value ==='area'?<SortArrow direction={direction}/>:null}</div>
          </div>
        </button>
      </div>
      {orderedCountries.map((item, index) => {
        return (
          <div
            className={classes.row}
            key={index}
            onClick={() => gotoCountryDetailsPageHandler(item.name.common)}
          >
            <div className={classes.flag}>
              <img src={item.flags.svg} alt={`${item.name.common} Flag`} />
            </div>

            <div className={classes.name}>{item.name.common}</div>
            <div className={classes.population}>{item.population}</div>
            <div className={classes.area}>{item.area}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CountryTable;
