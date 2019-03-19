pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Imooc.sol";


contract TestImooc{
  Imooc imooc = Imooc(DeployedAddresses.Imooc());

  function testUserCanAdd() public{
    uint index = imooc.addCourse('React开发区块链','很多干货',10,1,2);

    Assert.equal(index, 1, "One is One.");
    Assert.equal(bytes32("React开发区块链"),bytes32("React开发区块链"),"添加");
  }
  // function testCanGetAdopters() public{
  //   address expect = this;
  //  (address owner,string name, string content, uint target,uint fundingPrice,uint fundingCount,uint price,string imgHash) = imooc.getCourse(0);
  //   Assert.equal(owner, expect, '领养后，我的地址会被记录下来');
  // }
}