import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl,Item} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentlist'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import InvesmentView from './InvesmentView';




export default function InvesmentList(props) {
    const {data}=props;
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
            name: 'Status',
            selector: row =><span>{row.status==0? "Not Active" :row.status==1? "Active":"Others"}</span> ,
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

    const [viewDrawer, setViewDrawer] = useState(false);
    const [item, setItem] = useState(null);


    const tableData={
        columns,
        data,
      }
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  
 <Item>
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

   <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
      <InvesmentView data={item}/>
   </Drawer>
 </Item>

    </Grid>
  )
}
