import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, InputBase, List, ListItem } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux'; // hooks
// import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { getProducts } from '../../service/api';
import Products from '../Home/Products';

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

const Search = ({text, setText}) => {
    const classes = useStyle();
    const [ textBox, setTextBox ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (textt) => {
        setTextBox(textt);
        setOpen(false)
    }

    
    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
      let { data } = await getProducts("") || {data:[]};
      // console.log(data, "{{}}")
      setProducts(data);
      // console.log(data);
  }
  const searchDialog = async() => {
    setText(textBox)
  }
    // console.log("textt",text)
    useEffect(() => {
      fetchProducts();
    }, []);


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
            
            {
              textBox && 
              <List className={classes.list} hidden={open}>
                {
                  products.filter(product => product.name.toLowerCase().includes(textBox.toLowerCase())).map(product => (
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
            {
              textBox &&
            
            <Link to='/products'>
            
            <div className={classes.searchIcon} >
              <SearchIcon onClick={()=>searchDialog()}/>
            </div>
            </Link>
            }
        </div>
    )
}

export default Search;