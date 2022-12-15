import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import { Item } from "src/util/lib";


export default function CustomerUpdatePass(props) {
    const {user_id,fun}=props.data;
    const [message, setMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertColor, setaAertColor] = useState('error');
    const [oldpass, setOldPass] = useState(null);
    const [newpass, setNewPass] = useState(null);
    const [newcpass, setNewCPass] = useState(null);
    const snackClose=()=>{
        setAlertShow(false);
       } 

  return (
<Item>
<Typography component={'p'} sx={{fontWeight:500}}>Change Your Password</Typography>
    <Divider/>
<Stack spacing={4}>
<TextField label="Current Password"  type="password" required fullWidth  InputLabelProps={{ shrink: true}} value={oldpass} onChange={(e)=>{
        setOldPass(e.target.value);
      }}  />
<TextField label="New Password"  type="password" required fullWidth  InputLabelProps={{ shrink: true}} value={newpass} onChange={(e)=>{
        setNewPass(e.target.value);
      }}  />
<TextField label="Current Password"  type="password" required fullWidth  InputLabelProps={{ shrink: true}} value={newcpass} onChange={(e)=>{
        setNewCPass(e.target.value);
      }}  />
 <Button variant="outlined" type={'submit'} color="success">Update Password</Button>
</Stack>

</Item>
  )
}
