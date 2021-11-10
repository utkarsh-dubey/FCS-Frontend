import React, {useState} from 'react';
import { Typography, Grid, Paper, TextField, Button, TableCell, TableRow, TableBody, TableHead, Box, Table, TablePagination } from '@material-ui/core';
import axios from 'axios';
import { Link  } from 'react-router-dom';

const AddProduct = () => {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [images, setImages] = useState();
    const [pic, setPic] = useState([]);
    const [imageBinary, setImageBinary] = useState();

    const changeHandler = (e) => {
        setPic([...pic, e.target.files[0]])
        // console.log(e.target.files);
    }
    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            return (baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };
    console.log(pic);
    if(pic.length===2) {
        getBase64(pic[0]).then(res=>{
            axios.post('http://localhost:7000/products/imageupload', {
            image: res.result
        }).then(res1=>console.log(res1.data))
        })
        getBase64(pic[1]).then(res=>{
            axios.post('http://localhost:7000/products/imageupload', {
            image: res.result
        }).then(res1=>console.log(res1.data))
        })
        
        // axios.post('http://localhost:7000/products/imageupload', {
        //     image: getBase64(pic[1])
        // }).then(res=>console.log(res.data))
    }
    // const [commission, setCommission] = useState();
    const handleSubmit = () => {
        const userId = localStorage.getItem("userId");
        const payload = {
            name, 
    price,
    quantity,
    description,
    sellerId: userId,
    category,
    images: ["https://www.tutsmake.com/wp-content/uploads/2021/06/React-JS-Multiple-Image-Upload-with-Preview.jpg", "https://www.tutsmake.com/wp-content/uploads/2021/06/React-JS-Multiple-Image-Upload-with-Preview.jpg"]
        }
        axios.post(`http://localhost:7000/product/add/${userId}?pdfId=618add235138b6f132e0b268`, payload).then(res=>console.log(res.data))
    }

    return (
        <div>

<input style={{marginTop:'55px'}} type="file" name="file" onChange={changeHandler} multiple />

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
    )
}

export default AddProduct
