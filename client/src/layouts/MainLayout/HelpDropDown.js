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
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

export default function APP() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: "secondary" } }}
        title="Apps"
        endDecorator={<ArrowDropDown className="white-icon"/>}>
        <Tooltip title="Help">
        <HelpOutlineOutlinedIcon className="hover-background white-icon" title="Help" fontSize="18px"/>
        </Tooltip>
      </MenuButton>
      <Menu>
        <MenuItem
          component="a"
          href="https://github.com/biocompute-objects/portal_userdb/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <BugReportOutlinedIcon />
          </ListItemDecorator>
          Report an issue
        </MenuItem>
        <MenuItem
          component="a"
          href="https://docs.biocomputeobject.org/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <ContactPageOutlinedIcon />
          </ListItemDecorator>
          Contact Us
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
