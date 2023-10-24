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
import { jsPDF } from 'jspdf';

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
  const [supplierEmail, setSupplierEmail] = React.useState({
    email: '',
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

          const supllierRes = await fetch(
            `http://localhost:8000/api/account/supplierEmail/${supplierId}`,
            { headers },
          );
          const res3 = await supllierRes.json();

          if (supllierRes.ok) {
            setSupplierEmail(res3);
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

  const createPdf = async () => {
    const doc = new jsPDF('l', 'mm', 'a5');
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    doc.setFont('Calibri', 'bold');
    doc.text(`Receipt Of Order_${order.orderId}`, 70, 10);
    doc.setFont('Helvertica', 'bold');
    doc.text('Name', 60, 40);
    doc.text('Account No', 60, 50);
    doc.text('Bank Name', 60, 60);
    doc.text('Amount', 60, 70);
    doc.text('Date', 60, 80);
    doc.setFont('Helvertica', 'Normal');
    doc.text(`${payment.accountHolderName}`, 100, 40);
    doc.text(`${payment.accountNumber}`, 100, 50);
    doc.text(`${payment.bankName}`, 100, 60);
    doc.text(`Rs ${order.total_cost}`, 100, 70);
    doc.text(`${date}`, 100, 80);
    doc.setFont('Calibri', 'bolditalic');
    doc.text(`Codex (PVT) Ltd`, 120, 120);
    doc.setGState(new doc.GState({ opacity: 0.2 }));
    doc.setFontSize(80);
    doc.text('Codex (PVT) Ltd', 40, doc.internal.pageSize.height, {
      angle: 45,
    });
    const pdf = doc.save(`${order.address}_order${order.orderId}.pdf`);
    const out = pdf.output('datauristring');
    const response = await axios.post(
      'http://localhost:8000/api/payment/sendPaymentReceipt',
      {
        order_id: order.orderId,
        pdf: out.split('base64,')[1],
        email: supplierEmail.email,
      },
      { headers },
    );
  };

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
        .then(async (res) => {
          await axios.put(
            'http://localhost:8000/api/order/setStatus',
            { orderId: orderId, status: 'completed' },
            { headers },
          );
          createPdf();
          enqueueSnackbar('Succesfully paid', { variant: 'success' });

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
          <ListItemText primary="Total" style={{ fontWeight: 'bold' }} />
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
                  <Typography
                    style={{ fontStyle: 'italic', color: 'grey' }}
                    gutterBottom
                  >
                    {payment.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontStyle: 'italic', color: 'grey' }}
                    gutterBottom
                  >
                    {payment.detail}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{
          paddingTop: '30px',
          display: 'flex',
          width: 'auto',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          style={{ width: 'auto', backgroundColor: 'orange', display: 'flex' }}
          onClick={submitHandle}
        >
          Pay Now
        </Button>
      </div>
    </React.Fragment>
  );
}
