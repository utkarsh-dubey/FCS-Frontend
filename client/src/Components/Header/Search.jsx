import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, InputBase, List, ListItem } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux'; // hooks
// import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { getProducts } from '../../service/api';

const useStyle = makeStyles(theme => ({
    search: {
        borderRadius: 2,
        marginLeft: 10,
        width: '38%',
        backgroundColor: '#fff',
        display: 'flex'
      },
      searchIcon: {
        marginLeft: 'auto',
        padding: 5,
        display: 'flex',
        color: 'blue'
      },
      inputRoot: {
        fontSize: 'unset',
        width: '100%'
      },
      inputInput: {
        paddingLeft: 20,
        width: '100%',
    },
    list: {
      position: 'absolute',
      color: '#000',
      background: '#FFFFFF',
      marginTop: 36
    }
}))

const Search = () => {
    const classes = useStyle();
    const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    // const getProducts = useSelector(state => state.getProducts);
    // const getProducts = getProducts();
    // const { products } = getProducts;
    // const dispatch = useDispatch();
    
    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
      let { data } = await getProducts();
      // if(!response) 
      //     showError(true);
      // else {
      //     showError(false);
      //     handleClose();
      setProducts(data);
      console.log(data);
  
  }
    // console.log(response);
  
    useEffect(() => {
      fetchProducts();
    }, []);

    // useEffect(() => {
    //     dispatch(listProducts())
    // }, [dispatch])

    return (
        <div className={classes.search}>
            <InputBase
              placeholder="Search "
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {
              text && 
              <List className={classes.list} hidden={open}>
                {
                  products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link 
                        to={`/product/${product._id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true)}  
                      >
                        {product.name}
                      </Link>
                    </ListItem>
                  ))
                }  
              </List>
            }
        </div>
    )
}

export default Search;