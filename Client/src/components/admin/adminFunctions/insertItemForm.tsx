import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
interface ItemDetails {
  itemName: string;
  type: string;
  quantity: string;
  price: string;
  supplierUsername: string;
}

export default function ItemForm() {
  const [itemDetails, setItemDetails] = React.useState<ItemDetails>({
    itemName: '',
    type: '',
    quantity: '',
    price: '',
    supplierUsername: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setItemDetails({
      ...itemDetails,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    // Send a POST request to your server to create a new item.
    fetch('http://localhost:8000/api/item/createItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any authorization headers if needed
      },
      body: JSON.stringify(itemDetails),
    })
      .then((response) => {
        if (response.ok) {
          enqueueSnackbar('Item created successfully', { variant: 'success' });
          console.log('Item created successfully');
          // Reset the form fields if needed
          setItemDetails({
            itemName: '',
            type: '',
            quantity: '',
            price: '',
            supplierUsername: '',
          });
        } else {
          console.error('Failed to create item');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Item Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="itemName"
            label="Item Name"
            fullWidth
            value={itemDetails.itemName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="type"
            label="Type"
            fullWidth
            value={itemDetails.type}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="quantity"
            label="Quantity"
            fullWidth
            value={itemDetails.quantity}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="price"
            label="Price"
            fullWidth
            value={itemDetails.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="supplierUsername"
            label="Supplier Username"
            fullWidth
            value={itemDetails.supplierUsername}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Item
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
