import React, { useState, useEffect } from "react";
import {
  Card, CardContent,
} from "@material-ui/core";
import { Form as JsonForm} from "@rjsf/material-ui"
import validator from "@rjsf/validator-ajv8";
import { useDispatch } from "react-redux"
import { updateExtensionDomain } from "../../slices/bcoSlice"

export const Extension = ({extension, schemaUrl, index, allExtensions}) => {
  const dispatch = useDispatch();
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(schemaUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setSchema(jsonData);
        setFormData(extension);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
        alert(`Fetch schema FAILED: ${error}`);
        setSchema({});
        setFormData({});
      });
    console.log(allExtensions)
  }, [allExtensions])

  const onSubmit = ({ formData }) => {
    dispatch(updateExtensionDomain({formData, index}))
    console.log(index, allExtensions[index]);
  }

  const uiSchema = {
    "ui:order": ["extension_schema", "*"],
    extension_schema: {
      "ui:readonly": true
    }
  };

  return (
    <Card>
      <CardContent>
        {/* {JSON.stringify(extension)} */}
        <JsonForm
          liveValidate
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          validator={validator}
          onChange={e => {
            setFormData(e.formData);
            console.log(formData)
          }}
          showErrorList='top'
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  )
}