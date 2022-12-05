import { React, useState } from 'react'
import { Grid, ButtonGroup, Button, Drawer, Chip } from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'salary_list'
const exportType = exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import { baseUrl, Item } from '../../util/lib';
export default function SalaryHistory(props) {
  const { data } = props;
  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.ammount,
    },
    {
      name: 'Date & Time',
      selector: row => row.transaction_time.replace('T', ' ').replace('.000Z', ''),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => <Chip label={row.status == 0 ? "Pending" : row.status == 1 ? "Sucessfull" : "Rejected"} color={row.status == 0 ? "primary" : row.status == 1 ? "success" : "error"} size={'small'}></Chip>,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => <ButtonGroup variant="text">
        <Button color="info" variant={'outlined'} size={'small'} href={`#`} >download</Button>
      </ButtonGroup>
    },
  ];

  const tableData = {
    columns,
    data,
  }
  return (
    <Grid container sx={{ 'textAlign': 'center!important', 'display': 'block', 'my': '2%', 'fontFamily': 'Playfair Display!important' }}>

      <Item>
        <DataTable
          columns={columns}
          data={data}
          pagination
          responsive
          fixedHeader={true}
          fixedHeaderScrollHeight={'400px'}
          title="Salary History"
          highlightOnHover={true}

        />
      </Item>

    </Grid>
  )
}
