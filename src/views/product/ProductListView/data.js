import { v4 as uuid } from 'uuid';
import ColorLensIcon from '@material-ui/icons/ColorLens';


export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Set the Open color and the Closed color as an RRGGBB hex value. ID range is 00 for a Global command or a single ID 01 to 30 for individual Light Indicator',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
  //  media: ColorLensIcon,
    title: 'Set Status',
    button: 'Set Color'
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'The hub will clear all backlogged notifications from memory. Up to 28,000 notifications will be erased.',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
    title: 'Clear Notifications',
    button: 'Clear'
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'This command will simulate moving the TEST/PAIR selection switch in order to erase hub memory. ',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
    title: 'Clear IDs',
    button: 'Clear'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Flashes two colors in an alternating pattern. Colors are set by an RRGGBB hex value; you may repeat the number of pulses and the on rate in milliseconds.',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
    title: 'Set Event',
    button: 'Set Event'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Report Diagnostics to the server endpoint at ‘api/ device/status’ will generate additional attribute key pairs in JSON format. ',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
    title: 'Read Diagnostic Data',
    button: 'Read Data'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'This instruction works with the internal Bootloader routines to load a new firmware file into the hub. The server should send the binary or “Hex” file along with the command.',
    media: 'https://www.computerhope.com/jargon/b/binary-0s-1s.jpg',
    title: 'Update Firmware',
    button: 'Update'
  }
];
