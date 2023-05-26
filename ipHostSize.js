const ipHostSize = (NAHost) => {
  NAHost = NAHost.split('/')
  console.log(`IP:${NAHost[0]}/${NAHost[1]}`)
  console.log(`Total number of host: ${(2**(32-NAHost[1]))-2}\n`)
}

module.exports = {
  ipHostSize
};
