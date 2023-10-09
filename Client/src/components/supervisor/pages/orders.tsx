 import * as React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material';

interface Order {
  id: number;
  currentBudget: number;
  procurementBudget: number;
  remainingBudget: number;
  additionalAllocation: number;
  description: string;
}

const ApproveOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
  ]);

  const handleApproveOrder = (id: number) => {
  };

  return (
    <div>
      <Typography variant="h4" component="h1">
        Approved Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Current Budget</TableCell>
              <TableCell>Procurement Budget</TableCell>
              <TableCell>Remaining Budget</TableCell>
              <TableCell>Additional Allocation</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.currentBudget}</TableCell>
                <TableCell>{order.procurementBudget}</TableCell>
                <TableCell>{order.remainingBudget}</TableCell>
                <TableCell>{order.additionalAllocation}</TableCell>
                <TableCell>{order.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApproveOrderPage;
