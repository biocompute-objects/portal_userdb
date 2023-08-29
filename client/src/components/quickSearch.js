import React, { useState } from "react";
import { Button, Input, TextField } from "@material-ui/core";
import { searchBcodb } from "../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    color: "white",
  }
}))


export default function QuickSearch () {
  const classes = useStyles();
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState("")
  const dispatch = useDispatch();
  const bcodbUrl = process.env.REACT_APP_BCOAPI_URL
  let isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const bcodb = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);
  const handleQuickSearch = (quickSearch, bcodb) => {

    if (isLoggedIn === true) {
      const publicHostname = bcodb[0]["public_hostname"]
      dispatch(searchBcodb({publicHostname, quickSearch}))
        .then(() => {
          navigate("/bcodbs")
        })
    } else {
      const publicHostname = bcodbUrl.replace("/api/", "")
      dispatch(searchBcodb({publicHostname, quickSearch}))
    }
  }

  return (
    <Input
      className={classes.search}
      id="bcodb"
      value={quickSearch}
      variant="outlined" 
      startAdornment={
        <InputAdornment position="end">
          <SearchIcon className={classes.search}/>
        </InputAdornment>
      }
      onChange={(e) => setQuickSearch(e.target.value)}
      placeholder="Search BCO contents"
      onKeyDown={(event) => {
        if (event.key === "Enter"){
          handleQuickSearch(quickSearch, bcodb)
        }
      }}
    />

  )
}
