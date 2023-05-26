const intToDecimal = (val) => {
  val = parseInt(val)
  let value = (!val) ? "00000000" : ""
  let counter = 7
  while (val) {
    if (val - 2 ** counter >= 0) {
      value += '1'
      val -= 2 ** counter
    } else {
      value += '0'
    }
    counter--;
  }
  while (value.length < 8) {
    value += '0'
  }
  return value
};

const decimalToInt = (decimal) => {
  let value = 0
  const counter = 7;
  for (let i = 0; i < decimal.length; i++) {
    value += (decimal[i] === '1') ? 2 ** (counter - i) : 0
  }
  return value
};

const cidr = (val) => {
  const cidrTable = [
    0, 128, 192, 224, 240, 248, 252, 254, 255
  ]
  return cidrTable[val]
};

const subnetToDecimal = (subnet) => {
  let value = []
  while (subnet) {
    // subnet/8!=Math.floor(subnet/8)
    if (subnet - 8 >= 0) {
      value.push('255')
      subnet -= 8
    } else {
      value.push(cidr(subnet))
      subnet = 0
    }
  }
  while (value.length < 4) {
    value.push('0')
  }
  let subnetToSubnetDot = value.join('.')
  return subnetToSubnetDot.split('.').map(val => intToDecimal(val)).join("")
};
const printDots = (val) => {
  let value = ""
  for (const [i, v] of val.split('').entries()) {
    value += v
    if ((i + 1) % 8 === 0 && i + 1 !== 8 * 4) {
      value += '.'
    }
  }
  return value
}
const ipToDecimal = (ip) => {
  return ip.split('.').map(val => intToDecimal(val)).join("")
};

const decimalToIp = (decimal) => {
  return decimal.split('.').map(val => decimalToInt(val)).join(".")
};

const AND = (a, b) => {
  let value = ""
  for (let i = 0; i < 8 * 4; i++) {
    if (a[i] === '1' && b[i] === '1')
      value += '1'
    else value += '0'
  }
  return value
};

const OR = (a, b) => {
  let value = ""
  for (let i = 0; i < 8 * 4; i++) {
    if (a[i] === '1' || b[i] === '1')
      value += '1'
    else value += '0'
  }
  return value
};

const sort = (gedung) => {
  return gedung.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}
// Export utility functions
module.exports = {
  intToDecimal,
  decimalToInt,
  cidr,
  subnetToDecimal,
  printDots,
  ipToDecimal,
  decimalToIp,
  AND,
  OR,
  sort
};
