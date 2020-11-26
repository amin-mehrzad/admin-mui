import React from 'react';

import { v4 as uuid } from 'uuid';
import {
  //Brush,
  ColorLens,
  ClearAll,
  Delete,
  WbIncandescent,
  Assignment,
  SystemUpdateAlt
} from '@material-ui/icons';

let data=[
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Set the Open color and the Closed color as an RRGGBB hex value. ID range is 00 for a Global command or a single ID 01 to 30 for individual Light Indicator',
    media: <ColorLens fontSize="large" />,
    title: 'Set Status',
    button: 'Set Color',
    commandType: 1,
    commandKey: 'msg',
   // hubId:''

  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'The hub will clear all backlogged notifications from memory. Up to 28,000 notifications will be erased.',
    media: <ClearAll fontSize="large" />,
    title: 'Clear Notifications',
    button: 'Clear',
    commandType: 2,
    commandKey: 'msg',
   // hubId:''


  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'This command will simulate moving the TEST/PAIR selection switch in order to erase hub memory. ',
    media: <Delete fontSize="large" />,
    title: 'Clear IDs',
    button: 'Clear',
    commandType: 3,
    commandKey: 'msg',
   // hubId:''

  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Flashes two colors in an alternating pattern. Colors are set by an RRGGBB hex value; you may repeat the number of pulses and the on rate in milliseconds.',
    media: <WbIncandescent fontSize="large" />,
    title: 'Set Event',
    button: 'Set Event',
    commandType: 4,
    commandKey: 'msg',
    //hubId:''


  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Report Diagnostics to the server endpoint at ‘api/ device/status’ will generate additional attribute key pairs in JSON format. ',
    media: <Assignment fontSize="large" />,
    title: 'Read Diagnostic Data',
    button: 'Read Data',
    commandType: 5,
    commandKey: 'msg',
   //hubId:''


  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'This instruction works with the internal Bootloader routines to load a new firmware file into the hub. The server should send the binary or “Hex” file along with the command.',
    media: <SystemUpdateAlt fontSize="large" />,
    title: 'Update Firmware',
    button: 'Update',
    commandType: 6,
    commandKey: 'FirmwareUpdate',
   // hubId:''


  }
];
export default data