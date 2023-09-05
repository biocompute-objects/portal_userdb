import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { ListItemDecorator } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { Tooltip } from "@material-ui/core";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

export default function APP() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: "secondary" } }}
        title="Apps"
        endDecorator={<ArrowDropDown className="white-icon"/>}>
        <Tooltip title="Help">
          <HelpOutlineOutlinedIcon className="hover-background white-icon" fontSize="18px"/>
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
