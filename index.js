const { validateNAandBA } = require('./validation');
const { sort } = require('./utils');
const { ipHostSize } = require('./ipHostSize');
const { TotalBrandwidthNeeded } = require('./bandwidth');
const { generateSubnet } = require('./subnet');

const listOfHosts = [
  '172.16.1.0/16',
  '172.18.1.0/16',
  '172.18.0.255/16',
  '172.17.0.0/16'
];

validateNAandBA(listOfHosts);


const names = [
  'Jurusan_B',
  'Jurusan_A',
  'Kelas_A',
  'Kelas_B',
  'Kelas_C',
  'Kelas_D',
  'Kelas_E',
  'Kelas_F'
];
const sizes = [133, 65, 2, 2, 2, 2, 2, 2];

TotalBrandwidthNeeded(names, sizes, 500);


const gedung = [
  { Jurusan_B: 133 },
  { Jurusan_A: 65 },
  { Kelas_A: 2 },
  { Kelas_B: 2 },
  { Kelas_C: 2 },
  { Kelas_D: 2 },
  { Kelas_E: 2 },
  { Kelas_F: 2 }
];
const NAHost = '172.20.0.0/16';
ipHostSize(NAHost);
const sortedGedung = sort(gedung)
generateSubnet(NAHost,sortedGedung, 'FLSM'); // can be either VLSM or FLSM
