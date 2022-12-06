import {React,useState,useEffect} from 'react'
import {Grid,Typography,TableContainer,Table,TableBody,TableRow,TableCell,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer, TableHead} from '@mui/material';
import {docUrl} from 'src/util/lib'
import { Target } from 'mdi-material-ui';
export default function Qualifications(props) {
  const {data}=props;

  return (
    <TableContainer component={Paper} >
         <Table aria-label="customized table">
          <TableHead>
          <TableRow>
            <TableCell>Degree Name</TableCell>
            <TableCell align="right">Degree From</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Marks</TableCell>
            <TableCell align="right">Document</TableCell>
          </TableRow>
          </TableHead>
         <TableBody>
          {
            data.length==0?<>
            <Typography>No Record to Display</Typography></>:<>

            {
              data.map((item)=>{
                return <TableRow key={Math.random()}>
                <TableCell>{item.degree_name}</TableCell>
                <TableCell align="right">{item.degree_from}</TableCell>
                <TableCell align="right">{item.year_of_pass}</TableCell>
                <TableCell align="right">{item.marks}</TableCell>
                <TableCell align="right"><Button size={'small'} href={`${docUrl}/${item.document_url}` } target='_blank'>view</Button></TableCell>
              </TableRow>
              })
            }
            </>
          }

         </TableBody>
         </Table>
    </TableContainer>
  )
}
