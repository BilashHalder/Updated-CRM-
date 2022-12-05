import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import {baseUrl,imageUrl} from '../../../util/lib';
import router from 'next/router';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditAssociate from './EditAssociate';




export default function AssociateAll(props) {
    const {data,fun}=props
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => <span><Avatar alt={row.name} src={`${imageUrl}/${row.image}`} /> {row.name}</span>,
        },
        {
            name: 'Phone No',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
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
            <Button  color="info" onClick={()=>{
                router.push({
                    pathname: '/admin/associate/info',
                    query:{id:row.id}
                  })
            }}>View</Button>
            <Button color="warning" onClick={()=>{editData(row)}}>Edit</Button>
          </ButtonGroup>
        },
    ];



    const closeEdit=()=>{
        setEditDrawer(false);
    }


    const editData=(single)=>{
        setviewData(single)
        setEditDrawer(true);
       
    }

  

    const [editDrawer, setEditDrawer] = useState(false);
    const [viewData, setviewData] = useState(null);


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
            title="All Associate"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeEdit} >
            {
                viewData? <EditAssociate data={viewData} fun={fun}/>:<></>
            }
             
         </Drawer>

    </Grid>
  )
}
