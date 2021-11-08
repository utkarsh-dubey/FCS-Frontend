import React, { useState, useEffect } from 'react';
import { getProducts } from '../../service/api';
import { Box, Typography, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from "axios";
const useStyles = makeStyles(theme => ({
  component: {
      marginTop: 55,
      background: '#F2F2F2'
  },
  container: {
      background: '#FFFFFF',
      // margin: '0 80px',
      display: 'flex',
      [theme.breakpoints.down('md')]: {
          margin: 0
      }
  },
  rightContainer: {
      marginTop: 50,
      '& > *': {
          marginTop: 10
      }
  },
  price: {
      fontSize: 28
  },
  smallText: {
      fontSize: 14,
  },
  greyTextColor: {
      color: '#878787'
  }
}));

// const data = { 
//   id: '',
//   url: '', 
//   detailUrl: '',
//   title: {
//       shortTitle: '',
//       longTitle: '',
//   }, 
//   price: {
//       mrp: 0,
//       cost: 0,
//       discount: ''
//   },
//   description: '',
//   discount: '', 
//   tagline: '' 
// };
const Products = () => {
  const [products, setProducts] = useState([]);

  const classes = useStyles();
  const fetchProducts = async() => {
    let { data } = await getProducts();
    // if(!response) 
    //     showError(true);
    // else {
    //     showError(false);
    //     handleClose();
    setProducts(data);
    //  const product = data;
        console.log(data);
        // localStorage.setItem("auth_token",response.data.auth_token);
        // localStorage.setItem("firstName",response.data.user.firstName);
        // setAccount(response.data.user.firstName);
    // }
}
  // console.log(response);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  // renderTrails = () => {
    console.log("TRAILS", products)
    if(products){
      const trail= products.map(t => {
        return(
          <Link to={`product/${t._id}`} style={{textDecoration: 'none'}}>
            <div className="card text-center">
            <div className="card" className= "card text-black border-dark mb-3" style={{width: 75 + 'rem' }} >
              {/* <img className="card-img-top" src={t.imgSqSmall ? ( t.imgSqSmall) : ("http://appalachiantrail.org/images/default-source/default-album/trailfocus.jpg?sfvrsn=2")} /> */}
                <div className="card-body">
                  <h1 className="card-title">{t.name}</h1>
                    <h2 className="card-text">{t.price} </h2>
                      <h4 className="card-text">{t.description} </h4>
                
{/* <ul className="list-group list-group-flush"> */}
              {/* <li className="list-group-item">Difficulty: {t.difficulty}</li>
              <li className="list-group-item">Length: {t.length} miles</li>
              <li className="list-group-item">Ascent: {t.ascent} ft, Descent: {t.descent} ft</li>
              <li className="list-group-item">Conditions: {t.conditionStatus}, {t.conditionDetails} </li>
              <li className="list-group-item">High: {t.high} ft, Low: {t.low}</li>
              <li className="list-group-item">Stars: {t.stars}</li>
              <li className="list-group-item"><a href={t.url} target="_blank" rel="noopener noreferrer" className="card-link">Trail Information</a></li> */}
              {/* </ul> */}
              </div>
          </div>
          </div>
          </Link>
        )
      })
      return(
        <div className = "row">
          {trail}
        </div>
      )
    }
  }
  // return (
    // <div>
    //   {products.map((product) => (
    //     <p key={product.id}>{product.title}</p>
    //   ))}
    // </div>
    // <div/>
    // console.log(products)
    // <div className="patient-container">
    //       <button onClick={null}>Click me</button>
    //       {/* {this.subComponent()} */}
    //    </div>
    
  //     <Slide
  //     data={products} 
  //     title='All products'
  //     timer={false} 
  //     multi={true} 
  // />

    // <div>
    //   {products.map(function(d, idx){
    //      return (<li key={idx}>{d.name}</li>)
    //    })}
    //   </div>
    // products
//   );
// }

export default Products;