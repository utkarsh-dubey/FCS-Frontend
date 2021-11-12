import React, {useState} from 'react';
import { Typography, Grid, Paper, TextField, Button, TableCell, TableRow, TableBody, TableHead, Box, Table, TablePagination } from '@material-ui/core';
import axios from 'axios';
import { Link  } from 'react-router-dom';

const AddProduct = ({pdfid}) => {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [images, setImages] = useState();
    const [pic, setPic] = useState([]);
    const [imageBinary, setImageBinary] = useState();
    const [checkIng, setCheckImg] = useState();

    const changeHandler = (e) => {
        setPic([...pic, e.target.files[0]])
        // console.log(e.target.files);
    }
    console.log(pic, pic.length);

    const handleClick = () =>{
        const formData = new FormData();
        console.log(pic)
        pic.map((p, i)=>formData.append('pic'+i, p))
        // formData.append('pic', pic);
        axios.post('http://18.205.236.51:7000/product/imageupload', formData,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{setImages(res.data.links);window.alert("Images uploaded")});
    }

    
    
    const handleSubmit = () => {
        const userId = localStorage.getItem("userId");
        const payload = {
            name, 
    price,
    quantity,
    description,
    sellerId: userId,
    category,
    images: images
        }
        axios.post(`http://18.205.236.51:7000/product/add/${userId}?pdfId=${pdfid}`, payload,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then(res=>{console.log(res.data);window.alert("Product created successfully")})
    }

    return (
        <div>
<h2>Please add Two Images</h2>
      <div>
        {pic && pic.map((p) => p.name)}
        <br />
        <h2>Please click Upload Button to submit the images</h2>
        <input
        accept="image/png, image/gif, image/jpeg"
          style={{ marginTop: "55px" }}
          type="file"
          name="file"
          onChange={changeHandler}
          multiple
        />
{/* <input   style={{marginTop:'55px'}} type="file" name="file" onChange={changeHandler} multiple /> */}

        {pic.length === 2 && (
          <Button onClick={handleClick}>Upload Image</Button>
        )}

            <Paper style={{maxWidth: '500px', marginLeft: '25px', marginTop: '100px', textAlign:"center"}} elsevation={2} >
      
      <Grid container spacing={3}>
        <br />
        <Grid item xs={12} md={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            // disabled={true}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="price"
            label="price"
            type="number"
            fullWidth
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="quantity"
            label="quantity"
            type="number"
            onChange={(e)=>setQuantity(e.target.value)}
            fullWidth
            value={quantity}
            //   onChange={(e) => setBoxIntact(e.target.value)}
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="description"
            label="description"
            onChange={(e)=>setDescription(e.target.value)}
            // type="number"
            fullWidth
            value={description}
            //   onChange={(e) => setColor(e.target.value)}data.
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="category"
            label="category"
            // type="number"
            onChange={(e)=>setCategory(e.target.value)}
            fullWidth
            value={category}
            //   onChange={(e) => setMinAge(e.target.value)}data.
            // disabled={true}
          />
        </Grid>
       
      </Grid>

      <Button onClick={handleSubmit} >Submit</Button>
      
    </Paper>
        </div>
        </div>
    )
}

export default AddProduct
