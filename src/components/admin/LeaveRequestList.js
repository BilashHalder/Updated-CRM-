import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Drawer,Chip} from '@mui/material';
import axios from 'axios';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import LeaveRequestView from './LeaveRequestView';


export default function LeaveRequestList(props) {
    const {data,fun}=props;
    const columns = [
       
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Leave Type',
            selector: row => row.type,
            sortable: true,
        },
        {
          name: 'From',
          selector: row => row.from_date.slice(0,10),
          sortable: true,
      },
      {
        name: 'To',
        selector: row => row.to_date.slice(0,10),
        sortable: true,
    },
    {
        name: 'Total Days',
        selector: row => row.total_days,
        sortable: true,
    },
    {
      name: 'Status',
      selector: row =><>  <Chip label={row.status==0?"Pending":row.status==1?"Accepted":"Rejected"} color={row.status==0?"primary":row.status==1?"success":"error"} /> </> ,
      sortable: true,
  },  
  
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{viewData(row)}}>View</Button>
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
    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);
    const [item, setitem] = useState(null);
    const [flag, setFlag] = useState(null);

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
            title="Employee Leave Request"
            highlightOnHover={true}

        />

    
         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
           <LeaveRequestView data={item} fun={fun}/>
         </Drawer>

    </Grid>
  )
}
