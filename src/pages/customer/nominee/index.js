import {React,useState,useEffect} from 'react';
import {Grid,Box,Drawer,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import  NomineeNew  from '../../../../components/Add/NomineeNew';


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
const [nominee, setNominee] = useState([]);  

const closeDrawer=()=>{
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
      url: `http://localhost:9000/api/nominee/user`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=> {
        setNominee(response.data)
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
      <Typography variant="h5" component="h5" sx={{textAlign:'center'}}> My Nominee  Information</Typography>
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        {nominee.length>0?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nominee</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nominee.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.dob.slice(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> Please Add Your nominee Information!</Typography>}
        </Item>

      </Grid>

    {
      nominee.length<3?<Grid sx={{marginLeft:"33%",marginTop:'3%'}}>
      <Item>
      <Button variant='outlined' onClick={()=>{
         setdrawerOpen(true);
      }}> Add nominee</Button>
      </Item>
      </Grid>:<></>
    }
    
    </Grid>

    <Drawer
            anchor={'right'}
            open={drawerOpen}
            onClose={toggleDrawer('right', false)}
            sx={{width:'400'}}
          >
            <NomineeNew user_id={data?data.id:null} user_type={1} fun={closeDrawer}/>
          </Drawer>
    
  </Box>
  )
}
