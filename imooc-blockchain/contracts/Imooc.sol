pragma solidity ^0.4.24;

contract CourseList{
  address public ceo;
  address[] public courses;
  bytes23[] public questions;
  constructor() public {
    ceo = msg.sender;
  }
  // 新建
  function createQa(bytes23 _hash1,bytes23 _hash2) public{
    questions.push(_hash1);
    questions.push(_hash2);
  }
  function getQa() public view returns(bytes23[]){
    return questions;
  }
  // 更新 比如有回复的时候
  function updateQa(uint _index, bytes23 _hash1, bytes23 _hash2) public{
      questions[_index*2] = _hash1;
      questions[_index*2+1] = _hash2;
  }
  function removeQa(uint _index) public{
      uint index = _index*2;
      uint len = questions.length;
      for(uint i=index;i<len-2;i=i+2){
        questions[i] = questions[i+2];
        questions[i+1] = questions[i+3];
      }
      delete questions[len-1];
      delete questions[len-2];
      questions.length = questions.length-2;
  }
  function createCourse(string _name,string _content,uint _target,uint _fundingPrice,uint _price,string _img) public{
    address newCourse = new Course(ceo,msg.sender, _name, _content, _target, _fundingPrice, _price, _img);
    courses.push(newCourse);
  }
  // 获取课程所有地址
  function getCourse() public view returns(address[]){
    return courses;
  }

  function removeCourse(uint _index) public{
    // 只有ceo能删除
    require(msg.sender == ceo);
    // 根据索引删除
    require(_index<courses.length);

    uint len = courses.length;
    for(uint i=_index;i<len-1;i++){
      courses[i] = courses[i+1];
    }
    delete courses[len-1];
    courses.length--;
  }
  function isCeo() public view returns(bool){
    return msg.sender==ceo;
  }
}

contract Course{
  address public ceo;
  address public owner;
  // 课程的作者可以上传视频
  string public name;
  string public content;
  uint public target;
  uint public fundingPrice;
  uint public price;
  string public img;
  string public video;
  bool public isOnline;
  uint public count;
  // 用户够买信息
  mapping(address=>uint) public users;
  constructor(address _ceo, address _owner,string _name,string _content,uint _target,uint _fundingPrice,uint _price,string _img) public{
    ceo = _ceo;
    owner = _owner;
    name = _name;
    content = _content;
    target = _target;
    fundingPrice = _fundingPrice;
    price = _price;
    img = _img;
    video = '';
    count = 0;
    isOnline = false;
  }
  function addVideo(string _video) public{
    require(msg.sender==owner);
    require(isOnline==true);
    video = _video;
  }
  // 众筹或者够买
  function buy() public payable{
    // 1. 用户没有购买过
    require(users[msg.sender]==0);
    if(isOnline){
      // 如果上线了 必须得用上线价格够买
      require(price == msg.value);
    }else{
      // 如果上线了 必须得用众筹价格够买
      require(fundingPrice == msg.value);
    }
    users[msg.sender] = msg.value;
    // 统计人数
    count += 1;
    if(target <= count*fundingPrice){
        // 钱超出目标
        if(isOnline){
          // 上之后的够买
          uint value = msg.value;
          // 分成
          ceo.transfer(value/10);
          owner.transfer(value-value/10);
        }else{
          // 没上线 第一次超出
          isOnline = true;
          // 转账
          // 上线之前的钱，都在合约内部，众筹者是拿不到的
          owner.transfer(count*fundingPrice);

        }
    }
  }

  // 获取详情
  function getDetail() public view returns(string,string,uint,uint,uint,string,string,uint,bool,uint){
    uint role;
    if(owner==msg.sender){
      role = 0; //课程创建者
    }else if(users[msg.sender]>0){
      role = 1; // 已购买
    }else{
      role = 2; // 没买
    }
    return (
      name,
      content,
      target,
      fundingPrice,
      price,
      img,
      video,
      count,
      isOnline,
      role
    );
  }
}