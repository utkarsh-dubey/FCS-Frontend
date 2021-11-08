import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addItemToCart, getProductById } from "../../service/api";
import { Box, Typography, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';



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
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    }

})
const cartInitialValues = {
    userId: '',
    quantity: '',
    productId: ''
};

const ItemDetail = () =>{
    const { id } = useParams()
    console.log(id)
    const [itemDetail, setItemDetail] = useState([]);
    const [ cart, setCart ] = useState(cartInitialValues);
    const [ quantity, setQuantity] = useState(0);
    // const onValueChange = (e) => {
    //     console.log("quantity:",e.target.value)
    //     setCart({ ...cart, [e.target.name]: e.target.value });
    // }

  const classes = useStyle();
  const fetchItemDetail = async() => {
    let { data } = await getProductById(id);
    setItemDetail(data);
   console.log(data);
        
}
const addToCart = async() => {
    var payload = {
        userId: '',
        quantity: '',
        productId: ''
    }
    var userkiid=localStorage.getItem("userId")
    payload.userId = userkiid
    payload.productId = itemDetail._id
    payload.quantity = quantity
    setCart(payload)
    // var productid = itemDetail._id
    // setCart({ ...cart, ["productId"] : productid});
    // console.log("productid",productid,itemDetail)
   
    // console.log("cartvalue",cart);
    let response = await addItemToCart(payload);

    // setItemDetail(data);
//    console.log(response);
        
}
console.log("cartvalue",cart);

  useEffect(() => {
    fetchItemDetail();
    // var userkiid=localStorage.getItem("userId")
    // setCart( {...cart, ["userId"] : userkiid});
    
    // console.log("userwaliid",userkiid)

  }, []);
//   console.log("acchaaccha")
  console.log("qwerty",itemDetail._id)
    return(

        <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={itemDetail.name}
        subheader={itemDetail.description}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
 
        <FormControl size='medium'>
        <InputLabel id="simple-select">
          Quantity
        </InputLabel>
        <Select
          labelId="simple-select"
          id="quantity"
          onChange = {(e)=>setQuantity(e.target.value)}
          defaultValue = {0}
          name="quantity"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
        <IconButton aria-label="add to cart">
        <Button className={classes.addtocartbtn} onClick={() => addToCart()} >Add to Cart</Button>
          {/* <FavoriteIcon /> */}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon /> */}
        {/* </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      {/* </Collapse> */}
    </Card>
  );
    


}

export default ItemDetail;
