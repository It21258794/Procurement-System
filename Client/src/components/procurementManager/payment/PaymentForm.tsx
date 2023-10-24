import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

export default function PaymentForm({ id, orderId }) {
  console.log(id);
  const { enqueueSnackbar } = useSnackbar();
  const [payment, setPayment] = React.useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
  });
  const [amount, setAmount] = React.useState(0);
  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };

  React.useEffect(() => {
    const fetchData = async (id: any, orderId: any) => {
      console.log(orderId);
      try {
        const response = await fetch(
          `http://localhost:8000/api/payment/getPaymentBySupplierId/${id}`,
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          setPayment(res);
          const item = await fetch(
            `http://localhost:8000/api/order/getOrderById/${orderId}`,
            { headers },
          ).then(async (itemRes) => {
            const res = await itemRes.json();
            setAmount(res.total_cost);
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData(id, orderId);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={payment.accountHolderName}
            required
            id="SupplierName"
            label="Supplier Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            value={payment.accountNumber}
            id="accNumber"
            label="Account number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            value={payment.bankName}
            id="bank"
            label="Bank"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="amount"
            label="Amount"
            value={amount}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Enter the Date"
                defaultValue={dayjs(new Date())}
                disabled={true}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
