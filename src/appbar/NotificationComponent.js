import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Config from "../config/Config";
import { useEffect, useState, useContext } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import GetReq from "../GetReq";
import Axios from "axios";
import { SocketContext } from "../context/socket";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NotificationComponent({
  extraNotifications,
  setExtraNotifications,
}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const socket = useContext(SocketContext);

  const handleDeleteNotification = async (id) => {
    const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
    setNotifications(
      notifications.filter((notification) => notification._id !== id)
    );
    await Axios.delete(`${Config.API_BASE_URL}notifications/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  useEffect(() => {
    viewNotifications();
    setExtraNotifications(0);
  }, []);
  const viewNotifications = () => {
    GetReq(`${Config.API_BASE_URL}notifications`, setIsLoading)
      .then((res) => {
        setNotifications(res);
        setExtraNotifications(0);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const returnFormattedDate = (x) => {
    const date = new Date(x);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTimeIST = date.toLocaleString("en-US", options);
    return formattedTimeIST;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    viewNotifications();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen}
      >
        <Badge
          badgeContent={notifications.length + extraNotifications}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Notifications
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {notifications.length !== 0 &&
            notifications.map((notification) => (
              <Typography key={notification._id}>
                {notification.message}
                <IconButton
                  color="success"
                  onClick={() => handleDeleteNotification(notification._id)}
                >
                  <DoneAllIcon />
                </IconButton>
                <br></br>
                {returnFormattedDate(notification.createdAt)}

                <hr></hr>
              </Typography>
            ))}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
