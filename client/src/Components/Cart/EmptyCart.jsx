
import { makeStyles, Typography, Box } from '@material-ui/core';
import styles from './EmptyCartStyle.css';

const useStyle = makeStyles({
    component: {
        width: '80%%',
        height: '65vh',
        background: '#fff',
        margin: '80px 140px'
    },
    image: {
        width: '15%'
    },
    container: {
        textAlign: 'center',
        paddingTop: 70
    }
})

const EmptyCart = ({onSuccess}) => {

    return (
        <form method="post" action="#" id="#">
             {/* onSubmit={onSubmit} */}
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file"
                    //    onChange={onInputChange}
                       className="form-control"
                       multiple/>
            </div>

            <button>Submit</button>
        </form>
    )
}
// const EmptyCart = () => {
//     const imgurl = '';
//     const classes = useStyle();

//     return (
//         <Box className={classes.component}>
//             <Box className={classes.container}>
//                 <img src={imgurl} className={classes.image} />
//                 <Typography>Your cart is empty!</Typography>
//                 {/* <span>Add items to it now.</span> */}
//             </Box>
//         </Box>
//     )
// }

export default EmptyCart;