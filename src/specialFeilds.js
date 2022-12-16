import { useField } from "formik";
import { Box, MenuItem, TextField } from "@material-ui/core";
import dayjs, { Dayjs } from 'dayjs';
import { Chip, FormControl, InputLabel, OutlinedInput, Select } from '@mui/material';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props}/>}
        label={label}
        required={isRequired}
        {...field}
        disabled={isDisabled}
        onChange={() => {}}
      />
    </LocalizationProvider>
      
    )
  }

export const Selector = ({placeholder,label, isFullWidth, isRequired, isDisabled, ...props}) => {
  const [field, meta] = useField(props);
  return(
    <Select
      labelId="review-status"
      id="review-status"
      {...field}
      input={<OutlinedInput label="Review Status" />}
    >
      <MenuItem value={'unreviewed'}>Unreviewed</MenuItem>
      <MenuItem value={'in-review'}>In review</MenuItem>
      <MenuItem value={'approved'}>Approved</MenuItem>
      <MenuItem value={'rejected'}>Rejected</MenuItem>
      <MenuItem value={'suspended'}>Suspended</MenuItem>
    </Select>
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

export const MultiSelector = ({placeholder, label, isFullWidth, isRequired, isDisabled, ...props}) => {
    const [field, meta] = useField(props);
    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          labelId={label}
          id={label}
          name={props.name}
          multiple
          {...field}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((option, index) => (
                <Chip
                  key={index}
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