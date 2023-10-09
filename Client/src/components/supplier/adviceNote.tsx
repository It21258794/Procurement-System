// import * as React from 'react';
// import {Container,Typography,TextField,TextareaAutosize,Button,Grid} from '@mui/material';
// import axios from 'axios';

// const AdviceNoteForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     supplierName: '',
//     invoiceNumber: '',
//     adviceText: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/advice-notes', formData);

//       if (response.status === 200) {
//         console.log('Advice note submitted successfully');
//       } else {
//         console.error('Failed to submit advice note');
//       }
//     } catch (error) {
//       console.error('An error occurred while submitting the advice note', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h1">
//         Provide Advice Note
//       </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Supplier Name"
//               variant="outlined"
//               fullWidth
//               name="supplierName"
//               value={formData.supplierName}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Invoice Number"
//               variant="outlined"
//               fullWidth
//               name="invoiceNumber"
//               value={formData.invoiceNumber}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextareaAutosize
//               aria-label="Advice Text"
//               placeholder="Advice Text"
//               name="adviceText"
//               value={formData.adviceText}
//               onChange={handleChange}
//               rowsMin={3}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Submit Advice Note
//             </Button>
//           </Grid>
//         </Grid>
//     </Container>
//   );
// };

// export default AdviceNoteForm;
