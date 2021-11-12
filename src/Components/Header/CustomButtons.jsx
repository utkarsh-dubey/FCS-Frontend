import React, { useState, useContext } from "react";
import { makeStyles, Box, Typography, Badge, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import { useEffect } from "react";
import LoginDialog from "../Login/LoginDialog";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Profile from "./Profile";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  wrapper: {
    margin: "0 5% 0 auto",
    display: "flex",
    "& > *": {
      marginRight: 50,
      textDecoration: "none",
      color: "#FFFFFF",
      fontSize: 12,
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        color: "#2874f0",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  login: {
    color: "#EBAF71",
    background: "#FFFFFF",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    padding: "5px 40px",
    height: 32,
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      background: "#2874f0",
      color: "#FFFFFF",
    },
  },
  modal : {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #000",
    // boxShadow: 24,
    p: 4,
  },
  paperContainer: {
    backgroundColor:'white',
}
}));

// const 
// };

const CustomButtons = () => {
  const classes = useStyle();
//   const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(LoginContext);
  const [gstNumber, setGstNumber] = useState();
  const [panNumber, setPanNumber] = useState();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

//   const cartDetails = useSelector((state) => state.cart);
  const [isSeller, setIsSeller] = useState();
  const [isAdmin, setIsAdmin] = useState();

//   const { cartItems } = cartDetails;
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://18.205.236.51:7000/user/user/${userId}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
      .then((res) => {setIsSeller(res.data.isSeller);setIsAdmin(res.data.isAdmin);console.log(res.data, res.data.isAdmin)});

    var userkiid = localStorage.getItem("firstName");
    if (userkiid) setAccount(userkiid);
  }, []);
  const openDialog = () => {
    setOpen(true);
  };
  const handleClick = () => {
    if (isSeller) {
    //   navigate('/add/product')
    } else {
      handleOpen();
    }
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem("userId");

      const payload = {
          gstNumber: gstNumber,
          panNumber: panNumber,
          isSeller: true
      }
      axios.post(`http://18.205.236.51:7000/user/become/seller/${userId}`, payload,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>console.log(res.data));
      handleClose();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={classes.wrapper}>
        {account ? (
          <Profile account={account} setAccount={setAccount} />
        ) : (
          <Link>
            <Button
              className={classes.login}
              variant="contained"
              onClick={() => openDialog()}
            >
              Login
            </Button>
          </Link>
        )}
        {isSeller ? <Link to="/upload/product">
          <Typography
            // to="/upload/product"
            // onClick={handleClick}
            style={{ marginTop: 2 }}
          >
            Add Product
          </Typography>
        </Link> : <Link>
          <Typography
            // to="/upload/product"
            onClick={handleClick}
            style={{ marginTop: 2 }}
          >
            Become Seller
          </Typography>
        </Link> }
        {isAdmin && (
          <Link >
            <Typography id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClickMenu} style={{ marginTop: 2 }}>
              Admin
            </Typography>
          </Link>
        ) }

<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          <Link to="/admin/user/all" > 
          <MenuItem onClick={handleCloseMenu}>See User</MenuItem>
          </Link>
          <Link to="/admin/user/product">
          <MenuItem onClick={handleCloseMenu}>See Product</MenuItem>
          </Link>
          <Link to="/admin/user/pdf" >
          <MenuItem onClick={handleCloseMenu}>See Pdf</MenuItem>
          </Link>
        {/* <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem> */}
      </Menu>

        <Link to="/cart" className={classes.container}>
          {/* <Badge badgeContent={cartItems?.length} color="secondary"> */}
            <ShoppingCart />
          {/* </Badge> */}
          <Typography style={{ marginLeft: 10 }}>Cart</Typography>
        </Link>
        <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
      </Box>

      {/* <Paper style={classes.paperContainer}></Paper> */}
      
      <Modal  
        style={{ overlay: { background: 'white' } }}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ backgroundColor:'white' }} align ='center' className={classes.modal}>
        <TextField id="standard-basic" label="PAN Number" value={panNumber} onChange={(e)=>setPanNumber(e.target.value)} variant="standard"  />
        <TextField id="standard-basic" label="GST Number" value={gstNumber} onChange={(e)=>setGstNumber(e.target.value)} variant="standard" />
        
        <Link to="/upload/product" className={classes.container}>
        <Button align ='center' onClick={handleSubmit}><h2>Submit</h2></Button>
        </Link>
        </Box>
      </Modal>
    </>
  );
};

export default CustomButtons;
