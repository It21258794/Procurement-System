import React, { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select, MenuItem ,InputLabel} from '@mui/material';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { AuthRole } from './../../../../../Server/src/utils/types/IPayload';
interface FormData {
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
}
const validRoles = [
  AuthRole.PROCUREMENT_MANAGER,
  AuthRole.PROCUREMENT_ADMIN,
  AuthRole.SITE_MANAGER,
  AuthRole.SUPERVISOR,
  AuthRole.SUPPLIER,
];
export default function AccountForm() {
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    role: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState<string>(''); // State for validation error

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    
    // Reset validation error
    setError('');
  };
  const handleChangeType = (event) => {
    setFormData({ ...formData, role: event.target.value });
  };
  const handleSubmit = async () => {
    
    const enteredRole = formData.role.toUpperCase();
console.log(enteredRole)
// Check if the entered role exists in validRoles
      if (!validRoles.includes(enteredRole)) {
  // Role is not valid
       enqueueSnackbar('Incorrect Role', { variant: 'error' });
       return;
         }
    try {
      const response = await fetch('http://localhost:8000/api/account/findAccountByUserName/' + formData.fname + ' ' + formData.lname);
  
      if (response.ok) {
        const existingAccount = await response.json();
        if (existingAccount && existingAccount.length > 0) {
          // An account with the same username exists
          enqueueSnackbar('An account with the same username already exists', { variant: 'error' });
        } else {
          // No existing account found; proceed to create the account
          const createResponse = await fetch('http://localhost:8000/api/account/createAccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (createResponse.ok) {
            enqueueSnackbar('Account Successfully created', { variant: 'success' });
            setFormData({
            fname: '',
            lname: '',
            mobile: '',
            email: '',
            password: '',
            role: '',
           });
          } else {
            // Handle the error, e.g., show an error message
            enqueueSnackbar('Enter a new Email Address,it is already in use', { variant: 'error' });
          }
        }
      } else {
        // Handle the error, e.g., show an error message
        console.error('Error checking for existing account:', response.statusText);
  
        // Display the error message on the frontend
        enqueueSnackbar('Error checking for existing account: ' + response.statusText, { variant: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
  
      // Display the error message on the frontend
      enqueueSnackbar('An error occurred: ' + error.message, { variant: 'error' });
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fname"
            label="First Name"
            fullWidth
            value={formData.fname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="lname"
            label="Last Name"
            fullWidth
            value={formData.lname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="mobile"
            label="Mobile"
            fullWidth
            value={formData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="type-label">Role</InputLabel>
        <Select
          required
          id="role"
          label="Role"
          fullWidth
          value={formData.role}
          onChange={handleChangeType}
        >
          <MenuItem value="Procument_manager">Procument Manager</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="Procument_admin">Procument Admin</MenuItem>
          <MenuItem value="Site_Manager" >Site Manager</MenuItem>
          {/* Add more options for other account types as needed */}
        </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Account
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
