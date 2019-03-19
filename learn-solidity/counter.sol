// 结尾是.sol
// 1. 版本声明
pragma solidity ^0.4.24;
// http://remix.ethereum.org/
// contract关键字新建合约
contract Counter{
  // 变量必须声明类型
  uint num;
  address owner;
  string name = "woniu";
  uint [5] arr = [1,2,3,4,5];

  arr[1] = 3;
  arr.push(6);
  for(uint i =0;i<arr.length;i++){

  }
  // {woniu:18}

  mapping(address=>uint) users;

  users["address1"] = 100
  users["address2"] = 10
  // 所谓的代币 就是映射里自己存储的值
  users["address1"] -=10
  users["address2"] += 10

  struct Students{
    uint age;
    uint id;
    string name;
    string phone;
  }
  woniu = Students(18,0,'woniu'，'1381111111')

  // 0,1
  enum sex {male,female}
  // sex = 0
  constructor(){
    num = 0;
    // msg.sender 谁部署合约，这个值就是谁
    owner = msg.sender;
  }
  // 函数类型 public 公用函数
  function increment() public{
    if(owner==msg.sender){
      num += 1;
    }
  }
  // view函数 只读取变量，不写
  // 声明返回值类型
  function getNum() view returns (uint) {
    return num;
  }
}