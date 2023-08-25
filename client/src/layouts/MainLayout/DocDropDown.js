import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Tooltip } from "@material-ui/core";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { ListItemDecorator } from "@mui/joy";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

export default function DocDropDown() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: "secondary" } }}
        title="Documentation"
        endDecorator={<ArrowDropDown className="white-icon"/>}
      >
        <Tooltip title="Documentation">
        <DescriptionOutlinedIcon className="hover-background white-icon" title="Documentation" />
        </Tooltip>
      </MenuButton>
      <Menu placement="bottom-end">
      <MenuItem
          component="a"
          href="https://wiki.biocomputeobject.org/index.php?title=Quick_Start_Guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <AutoStoriesOutlinedIcon />
          </ListItemDecorator>
          Quick Start Guide
        </MenuItem>
        <MenuItem
          component="a"
          href="https://biocomputeobject.org/api/docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <ApiOutlinedIcon />
          </ListItemDecorator>
          BioCompute API
        </MenuItem>
        <MenuItem
          component="a"
          href="https://wiki.biocomputeobject.org/index.php?title=Main_Page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <WebhookOutlinedIcon />
          </ListItemDecorator>
          Wiki
        </MenuItem>
        <MenuItem
          component="a"
          href="/resources"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <SettingsInputAntennaIcon />
          </ListItemDecorator>
          BCO Resources
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
