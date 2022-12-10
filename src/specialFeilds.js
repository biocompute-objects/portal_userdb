import { useField } from "formik";
import { Box, MenuItem, TextField } from "@material-ui/core";
import dayjs, { Dayjs } from 'dayjs';
import { Chip, FormControl, InputLabel, OutlinedInput, Select } from '@mui/material';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";

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

export const LargeTextField = ({placeholder,label, isFullWidth, isRequired, isDisabled,...props}) => {
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
       multiline
       fullWidth
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

export const BaisicDateTimePicker = ({placeholder, label, isFullWidth, isRequired, isDisabled, ...props}) => {
  const [value, setValue] = useState()
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props}/>}
        label={label}
        required={isRequired}
        value={value}
        disabled={isDisabled}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
      
    )
  }

export const contributions = [
  'authoredBy',
  'contributedBy',
  'createdAt',
  'createdBy',
  'createdWith',
  'curatedBy',
  'derivedFrom',
  'importedBy',
  'importedFrom',
  'providedBy',
  'retrievedBy',
  'retrievedFrom',
  'sourceAccessedBy'
];

export const MultiSelector = ({list, placeholder,label, isFullWidth, isRequired, isDisabled, ...props}) => {
    const [lista, setLitsa] = useState(list)

    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          labelId={label}
          id={label}
          name={props.name}
          multiple
          value={lista}
          onChange={
            (event, new_contribution) => {
              console.log('contrib test', new_contribution, event.target.value);
              setLitsa(event.target.value)
            }
          }
          
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((option, index) => (
                <Chip
                  key={option}
                  variant="outlined"
                  label={option}
                  color="primary"
                />
              ))}
            </Box>
          )}
        >
          {contributions.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }