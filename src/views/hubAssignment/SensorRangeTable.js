import React, {
  useState,
  forwardRef
  // useEffect
} from 'react';
import MaterialTable from 'material-table'
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  SaveAlt,
  Remove,
  Search,
  ViewColumn
} from '@material-ui/icons';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const SensorRangeTable = ({ sensorData, ...rest }) => {
  console.log(typeof(sensorData))
  // const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);
  const [sensorRange, setSensorRange] = useState([]);
 // const [data, setData] = useState([]); 
  return (
    <MaterialTable
      icons={tableIcons}
      title="Sensor Range:"
      columns={[
        { title: 'Hub ID', field: 'hub_id' },
        { title: 'Sensor Range From', field: 'sensor_range_from', type: 'numeric' },
        { title: 'Sensor Range To', field: 'sensor_range_to' , type: 'numeric'},
        { title: 'Active?', field: 'sensor_active' },
        { title: 'Gender', field: 'sensor_range_gender' },
        { title: 'Handicap?', field: 'sensore_handicap'},
        { title: 'Display Sensor', field: 'display_sensor' },
        { title: 'Updated', field: 'updated_at' }, //TODO:  add type date
        { title: 'Updated By', field: 'updated_by' }
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]}
     // data={[
        // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
     // ]}
     data={sensorData}
      onRowClick={( (evt, selectedRow) => {
        console.log(selectedRow)
        setSelectedRow(selectedRow.tableData.id);
        } )}
      options={{
        paging :false,
        search:false,
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '14px'

        })
      }}
    />
  )
}

//   ProductCard.propTypes = {
//     className: PropTypes.string,
//     product: PropTypes.object.isRequired
//   };

export default SensorRangeTable;