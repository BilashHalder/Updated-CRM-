import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer,Chip} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentlist'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditInvesment from '../Edit/EditInvesment';
import ViewInvesment from '../View/ViewInvesment';



export default function AllInvesment(props) {

  const data=props.data;
    
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.ammount,
            sortable: true,
        },
        {
            name: 'ROI',
            selector: row => row.roi,
            sortable: true,
        },
        {
          name: 'Date & Time',
          selector: row => row.date_time.replace('T',' ').replace('.000Z',''),
          sortable: true,
      },
        {
            name: 'Status',
            selector: row =><Chip
            label={row.status==0?"Pending":row.status==1?"Active":row.status==2?"Withdraw Request":"Close"}
            color={row.status==0?"warning":row.status==1?"success":row.status==2?"info":"error"}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          /> ,
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
        setItem(single)
        setEditDrawer(true);
    }

    const viewData=(single)=>{
        setItem(single)
        setViewDrawer(true);
    }

    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);
    const [flag, setFlag] = useState(null);
    const [item, setItem] = useState(null);

   
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
            title="All Invesment"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
               <EditInvesment data={item} fun={setFlag}/> 
         </Drawer>

         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            <ViewInvesment data={item}/>
         </Drawer>

    </Grid>
  )
}
