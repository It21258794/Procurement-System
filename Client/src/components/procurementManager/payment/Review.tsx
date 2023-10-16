import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

interface Item {
  _id: string;
  itemName: string;
  type: string;
  quantity: number;
  price: number;
}

export default function Review({ orderId, id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [order, setOrder] = React.useState({
    _id: '',
    orderId: '',
    siteId: '',
    address: '',
    month_year: '',
    status: '',
    total_cost: 0,
  });
  const [item, setItem] = React.useState([]);
  const [payment, setPayment] = React.useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
  });

  let authPayload = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);
  const token = data.token;
  const headers = { Authorization: 'Bearer ' + token };

  React.useEffect(() => {
    const fetchData = async (id: any, supplierId: string) => {
      console.log(id);
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/getOrderById/${id}`,
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          let updatedValues = {
            _id: res._id,
            orderId: res.orderId,
            siteId: res.siteId,
            address: res.address,
            month_year: res.month_year,
            status: res.status,
            total_cost: res.total_cost,
          };

          setOrder((order) => ({
            ...order,
            ...updatedValues,
          }));
          setItem(res.items);

          const response = await fetch(
            `http://localhost:8000/api/payment/getPaymentBySupplierId/${supplierId}`,
            { headers },
          );
          const res2 = await response.json();
          console.log(res2);

          if (response.ok) {
            setPayment(res2);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData(orderId, id);
  }, []);

  const payments = [
    { name: 'Card Holder', detail: payment.accountHolderName },
    { name: 'Account', detail: payment.accountNumber },
    { name: 'Bank', detail: payment.bankName },
  ];

  const submitHandle = async () => {
    try {
      const dto = {
        order_id: orderId,
        accountNumber: payment.accountNumber,
        accountHolderName: payment.accountHolderName,
        bankName: payment.bankName,
        price: order.total_cost,
      };
      await axios
        .post('http://localhost:8000/api/payment/createPaymentItem', dto, {
          headers,
        })
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Succesfully Submited', { variant: 'success' });
          navigate('/manager/sites');
        });
    } catch (err: any) {
      enqueueSnackbar('Not Submited', { variant: 'error' });
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {item.map((product: Item) => (
          <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.itemName}
              secondary={product.quantity}
            />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {order.total_cost}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ paddingTop: '30px' }}>
        <Button
          type="submit"
          variant="contained"
          style={{ width: '100px', backgroundColor: 'orange' }}
          onClick={submitHandle}
        >
          Pay
        </Button>
      </div>
    </React.Fragment>
  );
}
