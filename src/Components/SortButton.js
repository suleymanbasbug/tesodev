import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
export default function SortButton({ setOrderType }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setOrderType(type);
    setAnchorEl(null);
  };

  return (
    <div style={{ textAlign: "right", padding: "0.3em" }}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ marginRight: "0.5em", color: "#484848" }}
      >
        <FilterListOutlinedIcon />
        Order By
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose("nameasc")}>
          Name ascending
        </MenuItem>
        <MenuItem onClick={() => handleClose("namedesc")}>
          Name descending
        </MenuItem>
        <MenuItem onClick={() => handleClose("yearasc")}>
          Year ascending
        </MenuItem>
        <MenuItem onClick={() => handleClose("yeardesc")}>
          Year descending
        </MenuItem>
      </Menu>
    </div>
  );
}
