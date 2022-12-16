const baseUrl='http://localhost:9000/api/';
const imageUrl='http://localhost:9000/uploads/images';
const docUrl='http://localhost:9000/uploads/documents';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {Paper} from '@mui/material'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));





const connection=(token)=>{
   let temp= axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      return temp;
}








const convertArrayOfObjectsToCSV=(args)=>{  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}















const downloadCSV = (args) =>{  
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}






const msDateToTodayDifference=(msdate)=>{
    msdate=msdate.slice(0,10);
    let date1=Date.parse(msdate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;

}


const calculateReturn=(data)=>{

// let date1=Date.parse(toString(startdate));
// let date2=Date.parse(toString(endate));
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// let daysinmonth=new Date(year, month, 0).getDate();

// amount=parseFloat(amount);
// roi=parseFloat(roi);
// days=parseInt(days);

return 1000;




}


const calculateSalary=(data)=>{
return 1000;
}
module.exports={baseUrl,imageUrl,docUrl,downloadCSV,Item,msDateToTodayDifference,calculateReturn,calculateSalary,connection}