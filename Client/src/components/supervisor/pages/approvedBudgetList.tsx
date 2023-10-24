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

interface approvedBudget {
  _id: string;
  site_id: string;
  budget_id: string;
  amount: number;
  location: string;
  description: string;
  status: string;
}

export default function approvedBudgetList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [approvedBudget, setApprovedBudget] = React.useState<approvedBudget[]>(
    [],
  );
  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  const headers = { Authorization: 'Bearer ' + ctx };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/site/approved', // Corrected API endpoint
              { headers }

          
        );
        if (response.ok) {
          const data = await response.json();
          setApprovedBudget(data.approvedBudget); // Assuming your data structure has a field named 'budgetRequests'
        } else {
          const errorMessage = await response.text();
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
                  key="location"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Site
                </TableCell>
                {/* <TableCell
                  key="site_id"
                  align="left"
                  style={{ minWidth: '50' }}
                >
                  Site Id
                </TableCell> */}
                {/* <TableCell key="budget_id" align="left" style={{ minWidth: '50' }}>
                  Budget Id
                </TableCell> */}
                <TableCell key="amount" align="left" style={{ minWidth: '50' }}>
                  Amount
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
              </TableRow>
            </TableHead>
            <TableBody>
              {approvedBudget
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request: approvedBudget) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={request._id}
                  >
                                        <TableCell align="left">{request.location}</TableCell>

                    {/* <TableCell align="left">{request.site_id}</TableCell> */}
                    {/* <TableCell align="left">{request.budget_id}</TableCell> */}
                    <TableCell align="left">{request.amount}</TableCell>
                    <TableCell align="left">{request.description}</TableCell>
                    <TableCell align="left">{request.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={approvedBudget.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
