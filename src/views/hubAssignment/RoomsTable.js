import React, { useState } from 'react';
import MaterialTable from 'material-table'
import tableIcons from '../../icons/tableIcons'
import axios from 'axios'



const Rooms = ({ value,onChange, ...rest }) => {
  console.log(typeof(value.rooms))
  // const { useState } = React;
 const [selectedRow, setSelectedRow] = useState(null);
  const [sensorRange, setSensorRange] = useState([]);
 // const [data, setData] = useState([]); 
  return (
    <MaterialTable
      icons={tableIcons}
      title="Rooms:"
      columns={[
        { title: 'Room ID', field: 'room_id' , type: 'numeric'},
        { title: 'Room Type', field: 'room_type' },
        { title: 'Room Sub Type', field: 'room_sub_type' },
        { title: 'Room Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Total Stalls', field: 'total_stalls', type: 'numeric' },
        { title: 'Sensor Count', field: 'sensor_count', type: 'numeric' },
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
     data={value.rooms}
      onRowClick={(async (evt, selectedRow) => {
        console.log(selectedRow)
        let hrsResult = await axios({
          method: 'get',
          url: `http://${process.env.REACT_APP_SERVER_URI}/api/hub-room-sensors?campus_id=${selectedRow.campus_id}&venue_id=${selectedRow.venue_id}&venue_section_id=${selectedRow.venue_section_id}&room_id=${selectedRow.room_id}`,
          headers: { "Access-Control-Allow-Origin": "*" }
        })
        console.log(hrsResult.data)
         setSelectedRow(selectedRow.tableData.id);
        setSensorRange(hrsResult.data);
        //value={sensorRange:hrsResult.data,rooms:value.rooms}
        onChange(hrsResult.data)
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

export default Rooms;