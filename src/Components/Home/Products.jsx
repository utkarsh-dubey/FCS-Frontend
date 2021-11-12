import React, { useState, useEffect } from "react";
import { getProducts } from "../../service/api";
import {
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Button,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    background: "#F2F2F2",
  },
  container: {
    background: "#FFFFFF",
    // margin: '0 80px',
    display: "flex",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
  },
  rightContainer: {
    marginTop: 50,
    "& > *": {
      marginTop: 10,
    },
  },
  price: {
    fontSize: 28,
  },
  smallText: {
    fontSize: 14,
  },
  greyTextColor: {
    color: "#878787",
  },
}));

const Products = ({text, setText}) => {
  const [products, setProducts] = useState([]);
  // console.log(text, "{{}}")
  const [searchWord,setSearchWord] = useState("");
  const classes = useStyles();
  const fetchProducts = async () => {
    let response =await getProducts(text) || {data:[]};
    setProducts(response.data);
    // console.log(data);
  };

  useEffect(() => {
    // console.log("prop passing",props)
    // props?.props.location?.props.location.searchu?.setSearchWord(props.location.searchu)
    // text ? setSearchWord(text):setSearchWord("")
    fetchProducts();
  }, []);
  // renderTrails = () => {
  // console.log("TRAILS", products);
  if (products) {


    const trail = products.map((t) => {
      return (
        <Grid item xs={4}>

        <Link to={`product/${t._id}`} style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={t.images[0]}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {t.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ₹{t.price}/-
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View More</Button>
        {/* <Button size="small">Add to Cart</Button> */}
      </CardActions>
    </Card>
        </Link>
        </Grid>
      );
    });
    return <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    styles={{marginTop: '10px'}}
  >{trail}</Grid>
  }
};
export default Products;
