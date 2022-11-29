import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Drawer,Chip} from '@mui/material';


import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import DepositInfo from './DepositInfo';



export default function AllDeposit(props) {
    const {data,fun}=props;
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

    const viewData=(single)=>{
        setViewDrawer(true);
        setTemp(single);
    }

    const [viewDrawer, setViewDrawer] = useState(false);
    const [temp, setTemp] = useState(null);
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
            title="All Deposit List"
            highlightOnHover={true}

        />

        <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
            {
                temp?<DepositInfo fun={fun} data={temp?temp:null}/>:<>Invalid Request</>
            }
         </Drawer>

    </Grid>
  )
}
