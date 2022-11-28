// ** React Imports
import { useState,useEffect  } from 'react'
import axios from 'axios'

// ** MUI Imports
import {Box,Alert,Snackbar,Grid,Button,Divider,InputLabel,IconButton,CardContent,FormControl,OutlinedInput,InputAdornment} from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

export default function EditInfo(props) {
  const {id,image}=props.data;

  const [img, setImg] = useState(null);
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })


  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

    // Handle New Password
    const handleNewPasswordChange = prop => event => {
      setValues({ ...values, [prop]: event.target.value })
    }
  
    const handleClickShowNewPassword = () => {
      setValues({ ...values, showNewPassword: !values.showNewPassword })
    }
  
    const handleMouseDownNewPassword = event => {
      event.preventDefault()
    }

      // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }
  const snackClose=()=>{ setAlertShow(false);} 
  const handleForm=()=>{
    if(!values.currentPassword)
    {
      setAlertShow(true);
      setMessage('Please Enter Your Password');
      setaAertColor('error');
    }
    else if(!values.newPassword || values.newPassword.length<8 ){
      setAlertShow(true);
      setMessage('Please Enter New Password Atleast 8 Character');
      setaAertColor('error');
    }
  
    else if(values.newPassword !=values.confirmNewPassword){
      setAlertShow(true);
      setMessage('Confirm Password Does Not Match');
      setaAertColor('error');
    }

    else if(img && img.size > 300000){
      setAlertShow(true);
      setMessage('Please Upload Image Less Than 300Kb');
      setaAertColor('error'); 
    }
    else{
      let data = new FormData();
      data.append('pass',values.currentPassword);
      data.append('newpass',values.confirmNewPassword);
      if(img)
      data.append('image',img);
      axios({
        method: "put",
        url: `http://localhost:9000/api/customer/${user_id}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response)=> {
          setAlertShow(true);
          setMessage("Your Information Updated Sucessfully");
          setaAertColor('success');
          resetForm();
        })
        .catch((err)=> {
          setAlertShow(true);
          if(err.response.data)
          {
            setMessage(err.response.data.message);
            setaAertColor('error');
            setAlertShow(true);
          }
          else
          setMessage('Please Try Again Later!');
          setaAertColor('error');

          console.log(err)
        });
    }


  
  }


  return (
    <>
    {
     id? <form>
     <CardContent sx={{ paddingBottom: 0 }}>
       <Grid container spacing={5}>
         <Grid item xs={12} sm={6}>
           <Grid container spacing={5}>
             <Grid item xs={12} sx={{ marginTop: 4.75 }}>
               <FormControl fullWidth>
                 <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                 <OutlinedInput
                   label='Current Password'
                   value={values.currentPassword}
                   id='account-settings-current-password'
                   type={values.showCurrentPassword ? 'text' : 'password'}
                   onChange={handleCurrentPasswordChange('currentPassword')}
                   endAdornment={
                     <InputAdornment position='end'>
                       <IconButton
                         edge='end'
                         aria-label='toggle password visibility'
                         onClick={handleClickShowCurrentPassword}
                         onMouseDown={handleMouseDownCurrentPassword}
                       >
                         {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                       </IconButton>
                     </InputAdornment>
                   }
                 />
               </FormControl>
             </Grid>
 
             <Grid item xs={12} sx={{ marginTop: 6 }}>
               <FormControl fullWidth>
                 <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                 <OutlinedInput
                   label='New Password'
                   value={values.newPassword}
                   id='account-settings-new-password'
                   onChange={handleNewPasswordChange('newPassword')}
                   type={values.showNewPassword ? 'text' : 'password'}
                   endAdornment={
                     <InputAdornment position='end'>
                       <IconButton
                         edge='end'
                         onClick={handleClickShowNewPassword}
                         aria-label='toggle password visibility'
                         onMouseDown={handleMouseDownNewPassword}
                       >
                         {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                       </IconButton>
                     </InputAdornment>
                   }
                 />
               </FormControl>
             </Grid>
 
             <Grid item xs={12}>
               <FormControl fullWidth>
                 <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                 <OutlinedInput
                   label='Confirm New Password'
                   value={values.confirmNewPassword}
                   id='account-settings-confirm-new-password'
                   type={values.showConfirmNewPassword ? 'text' : 'password'}
                   onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                   endAdornment={
                     <InputAdornment position='end'>
                       <IconButton
                         edge='end'
                         aria-label='toggle password visibility'
                         onClick={handleClickShowConfirmNewPassword}
                         onMouseDown={handleMouseDownConfirmNewPassword}
                       >
                         {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                       </IconButton>
                     </InputAdornment>
                   }
                 />
               </FormControl>
             </Grid>
           </Grid>
         </Grid>
 
         <Grid
           item
           sm={6}
           xs={12}
           sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
         >
           <Box><img width={150} alt='avatar' height={150} src={img?URL.createObjectURL(img):`http://localhost:9000/uploads/images/${image}`} /></Box>
           <Box>
           <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
              Change Image
                    <input type="file"  hidden accept="image/png, image/gif, image/jpeg"  onChange={(e)=>{
             setImg(e.target.files[0]);
               console.log(e.target.files[0]);
           }} />
 </Button>
           </Box>
         </Grid>
       </Grid>
     </CardContent>
 
     <Divider sx={{ margin: 0 }} />
 
     <CardContent>
       <Box sx={{ mt: 11 }}>
         <Button variant='contained' sx={{ marginRight: 3.5 }} 
         onClick={handleForm}
         >
           Save Changes
         </Button>
         <Button
           type='reset'
           variant='outlined'
           color='secondary'
           onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
         >
           Reset
         </Button>
         <Snackbar open={alertShow}
         autoHideDuration={2000} onClose={snackClose}>
       <Alert severity={alertColor}>{message}</Alert>
       </Snackbar>
       </Box>
       
     </CardContent>
 
   </form>:<></>
    }
    </>
   )


}
