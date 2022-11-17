import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditSalary from '../Edit/EditSalary';
import ViewSalary from '../View/ViewSalary';



export default function AllSalary() {
    
    const columns = [
       
        {
            name: 'Basic',
            selector: row => row.basic,
            sortable: true,
        },
        {
            name: 'Hra',
            selector: row => row.hra,
            sortable: true,
        },
        {
          name: 'Conveyance',
          selector: row => row.conveyance,
          sortable: true,
      },
      {
        name: 'Total',
        selector: row =>(parseFloat( row.hra)+parseFloat( row.basic)+parseFloat( row.conveyance)+parseFloat( row.medical)+parseFloat( row.special)+parseFloat( row.pf)+parseFloat( row.insurance)),
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
      setitem(single);
        setEditDrawer(true);
    }

    const viewData=(single)=>{
        setitem(single);
        setViewDrawer(true);
    }


    const [data, setData] = useState([]);

    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);
    const [item, setitem] = useState(null);
    const [flag, setFlag] = useState(null);



    useEffect(() => {
        axios({
            method: "get",
            url: `${baseUrl}/salary`,
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
            title="All Salary"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
               <EditSalary data={item} fun={setFlag}/> 
         </Drawer>

         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            <ViewSalary data={item} />
         </Drawer>

    </Grid>
  )
}
