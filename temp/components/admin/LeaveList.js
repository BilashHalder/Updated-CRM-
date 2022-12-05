import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Drawer} from '@mui/material';
import axios from 'axios';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import LeaveEdit from './LeaveEdit';


export default function LeaveList(props) {
    const {data,fun}=props;
    const columns = [
       
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Annual',
            selector: row => row.annual,
            sortable: true,
        },
        {
          name: 'Casual',
          selector: row => row.casual,
          sortable: true,
      },
      {
        name: 'Sick',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Maternity',
        selector: row => row.annual,
        sortable: true,
    },
    {
      name: 'Bereavement',
      selector: row => row.casual,
      sortable: true,
  },
  {
    name: 'Others',
    selector: row => row.others,
    sortable: true,
},
{
        name: 'Total',
        selector: row =>(parseInt( row.annual)+parseInt( row.casual)+parseInt( row.sick)+parseInt( row.maternity)+parseInt( row.bereavement)+parseInt( row.others)),
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
  
  {/* <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button> */}
   
         <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            fixedHeader={true}
            fixedHeaderScrollHeight={'400px'}
            title="All Leave"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
          <LeaveEdit data={item} fun={fun}/>
         </Drawer>



    </Grid>
  )
}
