import React, { useState, useEffect } from 'react';
import { getProducts } from '../../service/api';


import Axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = getProducts();
    const products = data;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    // <div>
    //   {products.map((product) => (
    //     <p key={product.id}>{product.title}</p>
    //   ))}
    // </div>
    <div/>
    // products
  );
}

export default Products;