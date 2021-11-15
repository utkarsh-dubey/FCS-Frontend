import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
// import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import { Link } from 'react-router-dom';
// import { post } from '../../utils/paytm';
import { checkoutCart, payUsingPaytm } from '../../service/api';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const useStyle = makeStyles(theme => ({

    
    component: {
        // marginTop: 55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    leftComponent: {
        // width: '67%',
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    checkoutbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

var removeCart = {
    productId: {},
    quantity: '',
    _id: ''
};

const Cart = ({ match, history }) => {
    const classes = useStyle();
    const [data, setData] = React.useState([]);
    const [remove, setRemove] = useState(removeCart);
    const [redirect, setRedirect] = useState(false);
    
    React.useEffect(()=>{
        
        const id = localStorage.getItem('userId');
        axios.get(`https://192.168.2.251:7000/cart/${id}`, {headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{
            setData(res.data[0].products) 

            console.log(res.data[0].products, "{{}}")
        });
        setRedirect(false);
    }, [])

    
    const releaseCart = async(d) => {
        // let response = await checkoutCart(localStorage.getItem('userId'));
        const id = localStorage.getItem('userId');
        axios.post(`https://192.168.2.251:7000/cart/remove/${id}`,d,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{
            // setData(res.data[0].products) 
            // console.log(res.data[0].products, "{{}}")
        });
        setRedirect(true);
        // if(!response) return;
        // handleClose();
        // console.log(response);
        // setAccount(signup.firstname);
    }
    

    return (
        redirect ? <Redirect to="/" /> :
        <>
        {
            data.length > 0 ? 
            <div>
                <Grid align='center'> 
                {
                data.map(d=>(
                <>
                {/* <h2>{d.productId.name} and Quantity : {d.quantity}</h2> */}
                {/* {
                              removeCart._id=d._id,
                              removeCart.quantity=d.quantity,
                              removeCart.productId=d.productId

                } */}
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}> 
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {d.productId.name} and Quantity : {d.quantity}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                           ₹{d.productId.price}/-
                          </Typography>
                          
                          <Button className={classes.placeOrder} onClick={() => releaseCart(d) } >Remove</Button>
                        </CardContent>
                        {/* <h2>{}</h2> */}
                    </Card>
                </Grid>
                </>
            )) 
                }
                <Link to='/checkout' className={classes.container}>
                
                {/* <Typography style={{ marginLeft: 10 }}>Cart</Typography> */}
                <Button className={classes.checkoutbtn} >Checkout</Button>
                
            </Link>
            </Grid>
            </div>
            : <EmptyCart />
        }
        
        </>
        

    )
}

export default Cart;