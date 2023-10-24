import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface Item {
  _id: string;
  itemName: string;
  type: string;
  quantity: number;
  price: number;
}

export default function OrderTable({socket}:any) {
  const { enqueueSnackbar } = useSnackbar();
  const { id} = useParams();
  const [order, setOrder] = React.useState({
    _id: '',
    orderId: '',
    supplierId:'',
    siteId: '',
    address: '',
    month_year: '',
    status: '',
    total_cost: 0,
  });
  const [item, setItem] = React.useState([]);
  const [cost, setCost] = React.useState({ siteBudget: 0, remBudget: 0 });
  const [supplierEmail, setSupplierEmail] = React.useState({
    email:'',
  });
  let supplierId = ''
  let authPayload = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { fromStorage } :any= authPayload;
  const data = JSON.parse(fromStorage);
  const token = data.token;
  const decoded = jwt_decode(data.token);
  const userId = decoded.id;
  const headers = { Authorization: 'Bearer ' + token };

  const subtotal = (items: readonly Item[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  const invoiceSubtotal = subtotal(item);
  const siteBudget = cost.siteBudget;
  const remBudget = cost.remBudget;

  React.useEffect(() => {
    socket?.emit("newUser", userId);
    console.log(socket)
  }, [socket, userId]);

  const handleConfirmed = async (id: string) => {
    console.log(id);
    try {
      await axios
        .put(
          'http://localhost:8000/api/order/setStatus',
          {
            orderId: id,
            status: 'confirmed',
          },
          { headers },
        )
        .then(async (res) => {
          navigate(-1)
           await axios.post("http://localhost:8000/api/payment/sendPaymentReceipt", {
            order_id:order.orderId,
            pdf: '',
            email:supplierEmail.email
          },{headers});
          console.log(res);
          // socket.emit("sendOrderToSupplier", {
          //   reciverId:order.supplierId,
          //   orderItem:{order}
          // });
         
          enqueueSnackbar('Order has been Confirmed', { variant: 'success' });
          ;
        });
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const budgestRequest = (
    address: string,
    siteBudget: number,
    remBudget: number,
    total: number,
    siteId: string,
  ) => {
    navigate(
      `/manager/budgetForm/${address}/${siteBudget}/${remBudget}/${total}/${siteId}`,
    );
  };

  React.useEffect(() => {
    const fetchData = async (id: any) => {
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
            supplierId:res.supplierId,
            siteId: res.siteId,
            address: res.address,
            month_year: res.month_year,
            status: res.status,
            total_cost: res.total_cost,
          };
          supplierId = res.supplierId
          setOrder((order) => ({
            ...order,
            ...updatedValues,
          }));
          setItem(res.items);
        }
        const budgetItem = await fetch(
          `http://localhost:8000/api/order/getOrderBudget/${id}`,
          { headers },
        );
        const res1 = await budgetItem.json();
        if (budgetItem.ok) {
          console.log(res1.budget);
          let updatedBudget = {
            siteBudget: res1.budget.siteBudget,
            remBudget: res1.budget.remBudget,
          };
          setCost((cost) => ({
            ...cost,
            ...updatedBudget,
          }));
        }
        const supllierRes = await fetch(
          `http://localhost:8000/api/account/supplierEmail/${supplierId}`,
            { headers },
        );
        const res3 = await supllierRes.json();
        
        if (supllierRes.ok) {
         
          setSupplierEmail(res3)
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData(id);
  }, []);
  console.log(order);

  return (
    <>
      <Typography>Site Name</Typography>
      <Box sx={{ paddingTop: 5, paddingBottom: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.map((item: Item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell align="right">{item.type}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    Rs. {ccyFormat(item.price)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total cost</TableCell>
                <TableCell align="right">
                  Rs. {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Site Budget</TableCell>
                <TableCell align="right">Rs. {ccyFormat(siteBudget)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Remaining Budget</TableCell>
                <TableCell align="right">Rs. {ccyFormat(remBudget)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  {' '}
                  <Button
                    type="submit"
                    style={{ backgroundColor: 'orange' }}
                    variant="contained"
                    disabled={order.status != 'pending'}
                    onClick={() =>
                      budgestRequest(
                        order.address,
                        cost.siteBudget,
                        cost.remBudget,
                        order.total_cost,
                        order.siteId,
                      )
                    }
                  >
                    Increase Budget
                  </Button>{' '}
                </TableCell>
                <TableCell align="right" colSpan={3}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: 'orange' }}
                    variant="contained"
                    disabled={order.status != 'pending'}
                    onClick={() => handleConfirmed(order._id)}
                  >
                    confirem
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
