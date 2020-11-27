import React from 'react'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Formik,Form, Field,ErrorMessage } from 'formik'
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: '25ch',
    display: "flex",
    flexDirection: "column",
    

  },
  container: {
    marginTop: "4px",
    marginBottom:"20px"
  },
  error:{
    color:"red",
    
  }
}));
const initialValues ={
  customerId : ""
}
const formSchema=Yup.object().shape({
  customerId:Yup.string().required('Required')
})
const InputTextBox = ({giveRecomadations}) => {
  const classes = useStyles();
  return (
    <div >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit ={(values, props)=>{
            giveRecomadations(values.customerId)
        }}
      >
        {props => (
      <Form autoCapitalize autoComplete='off' >
      <Field id="outlined-basic" name = "customerId" label="Customer ID" placeholder="Enter customer id"
        as={TextField} fullWidth required InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton><ArrowForwardIcon type="submit"/>
            </IconButton></InputAdornment>,
        }} helperText={<ErrorMessage name="customerId" />}/>
    </Form>
        )}
    </Formik>
    </div>
  );
}

export default InputTextBox;
