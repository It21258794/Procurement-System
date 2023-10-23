import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import axios from 'axios';
import avatar from '../../assets/profile.png';
import { useFormik } from 'formik';
import { makeStyles } from 'tss-react/mui';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    marginRight: '30%',
    justifyContent: 'center',
  },
  formControl: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '75px',
    marginLeft: '16%',
  },
  signin: {
    marginRight: '70%',
  },
  link1: {
    marginLeft: '-100px',
    color: '#000000',
    '&:hover': {
      color: '#FF0000',
      textDecoration: 'underline #000000',
    },
  },
  link2: {
    marginLeft: '60px',
    color: '#000000',
    '&:hover': {
      color: '#FF0000',
      textDecoration: 'underline #000000',
    },
  },
}));

const theme = createTheme();

const saveToken = async (payload) => {
  localStorage.setItem('token', JSON.stringify(payload));
  console.log(localStorage);
};

export default function SignIn() {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const { init } = useContext(AuthContext);
  // let  ctx  =  useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:8000/api/account/login',
          data: { email: values.email, password: values.password },
        });

        console.log(res.data);

        await saveToken(res.data);

        if (init) {
          await init();
        }
        // init && (await init());

        navigate('/');
      } catch (err) {
        //alert('Error with user credentials');
        Swal.fire({
          title: 'Error with user credentials?',
          icon: 'question',
          iconHtml: '?',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Back',
        });
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleChange, handleSubmit } = formik;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar alt="Remy Sharp" src={avatar} />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="text"
              value={formik.values.email}
              placeholder="Enter Email"
              error={
                formik.errors['email'] && formik.touched.email ? true : false
              }
              onChange={handleChange}
              helperText={
                formik.errors['email'] && formik.touched.email
                  ? formik.errors['email']
                  : null
              }
            />
            {/* <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              className={classes.password}
              value={formik.values.password}
              error={
                formik.errors['password'] && formik.touched.password
                  ? true
                  : false
              }
              placeholder="Enter password"
              onChange={handleChange}
              helperText={
                formik.errors['password'] && formik.touched.password
                  ? formik.errors['password']
                  : null
              }
            /> */}

            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              error={
                formik.errors['password'] && formik.touched.password
                  ? true
                  : false
              }
              placeholder="Enter password"
              onChange={handleChange}
              helperText={
                formik.errors['password'] && formik.touched.password
                  ? formik.errors['password']
                  : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              margintop="16px"
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              margintop="16px"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#006ee6' }}
            >
              Sign In
            </Button>
          </Box>
          <Grid container>
            <Grid item xs marginTop="12px">
              <NavLink to="/recoveryPassword">{'Forgot password?'}</NavLink>
            </Grid>
            <Grid item marginTop="12px">
              <NavLink to="/signup">
                {' '}
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
