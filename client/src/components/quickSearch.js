import React, { useState } from "react";
import { Input} from "@material-ui/core";
import { searchBcodb } from "../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";


export default function QuickSearch () {
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState("")
  const dispatch = useDispatch();
  const bcodbUrl = process.env.REACT_APP_BCOAPI_URL
  const account = useSelector((state) => state.account.isLoggedIn);
  
  const handleQuickSearch = () => {
    if (account.isLoggedIn === true) {
      const publicHostname = account.user.bcodb[0]["public_hostname"]
      dispatch(searchBcodb({publicHostname, quickSearch}))
        .then(() => {
          navigate("/bcodbs")
        })
    } else {
      const publicHostname = bcodbUrl.replace("/api/", "")
      dispatch(searchBcodb({publicHostname, quickSearch}))
        .then(() => {
          navigate("/bcodbs")
        })
    }
  }

  return (
    <Input
      className="nav-link"
      id="bcodb"
      value={quickSearch}
      variant="outlined" 
      startAdornment={
        <InputAdornment position="end">
          <SearchIcon className="white-icon"/>
        </InputAdornment>
      }
      onChange={(e) => setQuickSearch(e.target.value)}
      placeholder="Search BCO contents"
      onKeyDown={(event) => {
        if (event.key === "Enter"){
          handleQuickSearch()
        }
      }}
    />

  )
}
