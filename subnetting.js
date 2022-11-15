let searches =
"172.16.64.64/27\
".split(" ").filter(val=>val!=="")


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
}
const decimalToInt = (decimal) => {
  let value = 0
  const counter = 7;
  for (let i = 0; i < decimal.length; i++) {
    value += (decimal[i] === '1') ? 2 ** (counter - i) : 0
  }
  return value
}
const cidr = (val) => {
  // #tabel cidr
  const cidrTable = [
    0, 128, 192, 224, 240, 248, 252, 254, 255
  ]
  return cidrTable[val]
}
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
}
const ipToDecimal = (ip) => {
  return ip.split('.').map(val => intToDecimal(val)).join("")
}
const decimalToIp = (decimal) => {
  return decimal.split('.').map(val => decimalToInt(val)).join(".")
}
const AND = (a, b) => {
  let value = ""
  for (let i = 0; i < 8 * 4; i++) {
    if (a[i] === '1' && b[i] === '1')
      value += '1'
    else value += '0'
  }
  return value
}
const OR = (a, b) => {
  let value = ""
  for (let i = 0; i < 8 * 4; i++) {
    if (a[i] === '1' || b[i] === '1')
      value += '1'
    else value += '0'
  }
  return value
}

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
for (let search of searches) {
  const [ip, subnet] = search.split('/')
  automationValidation.push()
  console.log("==================================================================")
  console.log(`IP: ${decimalToIp(printDots(ipToDecimal(ip)))}`)
  console.log(`IP in Decimal: ${printDots(ipToDecimal(ip))}`)
  console.log(`Subnet mask: ${decimalToIp(printDots(subnetToDecimal(subnet)))}`)
  console.log(`Subnet mask in Decimal: ${printDots(subnetToDecimal(subnet))}`)
  console.log(`Network Address: ${decimalToIp(printDots(AND(ipToDecimal(ip),subnetToDecimal(subnet))))}`)
  console.log(`Network Address in Decimal: ${printDots(AND(ipToDecimal(ip),subnetToDecimal(subnet)))}`)
  console.log(`Broadcast Address: ${decimalToIp(printDots(OR(ipToDecimal(ip),subnetToDecimal(subnet))))}`)
  console.log(`Broadcast Address in Decimal: ${printDots(OR(ipToDecimal(ip),subnetToDecimal(subnet)))}`)
}
//diatas untuk mengvalidasi NA sebuah network

const NA = "172.16.128.0/18"
const names =
  "IBOX\
  Beehive\
  Starbucks\
  BCA\
  LKC\
  ATM_BCA\
  SRSC\
  Admisi"
  .split(" ")
  .filter(str => str !== "")
const sizes =
  "5\
  5\
  1\
  5\
  20\
  5\
  5\
  10"
  .split(" ")
  .filter(str => str !== "")
  .map(val => parseInt(val))
console.log(names, sizes)
if (names.length !== sizes.length) {
  console.log("Error: names and sizes must have same length")
  process.exit(1)
}
let gedung = []
names.map((name, index) => {
  let temp = {}
  temp[name] = sizes[index]
  return gedung.push(temp)
})
gedung.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
//1. sort
//2. cari size k yang lebih besar dari 2^k>size+2
//3. print subnetting yang dimiliki
//4. either sort as a long list or sort per lantai
const getK = (size) => {
  let k = 0
  while (size + 2 >= 2**k) {
    ++k
  }
  return k;
}

const subnetFromK = (k) => {
  let subnet = 32 - k;
  let decimalSubnet = decimalToIp(printDots(subnetToDecimal(subnet)))
  console.log(`Subnet mask: ${decimalSubnet}`)
  return decimalSubnet;
}

const getIP = (prev_ip, k) => {
  let ip = prev_ip.split('.')
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
const getRangeIP = (ipRange, k) => {
  let ip = ipRange.split('.').map(val => parseInt(val))
  let counterKtoFulfill = k;
  if (counterKtoFulfill < 0) {
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
  } else {
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
  }

  ip = ip.map(val => val.toString())
  return ip.join(".")
}
let firstIP = NA.split('/')
const fs = require('fs')
const appendData = (...str) => {
  for (const s of str) {
    fs.appendFile('./data.csv', s, err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
}
appendData("Name,Number of Electronics,NA,Network Range,BA,Subnet Mask\n");
appendData("==============================================================\n");
Object.entries(gedung).forEach(([_, value]) => {
  console.log("==================================================================")
  console.log(`Gedung ${Object.keys(value)}: ${ Object.values(value)[0]}`)
  let k = getK(Object.values(value)[0])
  let cidr = 32 - k;
  let localNA = null
  let range_below = null;
  let range_top = null;
  let localBA = null
  localNA = `${firstIP[0]}`;
  range_below = getRangeIP(firstIP[0], 1)
  localBA = `${getIP(firstIP[0],k)}/${firstIP[1]}`.split("/")
  range_top = getRangeIP(localBA[0], -2)
  console.log(`NA: ${localNA}/${cidr}`)
  console.log(`Range IP: ${range_below}/${cidr} - ${range_top}/${cidr}`)
  console.log(`BA: ${getRangeIP(localBA[0], -1)}/${cidr}`)
  let decimalSubnet = subnetFromK(k)
  // console.log(`${Object.keys(value)},`, `${Object.values(value)},`, `${localNA}/${cidr},`, `${range_below}/${cidr} - ${range_top}/${cidr},`, `${getRangeIP(localBA[0], -1)}/${cidr},`, `${decimalSubnet}\n`)
  appendData(`${Object.keys(value)},`, `${Object.values(value)},`, `${localNA}/${cidr},`, `${range_below}/${cidr} - ${range_top}/${cidr},`, `${getRangeIP(localBA[0], -1)}/${cidr},`, `${decimalSubnet}\n`)
  firstIP = localBA
  console.log("")
})