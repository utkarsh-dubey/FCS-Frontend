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
        // <p>HI</p>
        <p>
        <h1 className="card-title">{itemDetail.name}</h1>
                    <h2 className="card-text">{itemDetail.price} </h2>
                      <h4 className="card-text">{itemDetail.description} </h4>
                      </p>
    )
}

export default ItemDetail;
