import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addItemToCart, getProductById } from "../../service/api";
import {
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Button,
  Grid,
  Paper
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import axios from 'axios'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { LaptopWindows } from "@material-ui/icons";

const useStyle = makeStyles({
  select: {
    "&:after": {
      borderBottomColor: "darkred",
    },
    "& .MuiSvgIcon-root": {
      color: "darkred",
    },
  },

  addtocartbtn: {
    textTransform: "none",
    background: "#FB641B",
    color: "#fff",
    height: 48,
    borderRadius: 2,
  },
});
const cartInitialValues = {
  userId: "",
  quantity: "",
  productId: "",
};

const ItemDetail = () => {
  const { id } = useParams();
  const url = 'http://localhost:7000';

  console.log(id);
  const [itemDetail, setItemDetail] = useState([]);
  const [cart, setCart] = useState(cartInitialValues);
  const [quantity, setQuantity] = useState(0);
  // const onValueChange = (e) => {
  //     console.log("quantity:",e.target.value)
  //     setCart({ ...cart, [e.target.name]: e.target.value });
  // }

  const classes = useStyle();
  const fetchItemDetail = () => {
    axios.get(`${url}/product/${id}`).then(res=>setItemDetail(res.data));
    // console.log(data);
  };
  const addToCart = async () => {
    var userkiid = localStorage.getItem("userId");
    var payload = {
      userId: userkiid,
      quantity: quantity,
      productId: itemDetail._id,
    };
    window.alert("Item added to cart")
    // payload.userId = ;
    // payload.productId = ;
    // payload.quantity = ;
    setCart(payload);
    let response = await addItemToCart(payload);

    // setItemDetail(data);
    console.log(response, "{{}}");
  };
  console.log("cartvalue", cart);

  useEffect(() => {
    fetchItemDetail();
  }, []);
  console.log("qwerty", itemDetail._id);
  return (
    <Paper style={{ textAlign: " center", maxWidth: "800px", border: '1px red', height: '500px' }}>
      <Typography>{itemDetail.name}</Typography>
      {/* <CardHeader title={itemDetail.name} subheader={itemDetail.description} /> */}
      {/* <Grid */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6} >
          <img
            // component="img"
            // height="140"
            src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
            alt="Paella dish"
          />
        </Grid>
      
      <Grid item xs={6} >
        <Typography>{itemDetail.price}</Typography>
        <Typography>{itemDetail.description}</Typography>
      <FormControl size="medium">
          <InputLabel id="simple-select">Quantity</InputLabel>
          <Select
            labelId="simple-select"
            id="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            
            name="quantity"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <IconButton aria-label="add to cart">
          <Button className={classes.addtocartbtn} onClick={quantity?() => addToCart():()=>window.alert("Please select quantity")}>
            Add to Cart
          </Button>
        </IconButton>
      </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;
