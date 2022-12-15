import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Input,Typography} from '@mui/material'
import QualificationNew from './QualificationNew';


export default function Qualification() {
    const [id, setId] = useState(null);
    const [qualifications, setQualifications] = useState([]);
    const [flag, setflag] = useState(0);
    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          let id=info.id;
          setId(id);
          let data=new FormData();
          data.append('user_id',id);
          data.append('user_type',3);
    
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
      
          instance.get(`qualification/all/${id}`).then((res)=>setQualifications(res.data)).catch((err)=>{console.log(err)});
        }
       
      }, [flag])

  return (
    <Grid container>
        <Grid item md={12} sm={12}>
            {
               qualifications.length<4?<QualificationNew emp_id={id?id:null} fun={setflag}/>:<></> 
            }
        </Grid>
        <Grid item md={12} sm={12}>

        {
            qualifications.length>0?<>
             <Table >
      <TableHead>
        <TableRow>
          <TableCell>Degree Name</TableCell>
          <TableCell align="right">Year</TableCell>
          <TableCell align="right">University</TableCell>
          <TableCell align="right">Marks</TableCell>
          <TableCell align="right">Document</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {qualifications.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.degree_name}
            </TableCell>
            <TableCell align="right">{row.year_of_pass}</TableCell>
            <TableCell align="right">{row.degree_from}</TableCell>
            <TableCell align="right">{row.marks}</TableCell>
            <TableCell align="right"><Button size={'small'}>Download</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
            </>:<>
            <Typography sx={{textAlign:'center'}}>Please Add Qualification Details</Typography>
            </>
        }
        
        </Grid>
    </Grid>
  )
}
