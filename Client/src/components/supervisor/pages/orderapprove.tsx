import * as React from 'react';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

// export default function IconLabelButtons() {
//   return (

//     <Stack direction="row" spacing={2}>
//       <Button variant="outlined" startIcon={<DeleteIcon />}>
//         Reject
//       </Button>
//       <Button variant="contained" endIcon={<SendIcon />}>
//         Approve
//       </Button>
//     </Stack>
//   );
// }


import { Button, Container, Grid, TextField, Typography } from '@mui/material';

const BudgetIncreasingRequestPage: React.FC = () => {
  const [state, setState] = useState({
    currentTotalAllocatedBudget: 10000000,
    allocatedBudgetForProcuments: 7000000,
    totalRemainingBudget: 1999500,
    additionalAllocationAmount: 0, // Initialize to 0
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle the submission logic here
  };

  const handleApproveRequest = async () => {
    try {
      const response = await axios.post('/api/order/approveOrder', {
        requestId: 'yourRequestId',
      });

      if (response.status === 200) {
        console.log('Budget increase request approved successfully');
      } else {
        console.error('Failed to approve budget increase request');
      }
    } catch (error) {
      console.error('An error occurred while approving the request', error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const response = await axios.post('/api/order/rejectOrder', {
        requestId: 'yourRequestId', // Replace with actual order ID
      });

      if (response.status === 200) {
        console.log('Budget increase request rejected successfully');
      } else {
        console.error('Failed to reject budget increase request');
      }
    } catch (error) {
      console.error('An error occurred while rejecting the request', error);
    }
  };
}
  export default function BudgetIncreasingRequest(){

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center">
        Budget Increasing Request
      </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current Total Allocated Budget"
              type="number"
              fullWidth
              value={state.currentTotalAllocatedBudget}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Allocated Budget for Procurements"
              type="number"
              fullWidth
              value={state.allocatedBudgetForProcuments}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Total Remaining Budget"
              type="number"
              fullWidth
              value={state.totalRemainingBudget}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Additional Allocation Amount"
              type="number"
              fullWidth
              value={state.additionalAllocationAmount}
              onChange={(e) => setState({ ...state, additionalAllocationAmount: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApproveRequest}
            >
              Approve
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleRejectRequest}
            >
              Reject
            </Button>
          </Grid>
        </Grid>
    </Container>
  );
};

