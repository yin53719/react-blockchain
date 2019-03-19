pragma solidity ^0.4.24;

contract Imooc {
  address owner;
  uint courseIndex = 0 ;
  uint[] courseIds;
  uint[] onlineCourseIds;
  // mapping (uint =>Course)
  struct Course {
    address owner; // 课程owner
    string name; // 课程名字
    string content; // 课程内容介绍
    uint target; // 课程众筹目标
    uint fundingPrice; // 众筹价格
    uint fundingCount; // 众筹人数
    uint price;   // 上线价格
    string imgHash; // 图片hash
  }
  Course[] courses;
  // 获取课程
  function getCourses() public view returns(uint[]){
    return courseIds;
  }
  function getCourse(uint _id) public returns(address,string,string,uint,uint,uint,uint,string){
    Course memory course = courses[_id];
    return (course.owner,course.name,course.content,course.target,course.fundingPrice,course.fundingCount,course.price,course.imgHash);
    // return courses;
  }
  // 新增课程
  function addCourse(string _name, string _content, uint _target, uint _fundingPrice, uint _price) public returns(uint){
    courseIds.push(courseIndex);
    courseIndex+=1;
    Course memory course = Course(msg.sender,_name,_content,_target,_fundingPrice,0,_price,"");
    courses.push(course);
    return courseIndex;
  }

  // 参与众筹
  // function funding()

  // 添加视频
  // function addVideo()
  // address[16] public adopters;

  // function adopt(uint petId) public returns(uint){
  //   // 断言，
  //   require(petId>=0 && petId<16);
  //   adopters[petId] = msg.sender;
  //   return petId;
  // }
  // function getAdopters() public view returns(address[16]){
  //   return adopters;
  // }
}

