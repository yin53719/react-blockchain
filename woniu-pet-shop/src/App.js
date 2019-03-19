import React from 'react'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
// import AdoptionJson from './truffle/build/contracts/Adoption.json'
import ImoocJson from './truffle/build/contracts/Imooc.json'
import {Button, Layout,Row,Col} from 'antd'
import './App.css'
import pets from "./truffle/src/pets.json"

const { Header, Content, Footer } = Layout;
// web3
// truffle-contract
// 1. 链接合约
// 2. 执行一下合约内部函数
// 3. 添加ant.design ui库支持
// 4. 完成项

class App extends React.Component{
  constructor(props){
    super(props)
    this.web3 = null
    this.Imooc = null
    this.initAddress = '0x'+'0'.repeat(40)
    this.init()
    this.state = {
      courses:[]
    }
  }
  init(){
    if(typeof window.web3 !=='undefined'){
      this.web3Provider = window.web3.currentProvider
    }else{
      alert('请安装metaMask')
    }
    this.web3 = new Web3(this.web3Provider)
    this.initImooc()

  }
  initImooc(){
    this.Imooc = TruffleContract(ImoocJson)
    this.Imooc.setProvider(this.web3Provider)
    return this.markAdopted()
  }
  async markAdopted(){
    // 部署链接一下
    // await同步方式获取异步数据
    const imoocInstance = await this.Imooc.deployed()
    const courses = await imoocInstance.getCourses.call()
    console.log('xxx',courses)
    this.setState({courses})
  }
  async adopt(petId){
    const account = window.web3.eth.defaultAccount
    const adoptionInstance = await this.Adoption.deployed()
    await adoptionInstance.adopt(petId,{from:account})
    this.markAdopted()
  }
  isActive(i) {
    return this.state.courses[i] == this.initAddress
  }
  render(){

    return <div>hi</div>
    return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: '20px 50px' }}>
        <Row gutter={40}>
          {
            pets.map((v,i)=>{
              return (
                <Col span='6' key={i}>
                  <img src={v.picture} alt=""/>
                  <div className="center">
                  <p className="name">{v.name}</p>

                  {
                    this.isActive(i)
                      ? <Button type='primary' onClick={()=>this.adopt(i)}>领养</Button>
                      : <span>被领养</span>
                  }
                  </div>

                </Col>
              )
            })
          }
          


        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
      build by woniu @2018
      </Footer>

    </Layout>

    )
    
    
    
    // <Button type='primary' >领养第二个</Button>
  }
}

export default App