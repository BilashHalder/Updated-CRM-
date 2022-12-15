import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import { Item } from "src/util/lib";



export default function CustomerUpdateImage(props) {
const {user_id,fun}=props.data;
const [message, setMessage] = useState('');
const [alertShow, setAlertShow] = useState(false);
const [alertColor, setaAertColor] = useState('error');
const [img, setImg] = useState(null);



  return (
   <Item>
    <Typography component={'p'} sx={{fontWeight:500}}>Change Your Image</Typography>
    <Divider/>
    <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
  Upload Image
  <input type="file"  hidden accept="image/png, image/gif, image/jpeg"  onChange={(e)=>{
        setImg(e.target.files[0]);
        console.log(e.target.files[0]);
      }} />
</Button>
<Button>Update Image</Button>
   </Item>
  )
}
