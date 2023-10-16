import React, { useState, useEffect } from "react";

import { Form as JsonForm} from "@rjsf/material-ui"
import validator from "@rjsf/validator-ajv8";
import { useDispatch } from "react-redux"
import { updateExtensionDomain, getExtension} from "../../slices/bcoSlice"

export const Extension = ({extension, schemaUrl, index, allExtensions}) => {
  const dispatch = useDispatch();
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});

  const errorSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "type": "string"
      }
    },
    "required": [
      "message"
    ]
  }

  useEffect(() => {
    dispatch(getExtension({schemaUrl}))
      .unwrap()
      .then((jsonData) => {
        setSchema(jsonData);
        setFormData(extension);
      })
      .catch((error) => {
        setSchema(errorSchema);
        setFormData(error);
      });
  }, [allExtensions])

  const onSubmit = ({ formData }) => {
    dispatch(updateExtensionDomain({formData, index}))
  }

  const uiSchema = {
    "ui:order": ["extension_schema", "*"],
    extension_schema: {
      "ui:readonly": true
    }
  };

  return (    
    <JsonForm
      liveValidate
      schema={schema}
      formData={formData}
      uiSchema={uiSchema}
      validator={validator}
      onChange={e => {
        setFormData(e.formData);
      }}
      showErrorList='top'
      onSubmit={onSubmit}
    />
  )
}