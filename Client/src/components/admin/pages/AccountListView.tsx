import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const apiUrl = 'http://localhost:8000/api/account/findAccountByCategory/';

export default function AccountListView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [accounts, setAccounts] = useState([]);
  const [selectedType, setSelectedType] = useState('supplier'); // Default type
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [updatedAccount, setUpdatedAccount] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/account/deleteAccount/${accountId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle success, e.g., show a success message and update the account list
        enqueueSnackbar('Account deleted successfully', { variant: 'success' });
        fetchData(); // Refresh the account list after deletion
      } else {
        // Handle the error, e.g., show an error message
        enqueueSnackbar('Account deletion failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setUpdatedAccount(account); // Pre-fill the update form with the selected account
    setEditDialogOpen(true);
  };

  const handleUpdateAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/account/updateAccount/${updatedAccount._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message and update the account list
        enqueueSnackbar('Account updated successfully', { variant: 'success' });
        setEditDialogOpen(false); // Close the edit dialog
        fetchData(); // Refresh the account list after the update
      } else {
        // Handle the error, e.g., show an error message
        enqueueSnackbar('Account update failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + selectedType);
        const data = await response.json();
        if (response.ok) {
          setAccounts(data);
        } else {
          enqueueSnackbar('Failed to fetch data', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('An error occurred', { variant: 'error' });
      }
    };

    fetchData();
  }, [selectedType]);

  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 10, width: 800 }}>
      <Typography variant="h6" gutterBottom>
        Account List
      </Typography>
      <FormControl>
        <InputLabel id="type-label">Account Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          value={selectedType}
          label="Account Type"
          onChange={handleChangeType}
        >
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
          {/* Add more options for other account types as needed */}
        </Select>
      </FormControl>
      <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((account) => (
                  <TableRow hover tabIndex={-1} key={account._id}>
                    <TableCell>{account.fname}</TableCell>
                    <TableCell>{account.lname}</TableCell>
                    <TableCell>{account.mobile}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditAccount(account)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAccount(account._id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={accounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
