import React from 'react'
import { web3,getCourseContract ,saveImageToIpfs,ipfsPrefix} from '../config'
import {Row,Col,Form,Button,Badge, Upload} from 'antd'
const FormItem = Form.Item
class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      address: this.props.match.params.address,
      showAll:true
    }
    this.init()
  }
  async init(){
    const [account] = await web3.eth.getAccounts()
    const contract = getCourseContract(this.state.address)
    const detail = await contract.methods.getDetail().call({from:account})
    let [name, content, target, fundingPrice, price, img, video, count, isOnline, role] = Object.values(detail)
    this.setState({
      account,
      name,
      content,
      img,
      video,
      count,
      isOnline,
      role,
      target:web3.utils.fromWei(target),
      fundingPrice:web3.utils.fromWei(fundingPrice),
      price:web3.utils.fromWei(price)
    })
  }

  buy = async ()=>{
      const contract = getCourseContract(this.state.address)
      const buyPrice = this.state.isOnline?this.state.price:this.state.fundingPrice
      await contract.methods.buy()
              .send({
                from:this.state.account,
                value: web3.utils.toWei(buyPrice),
                gas:'6000000'
              })
      this.init()
  }
  handleUpload= async(file)=>{
    const hash = await saveImageToIpfs(file)
    const contract = getCourseContract(this.state.address)
    await contract.methods.addVideo(hash).send({
      from:this.state.account,
      gas:'6000000'
    })
    this.init()
  }
  render(){
    const formItemLayout={
      labelCol:{
        span:6
      },
      wrapperCol:{
        span:10
      }
    }
    return <Row type='flex' justify="center" style={{marginTop:"30px"}}>

      <Col span={20}>
        <Form>
          <FormItem {...formItemLayout} label="课程名">
            {this.state.name}
          </FormItem>
          <FormItem {...formItemLayout} label="课程简介">
            {this.state.content}
          </FormItem>
          <FormItem {...formItemLayout} label="众筹目标">
            {this.state.target} ETH
          </FormItem>
          <FormItem {...formItemLayout} label="众筹价格">
            {this.state.fundingPrice} ETH
          </FormItem>
          <FormItem {...formItemLayout} label="上线价格">
            {this.state.price} ETH
          </FormItem>

          <FormItem {...formItemLayout} label="支持人数">
            {this.state.count}
          </FormItem>

          <FormItem {...formItemLayout} label="状态">
            {this.state.isOnline ? <Badge count="已上线"></Badge>
                                  :<Badge count="众筹中"></Badge>}
          </FormItem>
          <FormItem {...formItemLayout} label="身份">
            {
              this.state.role==='0' && <Upload beforeUpload={this.handleUpload} showUploadList={false}>
                  <Button type='primary'>上传视频</Button>
              </Upload>
            }
            {
              this.state.role==='1' && "已购买"
            }
            {
              this.state.role==='2' && "学员"
            }
          </FormItem>
          <FormItem {...formItemLayout} label="视频状态">
            {this.state.video?(
              this.state.role=='2'?"已上传": <video controls width='300px' src={`${ipfsPrefix}${this.state.video}`}></video>
            ):"等待讲师上传"}
          </FormItem>
          <FormItem {...formItemLayout} label="购买">
            {
              this.state.role==='2' &&(
                <Button type='primary' onClick={this.buy}>
                  支持{this.state.isOnline?this.state.price:this.state.fundingPrice}ETH
                </Button>
              )
            }
          </FormItem>
        </Form>
      </Col>
    </Row>
  }
}

export default Detail