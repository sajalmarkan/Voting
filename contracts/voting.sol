// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract voting{

    struct vote{
    uint  age;
    string name;
    address addr;
    }
    uint public noOfVotes =0;

    address public owner;
    mapping(address=>vote) public votes;
    constructor(){
        owner = msg.sender;
    }

    function user( string memory _name,uint _age) external{
        require(owner!=msg.sender,"you are owner you cant vote");
        require(msg.sender!=votes[msg.sender].addr,"already voted");
        votes[msg.sender].name =_name;
        votes[msg.sender].age =_age;
        votes[msg.sender].addr=msg.sender;
        noOfVotes++;

        
    }
    function check(address addr1) external view returns(string memory abc){
        if(votes[addr1].age>=18){
            abc="you are eligible to vote";
            return abc;
        }
        else {
            abc="you are not eligible";
            return abc;
        }
    }
}