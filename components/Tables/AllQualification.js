import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditQualification from '../Edit/EditQualification';
import ViewQualification from '../View/ViewQualification';



export default function AllQualification() {
    
    const columns = [
       
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Degree Name',
            selector: row => row.degree_name,
            sortable: true,
        },
        {
          name: 'Year',
          selector: row => row.year_of_pass,
          sortable: true,
      },
      {
        name: 'Degree From',
        selector: row => row.degree_from,
        sortable: true,
    }, {
        name: 'Employee Id',
        selector: row => row.employee_id,
        sortable: true,
    },
     
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{viewData(row)}}>View</Button>
            <Button color="warning" onClick={()=>{editData(row)}}>Edit</Button>
          </ButtonGroup>
        },
    ];

   

    const closeView=()=>{
        setEditDrawer(false);
    }

    const closeEdit=()=>{
        setViewDrawer(false);
    }


    const editData=(single)=>{
        setItem(single);
        setEditDrawer(true);
    }

    const viewData=(single)=>{
        setItem(single);
        setViewDrawer(true);
    }


    const [data, setData] = useState([]);

    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);
    const [flag, setFlag] = useState(null);
    const [item, setItem] = useState(null);


    useEffect(() => {
        axios({
            method: "get",
            url: `${baseUrl}/qualification`,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response)=> {
              setData(response.data)
            })
            .catch((err)=> {
             console.log(err);
            });
    }, [flag]);
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  
  <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>
   
         <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            fixedHeader={true}
            fixedHeaderScrollHeight={'400px'}
            title="All Qualification"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
               <EditQualification data={item} fun={setFlag}/> 
         </Drawer>

         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            <ViewQualification data={item}/>
         </Drawer>

    </Grid>
  )
}
