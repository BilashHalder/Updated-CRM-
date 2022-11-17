import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'nomineelist'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditNominee from '../Edit/EditNominee';



export default function AllNominee() {
    
    const columns = [
       
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
          name: 'Date of Birth',
          selector: row => row.dob.slice(0,10),
          sortable: true,
      },
      {
        name: 'User ID',
        selector: row => row.user_id,
        sortable: true,
    }, {
        name: 'User Type',
        selector: row => row.user_type==1?"Customer":"Associate",
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

  


    const editData=(single)=>{
         setItem(single);
        setEditDrawer(true);
    }

   


    const [data, setData] = useState([]);

    const [editDrawer, setEditDrawer] = useState(false);
    const [item, setItem] = useState(null);
    const [flag, setFlag] = useState(false);
    

    useEffect(() => {
        axios({
            method: "get",
            url: `${baseUrl}/nominee`,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response)=> {
              setData(response.data)
            })
            .catch((err)=> {
             console.log(err);
            });
    }, [flag])
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
            title="All nominee"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
               <EditNominee data={item} fun={setFlag}/> 
         </Drawer>

    

    </Grid>
  )
}
