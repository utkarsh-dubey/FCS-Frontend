import axios from 'axios';

const url = 'http://192.168.2.251:7000/';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/user/user/login`, user)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/user/user/signup`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}
export const getProducts = async (word) => {
    try {
        return await axios.get(`${url}/product/?search=${word}`);
    } catch (error) {
        console.log('Error while getting products response', error);
    }
}

export const addItemToCart= async (item) => {
    try {
        return await axios.post(`${url}/cart/add`, item,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
    } catch (error) {
        console.log('error while calling Add to Cart API: ', error);
    }
}
// export const removeItemFromCart= async (item) => {
//     try {
//         return await axios.post(`${url}/cart/remove/${}`, item)
//     } catch (error) {
//         console.log('error while calling Add to Cart API: ', error);
//     }
// }
export const showCart= async (id) => {
    try {
        return await axios.get(`${url}/cart/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
    } catch (error) {
        console.log('error while calling Show cart API: ', error);
    }
}
export const checkoutCart= async (id) => {
    try {
        return await axios.get(`${url}/cart/checkout/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
    } catch (error) {
        console.log('error while calling Show cart API: ', error);
    }
}
export  const payUsingStripe = async (id) => {
    try {
        console.log('payment api');
        let response = await axios.get(`${url}/payment/checkout/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const sendOtpRequest= async (email) => {
    try {
        return await axios.get(`${url}/user/sendotp?email=${email}`)
    } catch (error) {
        console.log('error while sending OTP: ', error);
    }
}

export const verifyOtpRequest= async (email) => {
    try {
        return await axios.get(`${url}/user/sendotp?email=${email}&otp=$`)
    } catch (error) {
        console.log('error while sending OTP: ', error);
    }
}
// {
//     headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
// }