import { useState, useEffect } from 'react';
import * as React from 'react';
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from '@mui/material';

interface Order {
  id: number;
  orderNumber: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
}

const OrderViewPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1">
        Purchased Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderViewPage;
