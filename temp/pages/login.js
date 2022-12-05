// ** React Imports
import { useState } from 'react'
import axios from 'axios';
import Router from 'next/router';
// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'


import {Box,Button,ButtonGroup,Snackbar,Alert,Checkbox,TextField,InputLabel,Typography,IconButton} from '@mui/material'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'


import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })



  const [sevcolor, setSevcolor] = useState('error');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
 


  const customerLogin=()=>{
    let data = new FormData();
    data.append('id',uid);
    data.append('pass',values.password);
    axios({
      method: "post",
      url: `http://localhost:9000/api/login/customer`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then( (response)=> { 
        let temp=response.data;
        temp.role='customer'
        localStorage.setItem('crzn', JSON.stringify(temp));
        setSevcolor('success');
        setMsg("You Are Verified Please Wait...");
        setValues({ ...values,password: ''});
        setUid('');
        setOpen(true);
        Router.push('/customer/')
      })
      .catch( (error)=> {
        setSevcolor('error');
        setMsg("Invalid Customer Credentials");
        setOpen(true);
      });
  }

  const associateLogin=()=>{
    let data = new FormData();
    data.append('id',uid);
    data.append('pass',values.password);
    axios({
      method: "post",
      url: `http://localhost:9000/api/login/associate`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then( (response)=> {
        let temp=response.data;
        temp.role='associate'
        localStorage.setItem('crzn', JSON.stringify(temp));
        setSevcolor('success');
        setMsg("You Are Verified Please Wait...");
        setValues({ ...values,password: ''});
        setUid('');
        setOpen(true);
        Router.push('/associate/')
      })
      .catch( (error)=> {
        setSevcolor('error');
        setMsg("Invalid Associate Credentials");
        setOpen(true);
      });
  }

  const employeeLogin=()=>{
    navigator.geolocation.getCurrentPosition((loc)=>{
      let data = new FormData();
      data.append('id',uid);
      data.append('pass',values.password);
      data.append('login_location',loc.coords.latitude+'_'+loc.coords.longitude);     
     axios({
      method: "post",
      url: `http://localhost:9000/api/login/employee`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then( (response)=> { 
        let temp=response.data;
        temp.role='employee'
        localStorage.setItem('crzn', JSON.stringify(temp));
        setSevcolor('success');
        setMsg("You Are Verified Please Wait...");
        setValues({ ...values,password: ''});
        setUid('');
        setOpen(true);
        Router.push('/employee/')
      })
      .catch( (error)=> {
        setSevcolor('error');
        setMsg("Invalid Employee Credentials");
        setOpen(true);
      });

    },(err)=>{
      setSevcolor('error');
    setMsg("Please Allow Location Access");
    setOpen(true);
    });
  
  }

  const adminLogin=()=>{
    let data = new FormData();
    data.append('id',uid);
    data.append('pass',values.password);
    axios({
      method: "post",
      url: `http://localhost:9000/api/login/admin`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then( (response)=> { 
        let temp=response.data;
        temp.role='admin'
        localStorage.setItem('crzn', JSON.stringify(temp));
        setSevcolor('success');
        setMsg("You Are Verified Please Wait...");
        setValues({ ...values,password: ''});
        setUid('');
        setOpen(true);
        Router.push('/admin/')
      })
      .catch( (error)=> {
        setSevcolor('error');
        setMsg("Invalid Admin Credentials");
        setOpen(true);
      });
  }

  const [uid, setUid] = useState('')


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email or Phone No' sx={{ marginBottom: 4 }}  onChange={(e)=>{
                setUid(e.target.value)
            }} value={uid}/>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <ButtonGroup variant="outlined">
            <Button  onClick={customerLogin}>Customer Login</Button>
              <Button onClick={associateLogin}>Associate Login</Button>
            </ButtonGroup>

              <ButtonGroup  sx={{m:5}}variant="outlined">
                <Button onClick={employeeLogin} >Employee Login</Button>
                <Button onClick={adminLogin} sx={{marginLeft:3}}>Admin Login</Button>
              </ButtonGroup>
           
         
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sevcolor} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>

    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
