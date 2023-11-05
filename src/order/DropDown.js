import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function DropDown({ setState, state, refresh, setRefresh }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (x) => {
    setAnchorEl(null);
    if (x === state) {
      setRefresh((refresh) => !refresh);
    }
    setState(x);
  };
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        style={{
          display: "inline-block",
          color: "#18e765",
          backgroundColor: "transparent",
        }}
        disableElevation
      >
        Order Status{" "}
        <span style={{ position: "relative", top: "5px" }}>
          <ArrowDropDownIcon />
        </span>
      </Button>
      <Typography style={{ display: "inline-block" }}>
        :{(state === "" || state === "pending") && <b>Orders Placed</b>}
        {state === "confirmed_by_waiter" && <b>Orders Confirmed</b>}
        {state === "confirmed_by_chef" && <b>Orders Preparing</b>}
        {state === "order_is_ready" && <b>Orders Ready</b>}
        {state === "payment_done" && <b>Payment Received</b>}
      </Typography>
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
        <MenuItem
          onClick={() => {
            handleClose("pending");
          }}
        >
          {" "}
          Orders Placed
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose("confirmed_by_waiter");
          }}
        >
          {" "}
          Orders Confirmed
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("confirmed_by_chef");
          }}
        >
          {" "}
          Orders Preparing
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("order_is_ready");
          }}
        >
          {" "}
          Orders Ready
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("payment_done");
          }}
        >
          {" "}
          Payment Received
        </MenuItem>
      </Menu>
    </div>
  );
}
