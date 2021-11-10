import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { Theme } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    component: {
        marginTop: 40,
    },
    container: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
          display: "block",
        },
      },
    logout: {
        fontSize: 14,
        marginLeft: 20
    }
}))

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        // this.forceUpdate();
    };

    const logout = () => {
        setAccount('');
        localStorage.clear();
    }
    
    return (
        <>
            <Link onClick={handleClick}><Typography style={{ marginTop: 2 }}>{account}</Typography></Link>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <Link to="/myProfile" > 
                <MenuItem onClick={() => { handleClose() }}>
                <Typography className={classes.logout}>Profile</Typography>
                </MenuItem>
                </Link>
                <MenuItem onClick={() => { handleClose(); logout();}}>
                    
                
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Typography className={classes.logout}>Logout</Typography>
                    {/* <Typography onClick={handleSell} className={classes.logout}>Do you wnat to sell?</Typography> */}
                </MenuItem>
            </Menu>
        </>
    )    
}

export default Profile;