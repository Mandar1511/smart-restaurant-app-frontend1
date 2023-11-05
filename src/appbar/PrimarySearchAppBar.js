import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { SocketContext } from "../context/socket";
import NotificationComponent from "./NotificationComponent";
export default function PrimarySearchAppBar({
  numberOfCartItems,
  role,
  extraNotifications,
  setExtraNotifications,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const naviagte = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const socket = React.useContext(SocketContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("SRA_userData");
    socket.emit("leave_all_rooms");
    naviagte("/signin");
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {role === "customer" && (
        <MenuItem onClick={() => naviagte("/past-orders")}>
          Past Orders
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {role == "customer" && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => naviagte("/cart")}
          >
            <Badge badgeContent={numberOfCartItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>cart</p>
        </MenuItem>
      )}

      <MenuItem>
        <NotificationComponent
          extraNotifications={extraNotifications}
          setExtraNotifications={setExtraNotifications}
        />
        <p>notifications</p>
      </MenuItem>
      <MenuItem onClick={() => naviagte("/orders")}>Orders Placed</MenuItem>
      {role === "customer" && (
        <MenuItem onClick={() => naviagte("/past-orders")}>
          Past Orders
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#f2eceb", color: "#563c38" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => naviagte("/menu")}
          >
            <RestaurantMenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: "block" }}
            style={{ color: "#ff841c" }}
          >
            Smart Restaurant App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {role === "customer" && (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => naviagte("/cart")}
              >
                <Badge badgeContent={numberOfCartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            <NotificationComponent
              extraNotifications={extraNotifications}
              setExtraNotifications={setExtraNotifications}
            />
            <Button
              onClick={() => naviagte("/orders")}
              variant="outlined"
              style={{
                color: "#563c38",
                borderColor: "#563c38",
              }}
            >
              Orders Placed
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
