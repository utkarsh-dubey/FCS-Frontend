import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { checkoutCart, payUsingStripe } from '../../service/api';
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

const Checkout = ({ match, history, setSessionId }) => {
    const classes = useStyle();
    const [data, setData] = React.useState([]);
    const [address, setAddress] = useState([]);

    React.useEffect(()=>{
        const id = localStorage.getItem('userId');
        // axios.get(`https://54.85.12.94:7000/cart/checkout/${id}`)
        // axios.get(`https://54.85.12.94:7000/cart/checkout/${id}`)
        // axios.get(`https://54.85.12.94:7000/cart/checkout/${id}`)
        axios.get(`https://54.85.12.94:7000/cart/checkout/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{
            setData(res.data[0].products) 
            // console.log(res)
            // console.log(res.data[0].products, "{{}}")
        });
        axios.get(`https://54.85.12.94:7000/address/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{
            console.log(res)
            setAddress(res.data)
        });
    }, [])
    const payment = async() => {
        let response = await payUsingStripe(localStorage.getItem('userId'));
        // if(!response) return;
        // handleClose();
        setSessionId(response.sessionId)
        localStorage.setItem("sessionId",response.sessionId);
        window.location.href = response.url;
        // console.log(response);
        // setAccount(signup.firstname);
    }
    
    

    return (
        <>
        {
            data.length > 0 &&
            <div>
                <Grid align='center'> 
                {
                data.map(d=>(
                <>
                {/* <h2>{d.productId.name} and {d.quantity}</h2> */}
                <Grid align='center' item xs={4}>
                    <Card align='center' sx={{ maxWidth: 345 }}> 
                        <CardContent >
                          <Typography gutterBottom variant="h5" component="div">
                            {d.productId.name} and Quantity : {d.quantity}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                           ₹{d.productId.price}/-
                          </Typography>
                        </CardContent>
                        {/* <h2>{}</h2> */}
                    </Card>
                </Grid>
                
                {/* <h2>{}</h2> */}
                </>
            )) 
                }
                {/* <Link to='/checkout' className={classes.container}> */}
                
                {/* <Typography style={{ marginLeft: 10 }}>Cart</Typography> */}
                
                <Button className={classes.checkoutbtn} onClick={() => payment() } >Place Order</Button>
                </Grid>
            {/* </Link> */}
             
            </div>
            
        }
        
        </>

    )
}

export default Checkout;