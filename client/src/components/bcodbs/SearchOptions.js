// src/components/bcodbs/index.js

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { MyTextField } from "../builder/specialFeilds";
import { advSeachBcodb, searchBcodb } from "../../slices/searchSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchOptions ({setBcodbInfo}) {
  const [expanded, setExpanded] = useState(false);
  const bcodbUrl = process.env.REACT_APP_BCOAPI_URL
  const [quickSearch, setQuickSearch] = useState("")
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  
  const bcodbs = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleQuickSearch = (quickSearch, bcodbs) => {
    if (isLoggedIn === true) {
      const publicHostname = bcodbs[0]["public_hostname"]
      console.log("search loged in", publicHostname, quickSearch)
      dispatch(searchBcodb({publicHostname, quickSearch}))
    } else {
      const publicHostname = bcodbUrl.replace("/api/", "")
      console.log("search nnot logged in", publicHostname, quickSearch)
      dispatch(searchBcodb({publicHostname, quickSearch}))
    }
  }
 
  return (
    <Container>
      <Card>
        <CardHeader title="Quick Search"/>
        <CardContent>
          <TextField
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Search BCO contents"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleQuickSearch(quickSearch, bcodbs)}
          >Submit</Button>
        </CardContent>
        <CardActions disableSpacing>
          <CardHeader title="Advanced Search (click to expand)"/>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Formik
            initialValues={{
              index: "None",
              action: "",
              search: ""
            }}
            // validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
              if (values.index === "None") {
                const data = {
                  token: "627626823549f787c3ec763ff687169206626149",
                  public_hostname: "https://biocomputeobject.org",
                  search: values.search,
                  action: "bco_id"
                }
                setBcodbInfo([data.token, data.public_hostname])
                dispatch(advSeachBcodb(data))
              } else {
                const data = {
                  public_hostname: bcodbs[values.index].public_hostname,
                  token: bcodbs[values.index].token,
                  search: values.search,
                  action: values.action
                }
                setBcodbInfo([bcodbs[values.index].token, bcodbs[values.index].public_hostname])
                dispatch(advSeachBcodb(data))
              }
              setSubmitting(false);
            }}
          >
            {({values, isSubmitting}) => (
              <Form>
                <Card>
                  <CardContent>
                    <Box>
                      <Typography>
                    1. Select from available BCODBs to display results
                      </Typography>

                      <Field as='select' name='index'>
                    (isLoggedIn
                      ? {bcodbs.map((database, index) => (
                          <option value={index} key={index}>{database.human_readable_hostname}</option>
                        ))}
                      : (<option value='None' key='None'>Public BCODB (not logged in)</option>)
                    )
                      </Field>
                    </Box>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                2. Search Type:&nbsp;&nbsp;
                    <Field type='radio' name='action' value='mine' disabled={values.index === "None"}/>
                &nbsp;&nbsp;My BCOs&nbsp;&nbsp;
                    <Field type='radio' name='action' value='prefix' disabled={values.index === "None"}/>
                &nbsp;&nbsp;Prefixs&nbsp;&nbsp;
                    <Field type='radio' name='action' value='bco_id' />
                &nbsp;&nbsp;BCO IDs&nbsp;&nbsp;
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Box maxWidth={500}>
                      <Typography>
                    3. Enter search term:
                      </Typography>
                      <MyTextField name='search' label='Search BCO Db' />
                    </Box>
                  </CardContent>
                </Card>
                <Button 
                  disabled={isSubmitting || values.action === ""}
                  type='submit'
                  variant="contained"
                  color="primary"
                > Submit Search </Button>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Card>
    </Container>
  );
}