import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { searchBcodb } from "../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function QuickSearch () {
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
    <>
      <TextField
        value={quickSearch}
        onChange={(e) => setQuickSearch(e.target.value)}
        placeholder="Search BCO contents"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleQuickSearch(quickSearch, bcodb)}
      >Search BCODB</Button>
    </>
  )
}
