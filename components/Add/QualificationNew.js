import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'


export default function QualificationNew(props) {
  const {emp_id}=props;
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');



//Forms Data

const [degree, setDegree] = useState('');
const [collage, setCollage] = useState('');
const [year, setYear] = useState('');
const [marks, setMarks] = useState('');
const [doc, setDoc] = useState('');


//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
 if(degree.length<5){
    setAlertShow(true);
    setMessage('Please Enter a Valid Degree Name!');
    setaAertColor('error');
 }
 else if(collage.length<5){
  setAlertShow(true);
    setMessage('Please Enter a Valid University or Collage Name!');
    setaAertColor('error');
 }
 else if(year.toString().length!=4){
  setAlertShow(true);
    setMessage('Invalid Passout Year');
    setaAertColor('error');
 }
 else if(marks>100){
  setAlertShow(true);
    setMessage('Invalid Marks');
    setaAertColor('error');
 }
 else if(!doc){
  setAlertShow(true);
  setMessage('Please Upload Your Document');
  setaAertColor('error');
 }

 else if(doc.size>500000){
  setAlertShow(true);
  setMessage('Please Upload Document Size Less Than 500Kb');
  setaAertColor('error');
 }

 else if(doc.name.split('.').at(-1)!='pdf'){
  setAlertShow(true);
  setMessage('Please Upload Pdf File Only!');
  setaAertColor('error');
 }

else {
  let data = new FormData();
  data.append('degree_name',degree);
  data.append('year_of_pass',year);
  data.append('degree_from',collage);
  data.append('marks',marks);
  data.append('employee_id',emp_id);
  data.append('doc',doc);
  axios({
    method: "post",
    url: `${baseUrl}/qualification`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setAlertShow(true);
      setMessage("Qualification Information Saved");
      setaAertColor('success');
      resetForm();
    })
    .catch((response)=> {
      setAlertShow(true);
      console.log(response);
      setMessage('Please Try Again Later!');
      setaAertColor('error');
    });
}

 }

 const resetForm=()=>{
  console.log("res")
  setDegree('');
  setCollage('');
  setYear('');
  setMarks('');
  setDoc('');





 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add Qualification Details</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Degree Name"  type="text" required fullWidth  InputLabelProps={{ shrink: true}} value={degree} onChange={(e)=>{
        setDegree(e.target.value)
      }}/>
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField  label="University/Collage Name" type="text"  required  fullWidth  InputLabelProps={{ shrink: true}} value={collage} onChange={(e)=>{
        setCollage(e.target.value)
      }}/>
      </Grid >
      <Grid item md={2} xs={6}>
      <TextField  label="Passing Year" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={year} onChange={(e)=>{
        setYear(e.target.value)
      }}/>
      </Grid >
      <Grid item md={2} xs={6}>
      <TextField  label="Marks" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={marks} onChange={(e)=>{
        setMarks(e.target.value)
      }}/>
      </Grid >
      <Grid item md={4} xs={6}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
  Upload Document
  <input type="file"  hidden  onChange={(e)=>{
    setDoc(e.target.files[0])
  }} />
</Button>
      </Grid >
      <Grid item md={4} xs={6} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      <Button variant="outlined" type={'submit'} color="success">Save</Button>
      <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
     </Stack>
      </Grid>
    </Grid>
     </Box>

      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
      <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Grid>
  )
}
