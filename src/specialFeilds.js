import { useField } from "formik";
import { TextField } from "@material-ui/core";

export const MyTextField = ({placeholder,label, isFullWidth, isRequired, isDisabled,...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
       <TextField
         placeholder={placeholder}
         label={label}
         {...field}
         helperText={errorText}
         error={!!errorText}
         variant='filled'
         margin='dense'
         fullWidth={isFullWidth}
         required={isRequired}
         disabled={isDisabled}
       />
    )
}

export const MyDateTimeField = ({placeholder,label, isFullWidth, isRequired, isDisabled,...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
    <TextField
      placeholder={placeholder}
      label={label}
      {...field}
      type="datetime-local"
      fullWidth={isFullWidth}
      required={isRequired}
      disabled={isDisabled}
    />
    )
  }
/*
   const DatePickerField = ({ placeholder,disabled,...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
    <Datetime
      {...field}
      {...props}
      placeholder={placeholder}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
      setFieldValue(field.name, val);
      }}
    />
    );
  }

  function fixDateTime(fieldValue) {
    console.log(typeof(fieldValue))
    if (typeof(fieldValue) != "string") {
      //console.log(fieldValue)
      const datetime_string = fieldValue.utc().toISOString();
      //console.log(datetime_string)
      return datetime_string;
    }
    //console.log("Outside: ", typeof(fieldValue))
    return fieldValue
   }
*/
