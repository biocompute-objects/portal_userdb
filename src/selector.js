import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux'
import { listSelect } from './rootSlice';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({listItems, label, list, index}) {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState([]);
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {target: { value },} = event;
    setSelectedItems(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={list}
          onChange={(event) => dispatch(listSelect({
            selected: event.target.value,
            label: label,
            index: index,
            list: list
          }))}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {listItems.map((listItem) => (
            <MenuItem
              key={listItem}
              value={listItem}
            >
              {listItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
