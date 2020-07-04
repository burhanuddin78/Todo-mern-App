import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Header from './components/Header';

import { BrowserRouter, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Register from './components/Register';
import HomeScreen from './components/HomeScreen';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grid container direction='column'>
          <Grid item>
            <Header />
          </Grid>

          <Grid item container>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              <Route path='/' exact={true} component={HomeScreen} />
              <Route path='/signin' component={Signin} />
              <Route path='/Register' component={Register} />
            </Grid>
            <Grid item xs={false} sm={2} />
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
