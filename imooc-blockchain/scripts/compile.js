// 文件模块
const fs = require('fs')

const path = require('path')
const solc = require('solc')

const contractPath = path.resolve(__dirname,'../contracts/Imooc.sol')

// 获取合约文件内容
const source = fs.readFileSync(contractPath,'utf-8')
// 编译
const ret = solc.compile(source)
// console.log(ret)
if(Array.isArray(ret.errors) && ret.errors.length>0){
  // 出错了
  console.log(ret.errors[0])
}else{
  Object.keys(ret.contracts).forEach(name=>{
    const contractName = name.slice(1)
    const filePath = path.resolve(__dirname, `../src/compiled/${contractName}.json`)
    fs.writeFileSync(filePath,JSON.stringify(ret.contracts[name]))
    console.log(`${filePath} bingo`)
  })
}

// arr = [{name:'react',content:'xx',{name:'vue',content:'xx'}]
