import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Drawer} from '@mui/material';


import exportFromJSON from 'export-from-json';
const fileName = 'designation'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditDesignation from './EditDesignation';

export default function AllDesignation(props) {
    const {data,fun}=props;
    const columns = [
       
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
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

  


    
    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);

    const [item, setItem] = useState(null);
    const [flag, setFlag] = useState(false);
    const tableData={
        columns,
        data,
      }
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
            title="All Designation"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
               <EditDesignation data={item} fun={fun}/>
         </Drawer>

    </Grid>
  )
}
