// 部署合约到ropsten测试网络

const fs = require('fs')
const path = require('path')
const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')


const contractPath = path.resolve(__dirname, '../src/compiled/CourseList.json')
const {interface, bytecode} = require(contractPath)

const provider = new HDWalletProvider(
  "victory infant draw trophy prevent decline disorder monkey team skin real rabbit",
  "https://ropsten.infura.io/v3/eeff2f77d81e4b25b57507deb7a26b6b"
)
const web3 = new Web3(provider);

(async()=>{
  console.log('自执行')
  const accounts = await web3.eth.getAccounts()
  console.log('合约部署的账号：', accounts)
  // await
  console.time('合约部署消耗时间')
  const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data: bytecode})
                    .send({
                      from:accounts[0],
                      gas:'5000000'
                    })
  console.timeEnd('合约部署消耗时间')
  const contractAddress = result.options.address
  console.log('合约部署成功', contractAddress)
  console.log('合约查看地址', `https://ropsten.etherscan.io/address/${contractAddress}`)
  

  const addressFile = path.resolve(__dirname,'../src/address.js')
  fs.writeFileSync(addressFile, "export default "+JSON.stringify(contractAddress))
  console.log("地址写入成功",addressFile)
})()

