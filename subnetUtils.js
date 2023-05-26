const {
  printDots,
  subnetToDecimal,
  decimalToIp
} = require('./utils');

const getK = (size) => {
  let k = 0
  while (size + 2 > 2 ** k) {
    ++k
  }
  return k;
}

const subnetFromK = (k) => {
  let subnet = 32 - k;
  let decimalSubnet = decimalToIp(printDots(subnetToDecimal(subnet)))
  return decimalSubnet;
}

const getNextNA = (lastNA, k) => {
  let ip = lastNA.split('.')
  ip = ip.map(val => parseInt(val))
  let counterKtoFulfill = 2 ** k;
  while (counterKtoFulfill) {
    if (ip[3] === 255) {
      ip[3] = 0
      if (ip[2] === 255) {
        ip[2] = 0
        if (ip[1] === 255) {
          ip[1] = 0
          ip[0] += 1
        } else ip[1] += 1
      } else ip[2] += 1
    } else ip[3] += 1
    counterKtoFulfill--;
  }
  ip = ip.map(val => val.toString())
  return ip.join(".")
}

const getBA = (NA) => {
  let ip = NA.split('.').map(val => parseInt(val))
  let counterKtoFulfill = -1;
  while (counterKtoFulfill < 0) {
    if (ip[3] === 0) {
      ip[3] = 255
      if (ip[2] === 0) {
        ip[2] = 255
        if (ip[1] === 0) {
          ip[1] = 255
          ip[0] -= 1
        } else ip[1] -= 1
      } else ip[2] -= 1
    } else ip[3] -= 1
    counterKtoFulfill++;
  }
  ip = ip.map(val => val.toString())
  return ip.join(".")
}

const getLowerBoundIPRange = (NA) => {
  let ip = NA.split('.').map(val => parseInt(val))
  let counterKtoFulfill = 1;
  while (counterKtoFulfill) {
    if (ip[3] === 255) {
      ip[3] = 0
      if (ip[2] === 255) {
        ip[2] = 0
        if (ip[1] === 255) {
          ip[1] = 0
          ip[0] += 1
        } else ip[1] += 1
      } else ip[2] += 1
    } else ip[3] += 1
    counterKtoFulfill--;
  }
  ip = ip.map(val => val.toString())
  return ip.join(".")
}

const getUpperBoundIPRange = (BA) => {
  let ip = BA.split('.').map(val => parseInt(val))
  let counterKtoFulfill = -2;
  while (counterKtoFulfill < 0) {
    if (ip[3] === 0) {
      ip[3] = 255
      if (ip[2] === 0) {
        ip[2] = 255
        if (ip[1] === 0) {
          ip[1] = 255
          ip[0] -= 1
        } else ip[1] -= 1
      } else ip[2] -= 1
    } else ip[3] -= 1
    counterKtoFulfill++;
  }
  ip = ip.map(val => val.toString())
  return ip.join(".")
}

module.exports = {
  getK,
  subnetFromK,
  getNextNA,
  getBA,
  getLowerBoundIPRange,
  getUpperBoundIPRange
};