import {React,useState,useEffect, use} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer,Chip} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EditAssociate from '../Edit/EditAssociate';
import ViewAssociate from '../View/ViewAssociate';



export default function DepositHistory(props) {
    const {user_id,user_type}=props;
    
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
        {
            name: 'Date & Time',
            selector: row => row.date_time.replace('T',' ').replace('.000Z',''),
            sortable: true,
        },
        {
            name: 'Payment Type',
            selector: row =><span>{row.mode==1?"Bank Deposit":row.mode==2?"UPI/IMPS":"Others"}</span> ,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <Chip label={row.status==0?"Pending":row.status==1?"Sucessfull":"Rejected"} color={row.status==0?"primary":row.status==1?"success":"error"} size={'small'}></Chip>,
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
        setEditDrawer(true);
    }

    const viewData=(single)=>{
        setViewDrawer(true);
    }


    const [data, setData] = useState([]);

    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);



    useEffect(() => {

        axios({
            method: "post",
            url: `${baseUrl}/deposit/user`,
            data:{user_id,user_type}
          })
            .then((response)=> {
              setData(response.data)
            })
            .catch((err)=> {
             console.log(err);
            });
    }, [])
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
            title="Your Deposit History"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
                <EditAssociate/>
         </Drawer>

         <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            <ViewAssociate/>
         </Drawer>

    </Grid>
  )
}
