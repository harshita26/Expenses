import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import PostMessages from "./components/PostMessages";
import { store } from "./actions/store";
import { Container, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

function App() {
  return (
    <Provider store={store}>      
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={8}>
            <Typography
              variant="h4"
              align="left">
              MY EXPENSES
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              align="left">
              Total
            </Typography>
          </Grid>
        </Grid>
        <PostMessages />
        <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
      </Container>
    </Provider>
  );
}

export default App;
