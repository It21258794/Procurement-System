import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { AuthContext } from '../../../auth/AuthProvider';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

interface Item {
  _id: string;
  orderId: string;
  requiredDate: string;
  total_cost:number
  status:string
}

export default function OrderList() {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState([]);
  const { id , location} = useParams();
  const navigate = useNavigate();

  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };



  React.useEffect(() => {
    
    const fetchData = async (id:any) => {
      console.log(id)
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/getSiteOrder/${id}`,
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          setOrder(res);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData(id);
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

  const handelProps=(id:any,location:any)=>{
    navigate(`/manager/order/${id}`);
    }

  return (
    <>
      <Typography  style={{fontSize :'24px',fontWeight: 'bold'}}>{location} Site</Typography>
      <Box sx={{ paddingTop: 5, paddingBottom: 10 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell key="name" align="left" style={{ minWidth: '50' }}>
                  Order ID
                </TableCell>
                <TableCell key="budget" align="left" style={{ minWidth: '50' }}>
                  Required Date
                </TableCell>
                <TableCell key="order" align="left" style={{ minWidth: '50' }}>
                  Amount
                </TableCell>
                <TableCell key="view" align="left" style={{ minWidth: '50' }}>
                  Status
                </TableCell>
                <TableCell key="view" align="left" style={{ minWidth: '50' }}>
                  
                </TableCell>
                 <TableCell key="view" align="left" style={{ minWidth: '50' }}>
                  
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item:Item) => {
                    const date =moment(item.requiredDate).utc().format('YYYY-MM-DD')
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
                        <TableCell align="left">{item.status}</TableCell>
                        <TableCell align="left">
                          <IconButton onClick = {()=>handelProps(item._id)}>
                            <VisibilityIcon style={{ color: 'orange' }} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          <IconButton >
                            <DeleteIcon color ='error'  />
                          </IconButton>
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
