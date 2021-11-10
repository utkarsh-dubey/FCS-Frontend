import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { authenticateLogin, authenticateSignup, sendOtpRequest } from '../../service/api';
import Modal from "@mui/material/Modal";
// import { alertService } from '../_services';
import axios from "axios";

const useStyle = makeStyles({
    component: {
        height: '70vh',
        width: '90vh',
        maxWidth: 'unset !important'
    },
    image: {
        backgroundImage: `url(${''})`,
        background: '#EBAF71',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
        width: '40%',
        padding: '45px 35px',
        '& > *': {
            color: '#FFFFFF',
            fontWeight: 600
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    createText: {
        margin: 'auto 0 5px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer'
    },
    error: {
        fontSize: 12,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
})

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    },
    OTP: {
        view: 'OTP',
        heading: "Enter OTP to signup",
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, showError] = useState(false);
    const [ error2, showError2] = useState(false);
    const [ error3, showError3] = useState(false);
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const [openModal, setOpenModal] = React.useState(false);
    const [ otp, setOtp] = useState("");
    const [ isverify, setIsverify] = useState();
    const handleOpen = () => setOpenModal(true);

    useEffect(() => {
        showError(false);
        showError2(false);
        showError3(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(!response) 
            showError(true);
        else {
            showError(false);
            // alertService.success('Success!!', { autoClose, keepAfterRouteChange })
            handleClose();
            window.alert("Logged in Successfully");
            console.log(response);
            localStorage.setItem("auth_token",response.data.auth_token);
            localStorage.setItem("firstName",response.data.user.firstName);
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("isAdmin", response.data.user.isAdmin);

            setAccount(response.data.user.firstName);
        }
    }

    const signupUser = async() => {
        axios.get(`http://localhost:7000/user/verifyotp?email=${signup.email}&otp=${otp}`).then(res=>setIsverify(res.data.message))
        if(isverify)
        {
            showError2(false);
            
            console.log("verify ho gya")
            let response = await authenticateSignup(signup)
            handleClose();
            console.log(response);
            window.alert("Account created successfully")
            setAccount(signup.firstname);
        }
        else
            showError2(true);
            // console.log("verify nhi hua")
        // let response = await authenticateSignup(signup);
        // if(!response) 
        //     showError(true);
        // else
        // {

        // handleClose();
        // console.log(response);
        // setAccount(signup.firstname);
        // }
    }
    const toggleOTP = async() => {
        // if (false) {
        // //   navigate('/add/product')
        // } else {
        //     handleClose();
        //   handleOpen();
        // }
        // const emailid =
        // {
        //     email : signup.email
        // }
        let response = await sendOtpRequest(signup.email)
        console.log(signup.email)
        console.log(response,"aaajja otp")
        if(!response)
        {
            showError3(true);
        }
        else
        {
            showError3(false);
        toggleAccount(accountInitialValues.OTP)
        }
      };
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component} >
                <Box style={{display: 'flex'}}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ? 
                        <Box className={classes.login}>
                            <TextField onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            { error && <Typography className={classes.error}>Please enter valid Email ID/Password</Typography> }
                            <TextField type='password' onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                            <Typography className={classes.text}>By continuing, you agree to Cozmolane's Terms of Use and Privacy Policy.</Typography>
                            <Button className={classes.loginbtn} onClick={() => loginUser()} >Login</Button>
                            {/* <Typography className={classes.text} style={{textAlign:'center'}}>OR</Typography> */}
                            {/* <Button className={classes.requestbtn}>Request OTP</Button> */}
                            <Typography className={classes.createText} onClick={() => toggleSignup()} >New to Cozmolane? Create an account</Typography>
                        </Box> : 
                        account.view ==='signup' ?
                        <Box className={classes.login}>
                            <TextField required={true} onChange={(e) => onInputChange(e)} name='firstName' label='Enter Firstname' />
                            <TextField onChange={(e) => onInputChange(e)} name='lastName' label='Enter Lastname' />
                            {/* <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter Username' /> */}
                            <TextField required={true} type='email' onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField required={true} type='password' onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField onChange={(e) => onInputChange(e)} name='gender' label='Enter Gender' />
                            <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            { error3 && <Typography className={classes.error}>User already exist please login</Typography> }
                            {
                                signup.email.includes('@') &&<Button className={classes.loginbtn} onClick={() => toggleOTP()} >Continue</Button>}
                            </Box>
                            :
                            <Box className={classes.login}>
                            <TextField id="standard-basic" label="OTP" onChange={(e)=>setOtp(e.target.value)} variant="standard"  />
                            { error2 && <Typography className={classes.error}>Wrong OTP or OTP expired</Typography> }
                            <Button className={classes.loginbtn} onClick={() => signupUser()}>Submit</Button>
                            
                        </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;