
import { makeStyles, Typography, Box } from '@material-ui/core';
import {useEffect,useState} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios'

const useStyle = makeStyles({
    component: {
        width: '80%%',
        height: '65vh',
        background: '#fff',
        margin: '80px 140px'
    },
    image: {
        width: '15%'
    },
    container: {
        textAlign: 'center',
        paddingTop: 70
    }
})


const OrderSuccess = ({sessionId}) => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    const classes = useStyle();
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        axios.post(`http://54.85.12.94:7000/payment/orderupdate/${userId}?sessionId=${localStorage.getItem("sessionId")}`,{},{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then((okay)=>{
            localStorage.removeItem("sessionId");
        });
        setTimeout(() => setRedirect(true), 5000);
        
    }, [])

    

    return (
        redirect ? <Redirect to="/" /> : 
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img src={imgurl} className={classes.image} />
                <Typography>Your order has been successful!</Typography>
                <span>Redirecting to Homepage.</span>
                
            </Box>
        </Box>
        
        // website.location.href = 'http://localhost:3000/'
    )
}

export default OrderSuccess;