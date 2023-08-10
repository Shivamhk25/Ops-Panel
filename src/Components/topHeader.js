import React,{useState} from "react"
import "./topHeader.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import SettingsIcon from '@mui/icons-material/Settings';

function TopHeader() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (value) => {
    navigate(`/${value}`);
    handleClose()
  };

  // let handleClick = (e) => {
  //   navigate(`/${e.target.value}`);
  // };

  return (
    <div className="headerbar">
      <div className="nav_main">
        <a href="/">
          <img
            src="https://cdn.pegasus.imarticus.org/images/imarticus-new-logo.svg"
            alt="Imarticu Logo"
            height={40}
            width={195}
          />
        </a>
        <div className="HeaderDiv">
          <p className="top_heading">Marketing Ops Panel</p>
          <div>
            {/* <div>
              <select className="PopButton" onClick={handleClick}>
              <option value="" selected disabled hidden>Settings</option>
                <option value='Settings'>
                    Global Settings
                </option>
              </select>
            </div> */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="PopButton"
              startIcon={<SettingsIcon />}
            >
              Settings
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* <InputLabel id="WebinarForm">Form Schemas</InputLabel>
              <Select labelId="WebinarForm" className="PopitemMain" > */}
              <MenuItem onClick={()=>{handleOpen("Settings")}} className="Popitem" value="Webinar">Webinar Schema</MenuItem>
              {/* </Select> */}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
