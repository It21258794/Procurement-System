import React, { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface FormData {
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
}

export default function AccountForm() {
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/account/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any authorization headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Account successfully created
        // You can add code to handle success, e.g., show a success message
      } else {
        // Handle the error, e.g., show an error message
        console.error('Account creation failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
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
          <TextField
            required
            id="role"
            label="Role"
            fullWidth
            value={formData.role}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <button onClick={handleSubmit}>Create Account</button>
    </React.Fragment>
  );
}
