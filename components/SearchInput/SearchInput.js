import React from 'react'
import classes from './SearchInput.module.css'
import { SearchRounded } from '@material-ui/icons'
function SearchInput({...rest}) {
    return (
        <div className={classes.wrapper}>
            <SearchRounded/>
            <input className={classes.input} {...rest}/>
        </div>
    )
}

export default SearchInput
