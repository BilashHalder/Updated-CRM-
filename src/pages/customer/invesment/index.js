import {React,useState,useEffect} from 'react';
import {Grid,Box,Drawer,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import  ViewInvesment  from '../../../../components/View/ViewInvesment';
import  InvesmentNew  from '../../../../components/Add/InvesmentNew';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function index() {


const [flag, setflag] = useState(0);
const [drawerOpen, setdrawerOpen] = useState(false);
const [id, setid] = useState();
const [data, setdata] = useState(null);
const [invesment, setinvesment] = useState([]);  

const closeDrawer=()=>{
  setflag(Math.random());
}

const updateMe=()=>{
  setflag(Math.random());
}

const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setdrawerOpen(false);
  setflag(Math.random());
};



useEffect(() => {
  if(localStorage.getItem('crzn') &&  JSON.parse(localStorage.getItem('crzn')).id ){
    setid(JSON.parse(localStorage.getItem('crzn')).id);
    setdata(JSON.parse(localStorage.getItem('crzn')).info);
    
    let data = new FormData();
    data.append('user_id',id?id:JSON.parse(localStorage.getItem('crzn')).id);
    data.append('user_type',1);
    axios({
      method: "post",
      url: `http://localhost:9000/api/invesment/user`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=> {
        setinvesment(response.data)
      })
      .catch((err)=> {
       console.log(err);
      });
  }
   

 else{
  setid(null);
 }
}, [flag]);

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <Typography variant="h5" component="h5" sx={{textAlign:'center'}}>New Invesment</Typography>
       {
        id?<InvesmentNew user_id={id} user_type={1} fun={updateMe}/>:<></>
       }
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <ViewInvesment data={invesment}/>
        </Item>
      </Grid>
    </Grid>
        <Drawer
            anchor={'right'}
            open={drawerOpen}
            onClose={toggleDrawer('right', false)}
            sx={{width:'400'}}
          >
          </Drawer>
    
  </Box>
  )
}
