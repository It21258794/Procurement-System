import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';

interface Item {
  itemName: string;
  itemType: string;
  quantity: number;
}

const CreateDeliveryNotice: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deliveryNotice, setDeliveryNotice] = useState<{
    orderId: string;
    deliveryAddress: string;
    deliveryDate: string;
    items: Item[];
    price: number; // Add the "price" field
  }>({
    orderId: "",
    deliveryAddress: "",
    deliveryDate: "",
    items: [{ itemName: "", itemType: "", quantity: 0 }],
    price: 0, // Initialize with a default value
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    setDeliveryNotice({ ...deliveryNotice, [name]: value });
  };

  const handleItemInput = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedItems = [...deliveryNotice.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setDeliveryNotice({ ...deliveryNotice, items: updatedItems });
  };

  const addNewItem = (): void => {
    setDeliveryNotice({
      ...deliveryNotice,
      items: [...deliveryNotice.items, { itemName: "", itemType: "", quantity: 0 }],
    });
  };

  const removeItem = (index: number): void => {
    const updatedItems = [...deliveryNotice.items];
    updatedItems.splice(index, 1);
    setDeliveryNotice({ ...deliveryNotice, items: updatedItems });
  };

  const validateInputs = (): void => {
    const itemErrors: string[] = [];
    for (const item of deliveryNotice.items) {
      if (
        item.itemName.trim() === "" ||
        item.itemType.trim() === "" ||
        isNaN(item.quantity) ||
        item.quantity <= 0
      ) {
        itemErrors.push("Invalid item");
      }
    }
    setErrors({ ...errors, items: itemErrors });
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {

    event.preventDefault();

    validateInputs();

    let noteDetails = {}
    noteDetails = deliveryNotice;
    await axios.post('http://localhost:8000/api/note/notes',noteDetails);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      // Handle the submission of deliveryNotice here
      console.log(deliveryNotice);
    }
  };

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
            value={deliveryNotice.orderId}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            label="Delivery Address"
            name="deliveryAddress"
            value={deliveryNotice.deliveryAddress}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            value={deliveryNotice.deliveryDate}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={deliveryNotice.price}
            onChange={handleInput}
          />
          {deliveryNotice.items.map((item, index) => (
            <div key={index}>
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={item.itemName}
                onChange={(event) => handleItemInput(event, index)}
              />
              <TextField
                fullWidth
                label="Item Type"
                name="itemType"
                value={item.itemType}
                onChange={(event) => handleItemInput(event, index)}
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(event) => handleItemInput(event, index)}
              />
              <Button variant="contained" color="secondary" onClick={() => removeItem(index)}>
                Remove Item
              </Button>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={addNewItem}
            style={{ marginTop: '16px' }}
          >
            Add Item
          </Button>
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
    </Container>
  );
};

export default CreateDeliveryNotice;
