import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Stack,Typography} from '@mui/material';
import {imageUrl} from 'src/util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function CustomerReferrals(props) {
    const {data}=props
    const columns = [
      {
          name: 'Id',
          selector: row => row.id,
          sortable: true,
      },
      {
          name: 'Name',
          selector: row =><Stack direction="row" spacing={4} ><Avatar alt={row.name} src={`${imageUrl}/${row.image}`} /> <Typography>{row.name}</Typography></Stack>,
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
  ];

    const [viewData, setviewData] = useState(null);


    const tableData={
        columns,
        data,
      }
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  

  <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            fixedHeader={true}
            fixedHeaderScrollHeight={'400px'}
            title="My Referral Customers"
            highlightOnHover={true}

        />

    </Grid>
  )
}
