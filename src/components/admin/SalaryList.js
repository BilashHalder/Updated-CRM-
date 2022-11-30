import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Drawer} from '@mui/material';
import axios from 'axios';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import SalaryView from './SalaryView';
import SalaryEdit from './SalaryEdit';


export default function AllSalary(props) {
    const {data,fun}=props;
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
            title="All Salary"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
          <SalaryEdit data={item} fun={fun}/>
         </Drawer>

         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
           <SalaryView data={item}/>
         </Drawer>

    </Grid>
  )
}
