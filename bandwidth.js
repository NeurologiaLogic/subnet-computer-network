const brandwidthConversion = (size) => {
  const sizeNetwork={
    kbps : 1000,
    mbps : 1000**2,
    gbps : 1000**3
  }
  if(size<sizeNetwork.kbps){
    return `${size} Kpbs`
  }
  else if(size<sizeNetwork.mbps){
    return `${size/sizeNetwork.kbps} Mbps`
  }
  else{
    return `${size/sizeNetwork.mbps} Gbps`
  }
}

const TotalBrandwidthNeeded = (names, hosts, max_brandwidth_per_device) => {
  if (hosts) {
    hosts.map((host,index)=>console.log(`${names[index]} needs ${brandwidthConversion(host*max_brandwidth_per_device)}`))
    let total_brandwidth = hosts
      .reduce((prev,val) => prev+val,0)* max_brandwidth_per_device
      console.log(`Total_brandwidth needed: ${brandwidthConversion(total_brandwidth)} [brandwidth per device: ${max_brandwidth_per_device} kpbs]`)
      console.log("==================================================================")
      console.log(``)
    return total_brandwidth
  }
}

module.exports = {
  brandwidthConversion,
  TotalBrandwidthNeeded
};
