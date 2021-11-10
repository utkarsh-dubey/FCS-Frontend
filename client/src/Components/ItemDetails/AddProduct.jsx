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
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
      };
    console.log(pic, pic.length);
    if(pic.length===2) {
        let arr = [];
        getBase64(pic[0]).then(res=>{
            // setImageBinary([...imageBinary, res.data])
            console.log(res)
            arr.push(res);
        })
        getBase64(pic[1]).then(res=>{
            // setImageBinary([...imageBinary, res.data])
            arr.push(res);
        })
        console.log(arr[0], arr[1], "{{}}")
        axios.post('http://localhost:7000/products/imageupload', {
            image: arr
        }).then(res=>console.log(res.data))
        setPic([...pic, 'ppp'])
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
