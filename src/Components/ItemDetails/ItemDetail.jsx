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
import { Select, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";

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
  const url = 'https://192.168.2.251:7000';

  // console.log(id);
  const [itemDetail, setItemDetail] = useState([]);
  const [cart, setCart] = useState(cartInitialValues);
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [email, setEmail] = useState();
  // const onValueChange = (e) => {
  //     console.log("quantity:",e.target.value)
  //     setCart({ ...cart, [e.target.name]: e.target.value });
  // }

  const classes = useStyle();
  const fetchItemDetail = () => {
    axios.get(`${url}/product/${id}`).then(res=>{
      setItemDetail(res.data);
      // console.log(res.data, "{{}}");
      setImages(res.data.images);
    });
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
    // console.log(response, "{{}}");
  };
  // console.log("cartvalue", cart);

  useEffect(() => {
    fetchItemDetail();
  }, []);
  // console.log("qwerty", itemDetail);
  const handleShare = () => {
    var userkiid = localStorage.getItem("userId");

    axios.post(`${url}/product/share/${userkiid}`, {
      productId: id, email: email
    },{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{console.log(res.data)})
  }
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
          {images.length>0 && images.map(m => (
            <>
            <img
            height="160"
            src={m}
            alt="Paella dish"
          />
            </>
            
          ))}
          
        </Grid>
      
      <Grid item xs={6} >
        <Typography>{itemDetail.price}</Typography>
        <Typography>{itemDetail.description}</Typography>
        {/* <TextField style={{marginTop: '15px'}} value={email} onChange={(e) => setQuantity(e.target.value)} /> */}
      <FormControl size="large" >
          <InputLabel id="simple-select">Quantity</InputLabel>
          <Select
            labelId="simple-select"
            id="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            name="quantity"
            style = {{width:100}}
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
        <br/>
        <TextField style={{marginTop: '15px'}} value={email} onChange={(e)=>setEmail(e.target.value)} />
        <br />
        <Button onClick={handleShare} >Share</Button>
      </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;
