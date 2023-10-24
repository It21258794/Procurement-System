import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import PaidIcon from '@mui/icons-material/Paid';
import ConstructionIcon from '@mui/icons-material/Construction';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface Item {
  _id: string;
  orderId: string;
  supplierId: string;
  requiredDate: string;
  total_cost: number;
  status: string;
}

export default function PayOrderList() {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState([]);
  const navigate = useNavigate();

  let authPayload = React.useContext(AuthContext);
  const { fromStorage } :any= authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/order/getOrdersByMonth',
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          setOrder(res.fountItem);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelProps = (id: any, orderId: string) => {
    console.log(orderId)
    navigate(`/manager/payment/${id}/${orderId}`);
  };

  if (order.length == 0) {
    return <h1>No data </h1>;
  } else {
    return (
      <>
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>
          All Orders
        </Typography>
        <Box sx={{ paddingTop: 5, paddingBottom: 10 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="name"
                      align="left"
                      style={{ minWidth: '50' }}
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      key="budget"
                      align="left"
                      style={{ minWidth: '50' }}
                    >
                      Required Date
                    </TableCell>
                    <TableCell
                      key="order"
                      align="left"
                      style={{ minWidth: '50' }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      key="view"
                      align="left"
                      style={{ minWidth: '50' }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      key="view"
                      align="left"
                      style={{ minWidth: '50' }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: Item) => {
                      const date = moment(item.requiredDate)
                        .utc()
                        .format('YYYY-MM-DD');
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={item._id}
                        >
                          <TableCell align="left">{item.orderId}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">{item.total_cost}</TableCell>
                          <TableCell align="left">{item.status == 'confirmed'? <div style={{display:'flex', flexDirection:'row'}}><OfflinePinIcon style={{ color: 'green'  }}/> <Typography style={{paddingLeft:'3px'}}>Confirmed</Typography></div>  :
                           item.status == 'pending' ? <div style={{display:'flex', flexDirection:'row'}}><AutorenewIcon style={{ color: 'yellow'  }}/> <Typography style={{paddingLeft:'3px'}}>Pending</Typography></div> :
                           item.status == 'accepted' ? <div style={{display:'flex', flexDirection:'row'}}><ThumbUpAltIcon style={{ color: 'blue'  }}/> <Typography style={{paddingLeft:'3px'}}>Accepted</Typography></div> :
                           item.status == 'rejected' ? <div style={{display:'flex', flexDirection:'row'}}><HighlightOffIcon style={{ color: 'red'  }}/> <Typography style={{paddingLeft:'3px'}}>Rejected</Typography></div> :
                           item.status == 'on-going' ? <div style={{display:'flex', flexDirection:'row'}}><ConstructionIcon style={{ color: 'orange'  }}/> <Typography style={{paddingLeft:'3px'}}>OnGoing</Typography></div> :
                           item.status == 'ready' ? <div style={{display:'flex', flexDirection:'row'}}><AlarmOnIcon style={{ color: 'purple'  }}/> <Typography style={{paddingLeft:'3px'}}>Ready</Typography></div> :
                           item.status == 'on-the-way' ? <div style={{display:'flex', flexDirection:'row'}}><LocalShippingIcon style={{ color: 'brown'  }}/> <Typography style={{paddingLeft:'3px'}}>On the Way</Typography></div> :
                           item.status == 'checked' ? <div style={{display:'flex', flexDirection:'row'}}><RadioButtonCheckedIcon style={{ color: '#4B527E'  }}/> <Typography style={{paddingLeft:'3px'}}>Checked</Typography></div> :
                           item.status == 'completed' ?<div style={{display:'flex', flexDirection:'row'}}><PaidIcon style={{ color: '#D83F31'  }}/> <Typography style={{paddingLeft:'3px'}}>Completed</Typography></div>:
                           <Typography style={{paddingLeft:'3px'}}>Invalid status</Typography>}</TableCell>
                          <TableCell align="left">
                            <Button
                              type="submit"
                              style={{ backgroundColor: 'orange' }}
                              variant="contained"
                              disabled={item.status != 'checked'}
                              onClick={() =>
                                handelProps(item.supplierId, item._id)
                              }
                            >
                              Pay Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={order.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
    );
  }
}
