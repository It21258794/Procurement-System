import React, { useState } from 'react';
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

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
];

const invoiceSubtotal = rows.reduce((sum, row) => sum + row.price, 0);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function ApproveOrderPage() {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleApprove = () => {
    setOrderStatus('Approved');
  };

  const handleReject = () => {
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
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
              {orderStatus === null ? (
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button variant="contained" color="primary" onClick={handleApprove}>
                      Approve Order
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleReject}>
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
