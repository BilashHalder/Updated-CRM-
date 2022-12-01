import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Chip,Avatar,Drawer} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'salaryall'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import RequestView from './RequestView';




export default function RequsetAll(props) {
    const {data,title,fun}=props;
  
    
    const columns = [
       
        {
            name: 'Requset Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
      },
      {
        name: 'Phone',
        selector: row =>row.phone,
        sortable: true,
        },
        {
          name: 'Status',
          selector: row =><Chip label={row.status==0?"Pending":"Resolved"} color={row.status==0?"info":"success"}/>,
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
            title={title}
            highlightOnHover={true}
        />
         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            <RequestView data={item} fun={fun}/>
         </Drawer>

    </Grid>
  )
}
