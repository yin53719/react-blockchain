import React, { Component } from 'react';
import {Layout, Menu,message,Button,  Row, Col} from 'antd';

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import AdoptionJson from './truffle/build/contracts/Adoption.json'
import pets from './truffle/src/pets.json'

import './App.css';
const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props){
    super(props)
    this.web3 = null
    this.Adoption = null
    this.init()
    this.initAddress = '0x'+'0'.repeat(40)
    this.state = {
      adapters:[]
    }
  }
  init(){

    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache


      message.info('请安装metaMask插件')
      // this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    this.web3 = new Web3(this.web3Provider);

    this.initAdoption()
  }
  isActive(i){
    return this.state.adapters[i] == this.initAddress
  }
  initAdoption(){
      this.Adoption = TruffleContract(AdoptionJson);

      // Set the provider for our contract
      this.Adoption.setProvider(this.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return this.markAdopted();
  }
  async markAdopted(){
    const adoptionInstance = await this.Adoption.deployed()
    console.log(adoptionInstance)
    const adapters = await adoptionInstance.getAdopters.call();
    console.log(adapters)
    this.setState({adapters})
    return 


    // var adoptionInstance;

    // App.contracts.Adoption.deployed().then(function(instance) {
    //   adoptionInstance = instance;

    //   return adoptionInstance.getAdopters.call();
    // }).then(function(adopters) {
    //   for (i = 0; i < adopters.length; i++) {
    //     if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
    //       $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    //     }
    //   }
    // }).catch(function(err) {
    //   console.log(err.message);
    // });
  }

  async handleAdopted(petId){
    const accounts = await this.web3.eth.getAccounts()
    var account = accounts[0]
    const adoptionInstance = await this.Adoption.deployed()
    await adoptionInstance.adopt(petId, {from: account})
    this.markAdopted()
    // this.web3.eth.getAccounts(function(error, accounts) {
    //   if (error) {
    //     console.log(error);
    //   }

    //   var account = accounts[0];

    //   App.contracts.Adoption.deployed().then(function(instance) {
    //     adoptionInstance = instance;

    //     // Execute adopt as a transaction by sending account
    //     return adoptionInstance.adopt(petId, {from: account});
    //   }).then(function(result) {
    //     return App.markAdopted();
    //   }).catch(function(err) {
    //     console.log(err.message);
    //   });
    // });
  }
  render() {
    return (

      <Layout className="layout">
      <Header>

        <div className="logo" >
          <img src="/images/imooc.svg" alt=""/>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          {/* <Menu.Item key="1">nav 1</Menu.Item> */}
          {/* <Menu.Item key="2">nav 2</Menu.Item> */}
          {/* <Menu.Item key="3">nav 3</Menu.Item> */}
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }}>

      <Row gutter={40}>
        {pets.map((v,i)=>{
          return (

            <Col span={6}key={i}>
            <img src={v.picture} />
            <p className='name'>
              {v.name}
            
            </p>
            <div className='action'>
            {this.state.adapters.length
                ? this.isActive(i)?<Button type="primary" onClick={()=>this.handleAdopted(v.id)}>领养</Button>: '被领养啦'
                : '请点击激活metaMask'}
            </div>
            </Col>
          )
        })}
      </Row>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>



    )
  }
}

export default App;
