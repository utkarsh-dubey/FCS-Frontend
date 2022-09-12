import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';
import { Typography, Grid, Paper, TextField, Button, TableCell, TableRow, TableBody, TableHead, Box, Table, TablePagination } from '@material-ui/core';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import { useEffect } from "react";

const useStyle = makeStyles({
    component: {
        width: '80%%',
        height: '65vh',
        background: '#fff',
        margin: '80px 140px'
    },
    savebtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
})

const MyProfile = () => {
    const classes = useStyle();
    
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [gstNumber, setGstNumber] = useState();
    const [panNumber, setPanNumber] = useState();
    const [phoneNumber, setPhoneNumber] = useState();    
    
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        // console.log(userId);
        var userfirstname = localStorage.getItem("firstName");
        // console.log(userfirstname);
        axios
          .get(`https://54.85.12.94:7000/user/user/${userId}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
          .then((res) => {console.log(res.data);
                        setFirstName(res.data.firstName);
                        setLastName(res.data.lastName);
                        setEmail(res.data.email);
                        setGender(res.data.gender);
                        setGstNumber(res.data.gstNumber);
                        setPanNumber(res.data.panNumber);
                        setPhoneNumber(res.data.phoneNumber);
                        });
        //   .then((res) => {setIsSeller(res.data.isSeller);setIsAdmin(res.data.isAdmin);console.log(res.data, res.data.isAdmin)});
        
        

    }, []);


    // const [commission, setCommission] = useState();
    const handleSave = () => {
        const userId = localStorage.getItem("userId");
    
          const payload = {
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              gstNumber: gstNumber,
              panNumber: panNumber,
              phoneNumber: phoneNumber
          }
          axios.post(`https://54.85.12.94:7000/user/update/${userId}`, payload,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>console.log(res.data));
      }

    return (
        <div align='center'>
            <h1 style={{ marginTop: '100px'}}> User Profile </h1>
            <Paper style={{maxWidth: '600px', marginLeft: '25px', marginTop: '50px', textAlign:"center"}} elsevation={4} >
      
      <Grid container spacing={3}>
        <br />
        <Grid item xs={12} md={6}>
            <h4> FirstName</h4>
          <TextField
            name="name"
            // label="FirstName"
            fullWidth
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12} md={6}>
        <h4> LastName</h4>
          <TextField
            name="name"
            // label="LastName"
            fullWidth
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <h4> Email Id</h4>
          <TextField
            name="email"
            fullWidth
            value={email}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <h4> Gender</h4>
          <TextField
            name="gender"
            // label="gender"
            // type="number"
            onChange={(e)=>setGender(e.target.value)}
            fullWidth
            value={gender}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h4> GST number</h4>
          <TextField
            name="GST number"
            onChange={(e)=>setGstNumber(e.target.value)}
            fullWidth
            value={gstNumber}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h4> PAN number</h4>
          <TextField
            name="PAN number"
            onChange={(e)=>setPanNumber(e.target.value)}
            fullWidth
            value={panNumber}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h4> Phone number</h4>
          <TextField
            name="Phone number"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            fullWidth
            value={phoneNumber}
          />
        </Grid>
       
      </Grid>

      <Button className={classes.savebtn} onClick={handleSave} >Save</Button>
      {/* <Button >Save</Button> */}
    </Paper>
        </div>
    )
}


export default MyProfile;