import React, { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Paper, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios'; // Import Axios
import { Item } from './CreateDeliveryNotice'; // Import Item interface

interface FormData {
  orderId: string;
  deliveryAddress: string;
  deliveryDate: string;
  items: Item[];
  price: number;
}

export default function DeliveryNoticeForm() {
  const [formData, setFormData] = useState<FormData>({
    orderId: '',
    deliveryAddress: '',
    deliveryDate: '',
    items: [{ itemName: '', itemType: '', quantity: 0 }],
    price: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: '', itemType: '', quantity: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleSubmit = async () => {
    try {
      // Send the deliveryNotice data to the server
      const response = await axios.post('http://localhost:8000/api/note/notes', formData);
      console.log(response.data); // Handle the response from the server as needed
      enqueueSnackbar('Delivery Notice Successfully Created', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error creating Delivery Notice', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          Create Delivery Notice
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                name="orderId"
                label="Order ID"
                fullWidth
                value={formData.orderId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="deliveryAddress"
                label="Delivery Address"
                fullWidth
                value={formData.deliveryAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="deliveryDate"
                label="Delivery Date"
                type="date"
                fullWidth
                value={formData.deliveryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            {formData.items.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <TextField
                    required
                    name={`items[${index}].itemName`}
                    label="Item Name"
                    fullWidth
                    value={item.itemName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name={`items[${index}].itemType`}
                    label="Item Type"
                    fullWidth
                    value={item.itemType}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name={`items[${index}].quantity`}
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={item.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeItem(index)}
                  >
                    Remove Item
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={addNewItem}>
                Add Item
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Create Delivery Notice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
