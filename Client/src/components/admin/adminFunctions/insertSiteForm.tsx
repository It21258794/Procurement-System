import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

interface SiteDetails {
  siteManager_name: string;
  location: string;
  budget: string;
}

export default function SiteForm() {
  const [siteDetails, setSiteDetails] = React.useState<SiteDetails>({
    siteManager_name: '',
    location: '',
    budget: '',
  });

  const { enqueueSnackbar } = useSnackbar(); // Snackbar

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSiteDetails({ ...siteDetails, [id]: value });
  };

  const handleSubmit = async () => {
    // Send a GET request to find the Site Manager account
    console.log(siteDetails.siteManager_name)
    fetch('http://localhost:8000/api/account/findAccountByUserName/' + siteDetails.siteManager_name)
      .then(async (response) => {
        if (response.ok) {
          const siteManagerAccounts = await response.json();
          if (siteManagerAccounts.length > 0) {
            // Check if the account is a Site Manager
            const isSiteManager = siteManagerAccounts.find((account) => account.role === 'Site_Manager');
            if (isSiteManager) {
              // Proceed with site creation
              const siteDto = {
                siteManager_id: isSiteManager._id,
                location: siteDetails.location,
                budget: siteDetails.budget,
              };
              fetch('http://localhost:8000/api/site/createsite', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(siteDto),
              })
                .then((response) => {
                  if (response.ok) {
                    console.log('Site created successfully');
                    enqueueSnackbar('Site created successfully', { variant: 'success' });
                    // Reset the form fields if needed
                    setSiteDetails({
                      siteManager_name: '',
                      location: '',
                      budget: '',
                    });
                  } else {
                    console.error('Failed to create site');
                    enqueueSnackbar('Failed to create site', { variant: 'error' });
                  }
                })
                .catch((error) => {
                  console.error('An error occurred:', error);
                  enqueueSnackbar('An error occurred while creating the site', { variant: 'error' });
                });
            } else {
              // Account is not a Site Manager
              console.error('Site Manager account not found');
              enqueueSnackbar('Site Manager account not found', { variant: 'error' });
            }
          } else {
            // No account with the given username found
            console.error('Account not found');
            enqueueSnackbar('Account not found', { variant: 'error' });
          }
        } else {
          console.error('Error checking for an existing account:', response.statusText);
          enqueueSnackbar('Error checking for an existing account', { variant: 'error' });
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        enqueueSnackbar('An error occurred', { variant: 'error' });
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Site Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="siteManager_name"
            label="Site Manager name"
            fullWidth
            value={siteDetails.siteManager_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="location"
            label="Location"
            fullWidth
            value={siteDetails.location}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="budget"
            label="Budget"
            fullWidth
            value={siteDetails.budget}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Site
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
