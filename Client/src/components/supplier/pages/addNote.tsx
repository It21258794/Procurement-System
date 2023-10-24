import * as React from 'react';
import { SyntheticEvent, useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

interface Item {
  id: string;
  // date: Date;
  description: string;
}

const CreateDeliveryNotice: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  const headers = { Authorization: 'Bearer ' + ctx };

  const [deliveryNotice, setDeliveryNotice] = useState<{
    orderId: string;
    // deliveryDate: string;
    description: string;
  }>({
    orderId: '',
    // deliveryDate: '',
    description: ''
  });

  const { orderId } = useParams();
  const navigate = useNavigate();


  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const validateRequired = (value: string) => {
    if (!value) {
      return 'This field is required';
    }
    return '';
  };

  //  const validateFutureDate = (value: string) => {
  //   const selectedDate = new Date(value);
  //   const currentDate = new Date();
  //   if (selectedDate <= currentDate) {
  //     return 'Please select a date in the future';
  //   }
  //   return '';
  // };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    setDeliveryNotice({ ...deliveryNotice, [name]: value });
    // const error = validateRequired(value);

     let error = '';
     if (name === 'orderId') {
      error = validateRequired(value);
      if (value.length !== 24) { // Check if the Order ID has exactly 24 characters
        error = 'Order ID must be 24 characters';
      }
    }
  // else if (name === 'deliveryDate') {
  //     error = validateRequired(value);
  //     error = validateFutureDate(value);
  //   } 
  else if (name === 'description') {
    // Add a custom validation for the description field (e.g., minimum length)
    if (value.length < 3) {
      error = 'Description must be at least 3 characters';
    }
  }
  
  setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    navigate(`/supplier/viewNotes`);


    // Check if any of the fields are empty
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      // If there's an error, show an error alert
      setAlertSeverity('error');
      setAlertMessage('Error creating order');
      setAlertOpen(true);
      return;
    }

    // const orderIdExists = await checkOrderIdExists(deliveryNotice.orderId);

    // if (!orderIdExists) {
    //   setAlertSeverity('error');
    //   setAlertMessage('Order ID does not exist');
    //   setAlertOpen(true);
    //   return;
    // }

    let noteDetails = {
      orderId:orderId,
      // address: deliveryNotice.deliveryAddress,
      // requiredDate: deliveryNotice.deliveryDate,
      description: deliveryNotice.description
    };

    console.log(noteDetails);
    await axios.post('http://localhost:8000/api/note/notes', noteDetails, { headers });

    // If the order is created successfully, show a success alert
    setAlertSeverity('success');
    setAlertMessage('Order created successfully');
    setAlertOpen(true);
  };

  const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  

  // const checkOrderIdExists = async (orderId: string): Promise<boolean> => {
  //   try {
  //     // Make an API request to check if the order ID exists
  //     const response = await axios.get(`http://localhost:8000/api/order/getOrderById/${orderId}`, { headers });
  //     return response.data.exists; // You need to adjust this based on your API response
  //   } catch (error) {
  //     console.error('Error checking order ID:', error);
  //     return false;
  //   }
  // };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          Create Delivery Notice
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Order ID"
            name="orderId"
            value={orderId}
            onChange={handleInput}
            error={Boolean(errors.orderId)}
            helperText={errors.orderId}
            disabled={true}

          />
          {/* <TextField
            fullWidth
            label="Delivery Address"
            name="deliveryAddress"
            value={deliveryNotice.deliveryAddress}
            onChange={handleInput}
            error={Boolean(errors.deliveryAddress)}
            helperText={errors.deliveryAddress}
          /> */}
          {/* <TextField
            fullWidth
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            value={deliveryNotice.deliveryDate}
            onChange={handleInput}
            error={Boolean(errors.deliveryDate)}
            helperText={errors.deliveryDate}
          /> */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={deliveryNotice.description}
            onChange={handleInput}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Create Delivery Notice
          </Button>
        </form>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={alertSeverity}
          onClose={handleCloseAlert}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default CreateDeliveryNotice;
