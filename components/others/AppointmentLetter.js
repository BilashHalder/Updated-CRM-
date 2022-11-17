import React from 'react'
import {Grid,Button,Box,Typography} from '@mui/material';
import jsPDF from 'jspdf';
import Canvas from 'html2canvas';

export default function AppointmentLetter() {
    const GetPdf=()=>{
        const doc = new jsPDF("p","pt","a4");
        doc.html(document.getElementById('appoint'),{
            callback:function(pdf){
                pdf.save("my.pdf")
            }
        })
        console.log("ok")
    }
  return (
    <Grid>

        <Box component="div" id="appoint">
        <Grid container>
        <Typography align={'justify'} sx={{'textAlign':'center','display':'block'}} component={'h6'}>APPOINTMENT LETTER</Typography>

        </Grid>

        </Box>

            {/* <Button onClick={GetPdf} >Get PDF</Button> */}

    </Grid>
  )
}
