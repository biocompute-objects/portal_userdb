import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Apps from "@mui/icons-material/Apps";
import Dropdown from "@mui/joy/Dropdown";
// import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ListItemDecorator } from "@mui/joy";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import IconButton from "@mui/joy/IconButton";
import { Tooltip } from "@material-ui/core";
// import { Mode } from "@mui/icons-material";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function APP() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: "secondary" } }}
        title="Apps"
        endDecorator={<ArrowDropDown className="white-icon"/>}>
        <Tooltip title="App">
        <Apps className="hover-background white-icon" title="App" fontSize="18px"/>
        </Tooltip>
      </MenuButton>
      <Menu>
        <MenuItem
          component="a"
          href="/builder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <ModeEditOutlineOutlinedIcon />
          </ListItemDecorator>
          Builder
        </MenuItem>
        <MenuItem
          component="a"
          href="/prefix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <GroupOutlinedIcon />
          </ListItemDecorator>
          Prefix Registry
        </MenuItem>
        <MenuItem
          component="a"
          href="/bcodbs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <SearchOutlinedIcon />
          </ListItemDecorator>
          BCODB
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
