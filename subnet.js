const {
  getK,
  getLowerBoundIPRange,
  getNextNA,
  getBA,
  getUpperBoundIPRange,
  subnetFromK
} = require ("./subnetUtils");

const fs = require("fs");

const appendData = (data) => {
  fs.appendFile("subnet.csv", data, (err) => {
    if (err) throw err;
  });
};

const generateSubnet = async (NA, gedung, type) => {
  let firstIP = null;
  firstIP = await NA.split('/');

  console.log(type);
  if (type !== "FLSM" && type !== "VLSM") {
    console.log("Type not defined. Only FLSM or VLSM available");
    process.exit(1);
  }

  console.log(`Initial IP ${NA}`);
  await appendData("Name,Number of Electronics,NA,Network Range,BA,Subnet Mask\n");
  await appendData("==============================================================\n");

  for (const [_, value] of Object.entries(gedung)) {
    console.log("==================================================================");
    console.log(`Gedung ${Object.keys(value)}: ${Object.values(value)[0]}`);

    let k = (type === "VLSM") ? getK(Object.values(value)[0]) : getK(Object.values(gedung[0])[0]);
    let cidr = 32 - k;
    let localNA = null;
    let range_below = null;
    let range_top = null;
    let nextNA = null;
    let localBA = null;

    localNA = `${firstIP[0]}`;
    range_below = getLowerBoundIPRange(localNA);
    nextNA = `${getNextNA(localNA, k)}`;
    localBA = getBA(nextNA);
    range_top = getUpperBoundIPRange(nextNA);

    console.log(`NA: ${localNA}/${cidr}`);
    console.log(`Range IP: ${range_below}/${cidr} - ${range_top}/${cidr}`);
    console.log(`BA: ${localBA}/${cidr}`);
    console.log(`Number of avl host: 0-${Math.pow(2, k) - 2}`);
    console.log(`Subnet: ${cidr}`);
    console.log(`Subnet in Decimal: ${subnetFromK(k)}`);

    await appendData(`${Object.keys(value)}, ${Object.values(value)}, ${localNA}/${cidr}, ${range_below}/${cidr} - ${range_top}/${cidr}, ${localBA}/${cidr}, ${subnetFromK(k)}\n`);

    firstIP = `${nextNA}/${firstIP[1]}`.split('/');
  }
};

module.exports = {
  generateSubnet
};
