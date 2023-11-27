import React, { useEffect, useRef } from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import HandymanIcon from "@mui/icons-material/Handyman";
import Dropdown from "@mui/joy/Dropdown";
import { ListItemDecorator } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { ListItemText, Tooltip } from "@material-ui/core";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deriveBco, updateBco, validateBco } from "../../slices/bcoSlice";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { removeEmptyValues } from "../../components/builder/components";

export default function ToolsDropDown() {
  const builderPage = (global.window.location.pathname === "/builder")
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const jsonData = useSelector((state) => state.bco.data);

  const  handleDerive = (jsonData) => {
    navigate("/builder")
    dispatch(deriveBco(jsonData))
  };

  const validate = () => {
    console.log("Validate", BCODB_URL, jsonData)
    const bcoURL = BCODB_URL
    const bcoObject = removeEmptyValues(jsonData, ["input_list"])
    dispatch(validateBco({bcoURL, bcoObject}))
  }
  
  const hiddenFileInput = useRef(null);
  
  const handleClick = (event) => {
    console.log(event)
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new global.FileReader();
        
    reader.onload = (event) => {
      const fileContent = JSON.parse(event.target.result);
      fileContent.object_id = "";
      console.log(fileContent)
      dispatch(updateBco(fileContent))
    };
        
    reader.readAsText(file);
  };

  const handleDownloadClick = (jsonData) => {
    const name = jsonData.provenance_domain.name
    const blob = new global.Blob([JSON.stringify(jsonData, null,2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = global.document.createElement("a");
    a.href = url;
    a.download = `${name}.json`;
    a.click();
  
    URL.revokeObjectURL(url);
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: "secondary" } }}
        title="Apps"
        endDecorator={<ArrowDropDown className="white-icon"/>}
      >
        <input
          type="file"
          onChange={handleFileUpload}
          ref={hiddenFileInput}
          style={{display:"none"}}
        />
        <Tooltip title="BCO Tools">
          <HandymanIcon className="hover-background white-icon" fontSize="18px"/>
        </Tooltip>
      </MenuButton>
      <Menu>
        <MenuItem
          component="a"
          onClick={handleClick}
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <UploadFileIcon />
          </ListItemDecorator>
          Upload BCO
        </MenuItem>
        <MenuItem
          component="a"
          onClick={() => handleDownloadClick(jsonData)}
          rel="noopener noreferrer"
        >
          <ListItemDecorator>
            <FileDownloadIcon />
          </ListItemDecorator>
          Download BCO JSON
        </MenuItem>
        <MenuItem
          component="a"
          rel="noopener noreferrer"
          onClick={handleDerive}
        >
          <ListItemDecorator>
            <CopyAllIcon />
          </ListItemDecorator>
          <ListItemText>Derive New BCO Draft</ListItemText>
        </MenuItem>
        <MenuItem
          component="a"
          onClick={() => validate()}
          disabled={!builderPage}
        >
          <ListItemDecorator>
            <FactCheckIcon />
          </ListItemDecorator>
          Validate BCO
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
