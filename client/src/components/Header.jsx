import React from 'react';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';



// Reducers
import {logout} from '../actions/userActions'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
 
  title: {
    flexGrow: 3,
    marginLeft: theme.spacing(3),
  },
}));

const Header =( ) =>{
  const classes = useStyles();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();



  const handleLogout = (e) => {
    dispatch(logout());
    window.location.href = '/signin';
  };

    return (
      <div className={classes.root}>

        {/* Sigin Form */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
            {    userInfo ? userInfo.name: null}
          {
            userInfo?
            <Link to="/Signin" style={{ color: '#FFF', textDecoration: 'none', margin:'1rem'}}>

           <Button color="inherit"  onClick={handleLogout}>  
              Logout 
            </Button>
            </Link>:

          <Link to="/Signin" style={{ color: '#FFF', textDecoration: 'none', marginleft:'2'}}>

           <Button color="inherit">  
                Sigin
            </Button>
            </Link>
}      </Toolbar>
      </AppBar>
    </div>
  );
    
}


export default Header