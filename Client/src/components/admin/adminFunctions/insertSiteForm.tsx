import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface SiteDetails {
  siteManager_id: string;
  location: string;
  budget: string;
}

export default function SiteForm() {
  const [siteDetails, setSiteDetails] = React.useState<SiteDetails>({
    siteManager_id: '',
    location: '',
    budget: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSiteDetails({ ...siteDetails, [id]: value });
  };

  const handleSubmit = () => {
    // Send a POST request to your server to create a new site.
    fetch('http://localhost:8000/api/site/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siteDetails),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Site created successfully');
          // Reset the form fields if needed
          setSiteDetails({
            siteManager_id: '',
            location: '',
            budget: '',
          });
        } else {
          console.error('Failed to create site');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
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
            id="siteManager_id"
            label="Site Manager ID"
            fullWidth
            value={siteDetails.siteManager_id}
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
