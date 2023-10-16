import * as React from 'react';
import axios from 'axios';
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
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface BudgetRequest {
  _id: string;
  site_id: string;
  budget_id: string;
  amount: number;
  location: string;
  description: string;
  status: string;
  disabled: boolean; // Add the disabled property
}

export default function BudgetRequestList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [budgetRequests, setBudgetRequests] = React.useState<BudgetRequest[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/site/requst', // Corrected API endpoint
          {
            method: 'GET', // Make a GET request to fetch data
            headers: {
              Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZjc2MWE0MmJlOGExNTEzYWU4OCIsImVtYWlsIjoib3NoYWRoaWFuamFuYUBnbWFpbC5jb20iLCJpYXQiOjE2OTcxODE2MTksImV4cCI6MTY5NzE4MjIyM30.XoS1QKm-m95r1iWQVdP-Nn2bRskbtRfSao9ur9Jzp9c', // Make sure you have the 'token' variable defined
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setBudgetRequests(data.budgetRequests); // Assuming your data structure has a field named 'budgetRequests'
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

  const handleAccept = async (request: BudgetRequest) => {
    request.disabled = true;

    // Make an API request to update the status to "Approved"
    await axios
      .put('http://localhost:8000/api/site/approve', {
        site_id: budgetRequests.site_id,
        budget_id: budgetRequests._id,
        status: 'confirmed',
        // budget:budgetRequests.
      })
      .then((response) => {
        if (response.ok) {
          // Update the status in the state
          const updatedBudgetRequests = budgetRequests.map((item) => {
            if (item._id === request._id) {
              item.status = 'confirmed';
            }
            return item;
          });
          setBudgetRequests(updatedBudgetRequests);
        } else {
          return response.text().then((errorMessage) => {
            enqueueSnackbar(errorMessage, { variant: 'error' });
          });
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  const handleReject = (request: BudgetRequest) => {
    request.disabled = true;

    // Make an API request to update the status to "Rejected"
    fetch(`http://localhost:8000/api/site/reject/${request._id}`, {
      method: 'DELETE', // Use the appropriate HTTP method (e.g., POST)
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary headers, such as authentication headers
      },
      body: JSON.stringify({ requestId: request._id, status: 'Rejected' }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the status in the state
          const updatedBudgetRequests = budgetRequests.map((item) => {
            if (item._id === request._id) {
              item.status = 'Rejected';
            }
            return item;
          });
          setBudgetRequests(updatedBudgetRequests);
        } else {
          return response.text().then((errorMessage) => {
            enqueueSnackbar(errorMessage, { variant: 'error' });
          });
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

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
                  key="site_id"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Site Id
                </TableCell>
                {/* <TableCell key="budget_id" align="left" style={{ minWidth: '50' }}>
                  Budget Id
                </TableCell> */}
                <TableCell key="amount" align="left" style={{ minWidth: '50' }}>
                  Amount
                </TableCell>
                <TableCell
                  key="location"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Location
                </TableCell>
                <TableCell
                  key="description"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Description
                </TableCell>
                <TableCell key="status" align="left" style={{ minWidth: '50' }}>
                  Status
                </TableCell>
                <TableCell key="view" align="left" style={{ minWidth: '50' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgetRequests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request: BudgetRequest) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={request._id}
                  >
                    <TableCell align="left">{request.site_id}</TableCell>
                    {/* <TableCell align="left">{request.budget_id}</TableCell> */}
                    <TableCell align="left">{request.amount}</TableCell>
                    <TableCell align="left">{request.location}</TableCell>
                    <TableCell align="left">{request.description}</TableCell>
                    <TableCell align="left">{request.status}</TableCell>
                    <TableCell align="left">
                      {/* {request.status === 'Pending' && ( */}
                      <div>
                        <Button
                          onClick={() => handleAccept(request)}
                          startIcon={
                            <CheckCircleIcon style={{ color: 'green' }} />
                          }
                          disabled={request.disabled} // Add this
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() => handleReject(request)}
                          startIcon={<CancelIcon style={{ color: 'red' }} />}
                          disabled={request.disabled} // Add this
                        >
                          Reject
                        </Button>
                      </div>
                      {/* )} */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={budgetRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
