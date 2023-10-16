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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const getAllItemsUrl = 'http://localhost:8000/api/item/getAllItem';
const updateItemUrl = 'http://localhost:8000/api/item/updateItem/';
const deleteItemUrl = 'http://localhost:8000/api/item/deleteItem/';

export default function ItemListView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(deleteItemUrl + itemId, {
        method: 'DELETE',
      });

      if (response.ok) {
        enqueueSnackbar('Item deleted successfully', { variant: 'success' });
        fetchItems(); // Refresh the item list after deletion
      } else {
        enqueueSnackbar('Item deletion failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setUpdatedItem({ ...item }); // Create a copy of the item for editing
    setEditDialogOpen(true);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await fetch(updateItemUrl + updatedItem._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        enqueueSnackbar('Item updated successfully', { variant: 'success' });
        setEditDialogOpen(false); // Close the edit dialog
        fetchItems(); // Refresh the item list after the update
      } else {
        enqueueSnackbar('Item update failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(getAllItemsUrl);
      const data = await response.json();
      if (response.ok) {
        setItems(data);
      } else {
        enqueueSnackbar('Failed to fetch items', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 10, width: 800 }}>
      <Typography variant="h6" gutterBottom>
        Item List
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Supplier ID</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow hover tabIndex={-1} key={item._id}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplierId}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditItem(item)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem(item._id)} color="secondary">
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
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          {/* Add form fields for editing item properties */}
          <TextField
            label="Item Name"
            fullWidth
            value={updatedItem ? updatedItem.itemName : ''}
            onChange={(e) =>
              setUpdatedItem({
                ...updatedItem,
                itemName: e.target.value,
              })
            }
          />
          {/* Add more fields for other item properties as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
