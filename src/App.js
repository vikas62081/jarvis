import React, { useState, useEffect } from 'react'
import Input from './input'
import Table from './Table'
import './App.css';
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { getCustomers, getCustomerById } from './dataActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
function App() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [usersData, setUsersData] = useState(null)
  const userColumns = [{ headerName: 'Customer Id', field: 'customerId' },
  { headerName: 'Country', field: 'country' }
    , { headerName: 'Net Assets', field: 'netAssets' }]
  useEffect(() => {
    setTimeout(() => { setUsersData(getCustomers()) }, 1000)
  })
  const giveRecomadations = (value) => {
    console.log()
    const ajxObj = {
      url: 'http://demo9638213.mockable.io/jarvis',
      method: "post",
      data: value,
      headers: {
        "content-type": "application/JSON",
      }
    };
    return axios(ajxObj)
      .then(response => {
        const changedData = response.data.recommended_products.map((v) => ({
          proName: v
        }))
        setPersonalInfo({ ...getCustomerById(value), recProducts: changedData })
        //Perform action based on response

      })
      .catch(error => {
        console.log(error.response);

        return console.log(`Field Should not be empty`);
        //Perform action based on error
      });
  };
const paperStyle={padding: 10,marginBottom:8}
  return (
    <div className="App">
        <Paper style={paperStyle} elevation={3}>
           <Grid><Typography variant="h3" align='center'>Jarvis</Typography></Grid></Paper>
     
      <Grid container container justify="center" spacing={1}>
        <Grid sm={6} xs={12} item>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="subtitle1">My Clients</Typography>
          <div className="ag-theme-alpine" >
            <AgGridReact
              rowData={usersData}
              columnDefs={userColumns}
              domLayout="autoHeight"
              defaultColDef={{ flex: 1 }}
            />
          </div></Paper>
        </Grid>
        <Grid sm={6} xs={12} item> <Paper style={paperStyle} elevation={3} >
          <Typography>Product Recommendation</Typography>
          <Input giveRecomadations={giveRecomadations} /></Paper>
       
          {personalInfo?personalInfo.currentInv? <Paper style={paperStyle} elevation={3}>
            <Grid container>
            <Grid sm={6}><Typography variant="subtitle1" gutterBottom>Credit Score : </Typography></Grid>
            <Grid sm={6}><Typography variant="subtitle1" gutterBottom>{personalInfo.creditScore}</Typography></Grid>
            <Grid sm={6}><Typography variant="subtitle1" gutterBottom>Net Assets ($) : </Typography></Grid>
            <Grid sm={6}><Typography variant="subtitle1" gutterBottom>{personalInfo.netAssets}</Typography></Grid>
            <Grid sm={6}><Typography variant="subtitle1" gutterBottom>Risk Profile Score : </Typography></Grid>
            <Grid sm={6} variant="subtitle1" gutterBottom><Typography>{personalInfo.riskProfileScore}</Typography></Grid>
            <Grid sm={6} variant="subtitle1" gutterBottom><Typography>Portfolio Expected Return: </Typography></Grid>
            <Grid sm={6} variant="subtitle1" gutterBottom><Typography>{personalInfo.portfolioExpectedReturn}%</Typography></Grid>
          </Grid>
          <Grid container style={{margin:20}}>
            <Grid sm={6}>
            <ListSubheader>Current Investments</ListSubheader>
            <List dense>
            {personalInfo.currentInv.map(item=>(<ListItem><ListItemText  primary={item} /></ListItem>) )}
            </List>
            </Grid>
            <Grid sm={6}>
            <ListSubheader>Recommended Investments</ListSubheader>
              <List dense>
            {personalInfo.recProducts.map(item=>(<ListItem><ListItemText  primary={item.proName} /></ListItem>) )}
            </List>
            </Grid>
          </Grid>
          </Paper>:<Paper><ListSubheader>please choose customer id from table </ListSubheader></Paper>:null
} 
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
