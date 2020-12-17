import React, {
  useEffect,
  useState,
} from 'react';
import MaterialTable from 'material-table'
import tableIcons from '../../icons/tableIcons'

import axios from 'axios';


//const tableIcons = 

const SensorRangeTable = ({ value, ...rest }) => {
  console.log(typeof (value))
  console.log(value)
  // const { useState } = React;
  // const [selectedRow, setSelectedRow] = useState(null);
  // const [sensorRange, setSensorRange] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(value.sensorRange)

  }, [value])

  //setData(value)
  console.log(data)

  return (
    <MaterialTable
      icons={tableIcons}
      title="Sensor Range:"
      columns={[
        { title: 'Hub ID', field: 'hub_id' , editable: 'onAdd'},
        { title: 'Sensor Range From', field: 'sensor_id_range_from', type: 'numeric' },
        { title: 'Sensor Range To', field: 'sensor_id_range_to', type: 'numeric' },
        { title: 'Active?', field: 'sensor_active' },
        { title: 'Gender', field: 'sensor_range_gender' },
        { title: 'Handicap?', field: 'sensore_handicap' },
        { title: 'Display Sensor', field: 'display_sensor' },
        { title: 'Updated', field: 'updated_at' , editable: 'never'}, //TODO:  add type date
        { title: 'Updated By', field: 'updated_by', editable: 'never' }
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
      data={data}
      // onRowClick={( (evt, selectedRow) => {
      //  console.log(selectedRow)
      //  setSelectedRow(selectedRow.tableData.id);
      // } )}

      options={{
        paging: false,
        search: false,
        rowStyle: rowData => ({
          //   backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '14px'

        })
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              var payload = {
                ...newData,
                campus_id: value.rooms[0].campus_id,
                venue_id: value.rooms[0].venue_id,
                venue_section_id: value.rooms[0].venue_section_id,
                room_id: value.selectedRoom
              }
              console.log(payload)

              axios({
                method: 'post',
                url: `http://${process.env.REACT_APP_SERVER_URI}/api/hub-room-sensors`,
                data: payload,
                headers: { "Access-Control-Allow-Origin": "*" }
              })
                .then((response) => {
                  console.log(response)
                  setData([...data, payload]);
                })

              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout( () => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              console.log(newData)
              var payload= {...newData, old_sensor_id_range_from:oldData.sensor_id_range_from}
              axios({
                method: 'put',
                url: `http://${process.env.REACT_APP_SERVER_URI}/api/hub-room-sensors`,
                data: payload,
                headers: { "Access-Control-Allow-Origin": "*" }
              })
                .then((response) => {
                  console.log(response)
                  setData([...dataUpdate]);
                })

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);

              axios({
                method: 'delete',
                url: `http://${process.env.REACT_APP_SERVER_URI}/api/hub-room-sensors`,
                data: oldData,
                headers: { "Access-Control-Allow-Origin": "*" }
              })
                .then((response) => {
                  console.log(response)
                  setData([...dataDelete]);
                })


              resolve()
            }, 1000)
          }),
      }}
    />
  )
}

//   ProductCard.propTypes = {
//     className: PropTypes.string,
//     product: PropTypes.object.isRequired
//   };

export default SensorRangeTable;