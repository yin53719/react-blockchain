import React, { Component } from 'react'
import ipfsAPI from 'ipfs-api'
let ipfs = ipfsAPI('localhost', '5002', {protocol: 'http'})

// https://ipfs.io/ipfs/QmYkMuFZj7tyHFJRVe7ucqMNYGEiSXrjKdudm2mu7UD7er
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      hash:'',
      content:''
    }
    this.handleClick = this.handleClick.bind(this)
    
  }
  saveTextToIpfs(text){
    const descBuf = Buffer.from(text, 'utf-8')
    ipfs.add(descBuf).then(res=>{
      this.setState({
        hash:res[0].hash
      })
    })
  }
  handleClick(){
    this.saveTextToIpfs(this.state.text)
  }
  handleReadClick(){
    ipfs.cat(this.state.hash).then(res=>{
      let content = new TextDecoder('utf-8').decode(res)
      this.setState({
        content
      })
    })
  }
  render() {
    return (
      <div className="App">
        <input value={this.state.text} onChange={(e)=>{
            this.setState({
              text:e.target.value
            })
        }}/>
        <button onClick={this.handleClick}>提交数据到IPFS</button>
        <hr/>
        <p>
          hash is: {this.state.hash}
        </p>
        <button onClick={()=>this.handleReadClick()}>从IPFS读取数据</button>
        <p>
          {this.state.content}
        </p>
      </div>
    );
  }
}

export default App;
