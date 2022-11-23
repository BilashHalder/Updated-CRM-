import {Grid,Button,Box,Typography} from '@mui/material';
import jsPDF from 'jspdf';
import Canvas from 'html2canvas';
import React, { Component ,useState} from 'react';


export default function AppointmentLetter() {

    const [out, setOut] = useState('');

    const GetPdf=()=>{
        const doc = new jsPDF("p","pt","a4");
        doc.html(out,{
            callback:function(pdf){
                pdf.save(`${Math.random()}.pdf`)
            }
        })
        console.log("ok")
    }
  return (
    <Grid>

        <Box component="div" id="appoint">
        <Grid container sx={{m:'3%'}}>
        <Typography align={'justify'} sx={{'textAlign':'center','display':'block'}} component={'h6'}>APPOINTMENT LETTER</Typography>

      
     
        </Grid>

        </Box>

            <Button onClick={GetPdf} >Get PDF</Button>

    </Grid>
  )
}
