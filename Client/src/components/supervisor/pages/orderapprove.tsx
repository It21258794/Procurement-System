import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

interface ApproveOrderPageProps {
  siteId: number; // Receive the site ID as a prop
}

export default function ApproveOrderPage({ siteId }: ApproveOrderPageProps) {
  const [siteDetails, setSiteDetails] = useState<Row | null>(null); // Define a state to store site details
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  // Simulate fetching site details based on siteId (replace with your actual fetch logic)
  const fetchSiteDetails = async () => {
    try {
      // Replace this with your actual API request to fetch site details using the siteId
      // For now, we're using a static object as an example
      const response = await fetch(`/api/sites/${siteId}`);
      const data = await response.json();
      setSiteDetails(data);
    } catch (error) {
      console.error('Error fetching site details:', error);
    }
  };

  // Fetch site details when the component mounts
  useEffect(() => {
    fetchSiteDetails();
  }, [siteId]);

  const handleApprove = () => {
    // Handle the approval logic here (e.g., send an API request)
    // Update orderStatus based on the response
    setOrderStatus('Approved');
  };

  const handleReject = () => {
    // Handle the rejection logic here (e.g., send an API request)
    // Update orderStatus based on the response
    setOrderStatus('Rejected');
  };

  return (
    <>
      <Typography>Budget Increase Request</Typography>
      <Box sx={{ paddingTop: 5, paddingBottom: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siteDetails && ( // Render site details if available
                <TableRow>
                  <TableCell>{siteDetails.desc}</TableCell>
                  <TableCell align="right">{siteDetails.qty}</TableCell>
                  <TableCell align="right">{siteDetails.unit}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(siteDetails.price)}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(siteDetails ? siteDetails.price : 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0,
                )} %`}</TableCell>
                <TableCell align="right">
                  {ccyFormat(siteDetails ? TAX_RATE * siteDetails.price : 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  {ccyFormat(
                    siteDetails ? (1 + TAX_RATE) * siteDetails.price : 0,
                  )}
                </TableCell>
              </TableRow>
              {orderStatus === null ? (
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApprove}
                    >
                      Approve Order
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleReject}
                    >
                      Reject Order
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Order {orderStatus}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
