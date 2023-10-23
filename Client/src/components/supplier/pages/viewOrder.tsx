import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';

interface Order {
  orderId: string;
  address: string;
  requiredDate: string;
  itemName: string;
  quantity: number;
  price: number;
}

export default function OrderList({socket}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [orders, setOrders] = React.useState([]);

  const userId = '651573942be0d990f78c78cf'
   React.useEffect(() => {
    console.log(userId)
    socket?.emit("newUser", userId);
    console.log(socket)
  }, [socket, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/order/getOrder',
          {
            method: 'GET',
            headers: {
              Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZjc2MWE0MmJlOGExNTEzYWU4OCIsImVtYWlsIjoib3NoYWRoaWFuamFuYUBnbWFpbC5jb20iLCJpYXQiOjE2OTcxODE2MTksImV4cCI6MTY5NzE4MjIyM30.XoS1QKm-m95r1iWQVdP-Nn2bRskbtRfSao9ur9Jzp9c', // Replace with your access token
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data); // Assuming your data is an array of orders
        } else {
          const errorMessage = await response.text();
          enqueueSnackbar(errorMessage, { variant: 'error' });
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 10, width: 800 }}>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="orderId"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Order Id
                </TableCell>
                <TableCell
                  key="address"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Address
                </TableCell>
                <TableCell
                  key="requiredDate"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Required Date
                </TableCell>
                <TableCell
                  key="itemName"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Item Name
                </TableCell>
                <TableCell
                  key="quantity"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Quantity
                </TableCell>
                <TableCell key="price" align="left" style={{ minWidth: '50' }}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                    <TableCell align="left">{order.orderId}</TableCell>
                    <TableCell align="left">{order.address}</TableCell>
                    <TableCell align="left">{order.requiredDate}</TableCell>
                    <TableCell align="left">{order.itemName}</TableCell>
                    <TableCell align="left">{order.quantity}</TableCell>
                    <TableCell align="left">{order.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
