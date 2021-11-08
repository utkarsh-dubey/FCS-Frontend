import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/api";
import { Box, Typography, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';

const ItemDetail = () =>{
    const { id } = useParams()
    console.log(id)
    const [itemDetail, setItemDetail] = useState([]);

//   const classes = useStyles();
  const fetchItemDetail = async() => {
    let { data } = await getProductById(id);
    setItemDetail(data);
   console.log(data);
        
}
  

  useEffect(() => {
    fetchItemDetail();
  }, []);

    return(
        <p>HI</p>
    )
}

export default ItemDetail;
