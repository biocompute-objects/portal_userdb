// src/components/bcodbs/index.js

import React, { useEffect, useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from "../../slices/messageSlice";
import { Field, Form, Formik } from 'formik';
import { MyTextField } from '../builder/specialFeilds';
import { seachBcodb } from '../../slices/bcodbSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


export default function SearchOptions () {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const bcodbs = useSelector((state) => state.account.user.bcodbs);

  return (
    <Container>
      <Formik
        initialValues={{
          index: 'None',
          action: '',
          search: ''
        }}
        onSubmit={(values, {setSubmitting}) => {
          if (values.index === 'None') {
            const data = {
                token: '627626823549f787c3ec763ff687169206626149',
                public_hostname: 'https://biocomputeobject.org',
                search: values.search,
                action: 'bco_id'
            }
            dispatch(seachBcodb(data))
          } else {
              const data = {
                  public_hostname: bcodbs[values.index].public_hostname,
                  token: bcodbs[values.index].token,
                  search: values.search,
                  action: values.action
                }
              dispatch(seachBcodb(data))
          }
          setSubmitting(false);
        }}
      >
        {({values, isSubmitting, errors}) => (
          <Form>
            <Card>
              <CardContent>
                <Box>
                  <Typography>
                    1. Select from available BCODBs to display results
                  </Typography>
                  <InputLabel>BCODB</InputLabel>
                  <Field as='select' name='index'>
                    <option value='None' index='None'>Public</option>
                    {bcodbs.map((database, index) => (
                        <option value={index} key={index}>{database.public_hostname}</option>
                    ))}
                  </Field>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Search Type:&nbsp;&nbsp;
                <Field type='radio' name='action' value='mine' disabled={values.index === 'None'}/>
                &nbsp;&nbsp;My BCOs&nbsp;&nbsp;
                <Field type='radio' name='action' value='prefix' disabled={values.index === 'None'}/>
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
              disabled={isSubmitting}
              type='submit'
              variant="contained"
              color="primary"
            > Search </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};