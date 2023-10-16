import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';







interface Item {
  _id:string;
  itemName: string;
  type: string;
  quantity: number;
  price: number;
}






export default function OrderTable() {
  const { enqueueSnackbar } = useSnackbar();
  const { id} = useParams();
  const [order,setOrder] = React.useState();
  const [item,setItem] = React.useState([]);
  const [cost,setCost] = React.useState({});
  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };

  const subtotal = (items: readonly Item[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }




  React.useEffect(() => {
    
    const fetchData = async (id:any) => {
      console.log(id)
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/getOrderById/${id}`,
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          setOrder(res);
          setItem(res.items)
        }
        const budgetItem = await fetch(
          `http://localhost:8000/api/order/getOrderBudget/${id}`,
          { headers },
        )
        const res1 = await budgetItem.json();
        if(budgetItem.ok){
          console.log(res1.budget)
          
          setCost(res1.budget)
          

        }
        console.log(cost)
          
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData(id);
  }, []);
  const invoiceSubtotal = subtotal(item);
const siteBudget = 0
const remBudget = 0

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
              {item.map((item:Item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell align="right">{item.type}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">Rs. {ccyFormat(item.price)}</TableCell>
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
                <TableCell align="left" > <Button variant="contained" >Increase Budget</Button> </TableCell>
                <TableCell align="right" colSpan={3} ><Button variant="contained">confirem</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
