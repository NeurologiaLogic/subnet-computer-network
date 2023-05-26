const { ipToDecimal, decimalToIp, subnetToDecimal, AND, OR, printDots } = require('./utils.js')
let resultsOfValidation = []
const autoValidation = () => {
  return resultsOfValidation.filter(val => val[0] != val[1])
}
const validateNAandBA = (listOfHosts) => {
  for (let search of listOfHosts) {
    const [ip, subnet] = search.split('/')
    let Ip = decimalToIp(printDots(ipToDecimal(ip)))
    let IpInDecimal = printDots(ipToDecimal(ip))
    let SubnetMask = decimalToIp(printDots(subnetToDecimal(subnet)))
    let SubnetMaskInDecimal = printDots(subnetToDecimal(subnet))
    let Na = decimalToIp(printDots(AND(ipToDecimal(ip), subnetToDecimal(subnet))))
    let NaInDecimal = printDots(AND(ipToDecimal(ip), subnetToDecimal(subnet)))
    let Ba = decimalToIp(printDots(OR(ipToDecimal(ip), subnetToDecimal(subnet))))
    let BaInDecimal = printDots(OR(ipToDecimal(ip), subnetToDecimal(subnet)))
    resultsOfValidation.push([ip, Na])
    console.log("==================================================================")
    console.log(`IP: ${Ip}`)
    console.log(`IP in Decimal: ${IpInDecimal}`)
    console.log(`Subnet mask: ${SubnetMask}`)
    console.log(`Subnet mask in Decimal: ${SubnetMaskInDecimal}`)
    console.log(`Network Address: ${Na}`)
    console.log(`Network Address in Decimal: ${NaInDecimal}`)
    console.log(`Broadcast Address: ${Ba}`)
    console.log(`Broadcast Address in Decimal: ${BaInDecimal}`)
  }
  let validationResult = autoValidation()
  if (validationResult.length) {
    console.log('\x1b[31m%s', 'Some of the NA are incorrect');
    for (let i of validationResult) {
      console.log(`IP: ${i[0]} has NA: ${i[1]}`)
    }
    console.log('\x1b[0m')
  } else {
    console.log('\x1b[32m%s\x1b[0m', 'All of the NA are Correct');
  }
  console.log("==================================================================")
};

// Export validation function
module.exports = {
  validateNAandBA
};
