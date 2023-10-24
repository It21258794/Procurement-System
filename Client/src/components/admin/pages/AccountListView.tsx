import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
      const response = await fetch(
        `http://localhost:8000/api/account/deleteAccount/${accountId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        enqueueSnackbar('Account deleted successfully', { variant: 'success' });
        fetchData(); // Refresh the account list after deletion
      } else {
        enqueueSnackbar('Account deletion failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setUpdatedAccount({ ...account }); // Create a copy of the account for editing
    setEditDialogOpen(true);
  };

  const handleUpdateAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/account/updateAccount/${updatedAccount._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAccount),
        },
      );

      if (response.ok) {
        enqueueSnackbar('Account updated successfully', { variant: 'success' });
        setEditDialogOpen(false); // Close the edit dialog
        fetchData(); // Refresh the account list after the update
      } else {
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
          <MenuItem value="Procurement_Manager">Procument Manager</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="Procument_admin">Procument Admin</MenuItem>
          <MenuItem value="Site_Manager">Site Manager</MenuItem>
          {/* Add more options for other account types as needed */}
        </Select>
      </FormControl>
      <Paper
        sx={{
          width: '120%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
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
                      <IconButton
                        onClick={() => handleEditAccount(account)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteAccount(account._id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={accounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: '400px',
            maxWidth: '120%',
          },
        }}
      >
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent sx={{ maxHeight: '500px' }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="First Name"
              fullWidth
              value={updatedAccount ? updatedAccount.fname : ''}
              onChange={(e) =>
                setUpdatedAccount({
                  ...updatedAccount,
                  fname: e.target.value,
                })
              }
              disabled // Disable this field
              sx={{ margin: '16px 0' }}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Last Name"
              fullWidth
              value={updatedAccount ? updatedAccount.lname : ''}
              onChange={(e) =>
                setUpdatedAccount({
                  ...updatedAccount,
                  lname: e.target.value,
                })
              }
              disabled // Disable this field
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Mobile"
              fullWidth
              value={updatedAccount ? updatedAccount.mobile : ''}
              onChange={(e) =>
                setUpdatedAccount({
                  ...updatedAccount,
                  mobile: e.target.value,
                })
              }
              sx={{ marginBottom: '16px' }}
              inputProps={{
                pattern: '\\d{10}', // This enforces 10 digits
                title: 'Mobile number should be 10 digits',
              }}
              error={updatedAccount && !/^\d{10}$/.test(updatedAccount.mobile)}
              helperText={
                updatedAccount && !/^\d{10}$/.test(updatedAccount.mobile)
                  ? 'Mobile number should be 10 digits'
                  : ''
              }
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              fullWidth
              value={updatedAccount ? updatedAccount.email : ''}
              onChange={(e) =>
                setUpdatedAccount({
                  ...updatedAccount,
                  email: e.target.value,
                })
              }
              disabled // Disable this field
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Role"
              fullWidth
              value={updatedAccount ? updatedAccount.role : ''}
              onChange={(e) =>
                setUpdatedAccount({
                  ...updatedAccount,
                  role: e.target.value,
                })
              }
              disabled // Disable this field
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAccount} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
