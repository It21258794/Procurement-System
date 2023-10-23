import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState, useEffect, useContext } from 'react';
// import './RditForm.css';
import { AuthContext } from '../../../auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles()((theme) => ({
  root: {
    margin: '0 auto',
    paddingTop: '5px',
    height: '75vh',
    width: '75vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
  },
  formControl: {
    marginTop: '10px',
    paddingTop: '5px',
  },
  submitBtn: {
    color: 'primary',
    backgroundColor: '#488042',
  },
}));

const BudgetForm = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { address, siteBudget, remBudget, total, siteId } = useParams();
  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  
  const headers = { Authorization: 'Bearer ' + ctx };
  const depAmount = remBudget - total;
  const [state, setState] = useState({
    address: '',
    siteBudget: '',
    amount: '',
    description: '',
  });

  const onInputChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitRequest = async (e: any) => {
    const { description } = state;

    const dto = {
      site_id: siteId,
      curr_budget: siteBudget,
      amount: depAmount,
      location: address,
      description: description,
    };
    try {
      await axios
        .post('http://localhost:8000/api/site/budgetRequest', dto, { headers })
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Succesfully Submited', { variant: 'success' });

          if (res.data.success) {
            setState({
              address: '',
              siteBudget: '',
              amount: '',
              description: '',
            });
          }
          navigate('/manager/sites');
        });
    } catch (err: any) {
      enqueueSnackbar('Not Submited', { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
        validationSchema={Yup.object().shape({
          address: Yup.string().required('Required'),
          siteBudget: Yup.string().required('Required'),
          amount: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
        })}
      >
        {({ errors }: any) => {
          return (
            <>
              <Typography variant="h3" style={{ paddingBottom: '30px' }}>
                Request Form
              </Typography>
              <FormControl className="formControl" variant="outlined">
                <TextField
                  style={{ width: '200px' }}
                  value={address}
                  onChange={onInputChange}
                  name="address"
                  label="Site name"
                  type="text"
                  size="small"
                  disabled={true}
                  error={
                    errors.address && errors.address?.length ? true : false
                  }
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.address}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  style={{ width: '200px' }}
                  value={siteBudget}
                  onChange={onInputChange}
                  // className='txt'
                  name="siteBudget"
                  label="Current Budget"
                  type="text"
                  size="small"
                  disabled={true}
                  error={
                    errors.siteBudget && errors.siteBudget?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.siteBudget}
                </FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  style={{ width: '200px' }}
                  value={depAmount}
                  onChange={onInputChange}
                  // className='txt'
                  name="amount"
                  label="Extra Amount"
                  type="text"
                  size="small"
                  disabled={true}
                  error={errors.amount && errors.amount?.length ? true : false}
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.amount}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextareaAutosize
                  onChange={onInputChange}
                  name="description"
                  minRows={6}
                  required={true}
                  error={
                    errors.description && errors.description?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.description}
                </FormHelperText>
              </FormControl>
              <div
                style={{
                  paddingTop: '20px',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: '200px', backgroundColor: 'orange' }}
                  onClick={submitRequest}
                >
                  Submit
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

export default BudgetForm;
