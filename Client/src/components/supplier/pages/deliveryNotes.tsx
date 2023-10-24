import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
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
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuthContext } from '../../../auth/AuthProvider';

interface deliveryNotes {
  _id: string;
  orderId: string;
  // address: string;
  // requiredDate: string;
description:string
}

export default function allNoteList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [deliveryNotes, setDeliveryNotes] = React.useState([]);
  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  const headers = { Authorization: 'Bearer ' + ctx };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/note/allnotes',
          {
            headers
            // method: 'GET',
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.deliveryNotes);
          setDeliveryNotes(data.deliveryNotes); // Store the delivery notes data
          console.log(deliveryNotes);
        } else {
          const errorMessage = await response.text();
          console.error(`Request failed with status: ${response.status}`);
          console.error(`Error message: ${errorMessage}`);
          enqueueSnackbar(errorMessage, { variant: 'error' });
        }
      } catch (err:any) {
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
    <Box sx={{ paddingTop: 10, paddingBottom: 10,width: 800,paddingLeft:25 }}>
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
                  Order ID
                </TableCell>
                {/* <TableCell
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
                </TableCell> */}
                <TableCell
                  key="itemName"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Description      
                            </TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryNotes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((note: deliveryNotes) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={note._id}>
                    <TableCell align="left">{note.orderId}</TableCell>
                    {/* <TableCell align="left">{note.address}</TableCell>
                    <TableCell align="left">{note.requiredDate}</TableCell> */}
                    <TableCell align="left">{note.description}</TableCell>
                   
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={deliveryNotes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
