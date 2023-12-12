import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import { getPrefixList } from "../slices/prefixSlice";
import { setPrefix } from "../slices/bcoSlice";
import { MenuItem, TextField } from "@material-ui/core";

const SelectBCODBAndPrefix = () => {
  const dispatch = useDispatch();
  const bcoPrefix = useSelector((state) => state.bco.prefix);
  const prefixList = useSelector((state) => state.prefix.data);
  const bcodbs = useSelector((state) => state.account.user.bcodbs);

  const handleBcodb = (event) => {
    console.log(event.target.value);
    dispatch(getPrefixList(event.target.value));
  };

  const handlePrefix = (event) => {
    dispatch(setPrefix(event.target.value));
  };

  return (
    <div>
      {bcoPrefix === null ? (
        <Formik
          initialValues={{ database: "", prefix: "" }}
          onSubmit={(values) => {
            console.log(values.database);
          }}
        >
          {() => (
            prefixList.length === 0 ? (
              <Form>
                <label htmlFor="database" style={{ display: "block" }}>
                  Select BCODB
                </label>
                <Field
                  as='select'
                  name='database'
                  onChange={handleBcodb}
                >
                  <option value="" key=""></option>
                  {bcodbs && Array.isArray(bcodbs) && bcodbs.map((database, index) => (
                    <option value={database.public_hostname} key={index}>{database.hostname}</option>
                  ))}
                </Field>
              </Form>
            ) : (
              <Form>
                <label htmlFor="prefix" style={{ display: "block" }}>
                  Select Prefix
                </label>
                <Field
                  as='select'
                  name='prefix'
                  onChange={handlePrefix}
                >
                  <option value="" key=""></option>
                  {prefixList.map((prefix, index) => (
                    <option value={prefix} key={index}>{prefix}</option>
                  ))}
                </Field>
              </Form>
            )
          )}
        </Formik>
      ) : (
        <TextField
          value={`BCO prefix: ${bcoPrefix}`}
          variant="outlined"
          disabled
          size="small"
          className="button-confirm"
        />
      )}
    </div>
  );
};

export default SelectBCODBAndPrefix;