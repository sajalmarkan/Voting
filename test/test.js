
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting contract",function(){
    let owner;
    let addr1;
    let addr2;
    let HardhatVoting;
    // let Voting;



    beforeEach(async function(){
        [owner, addr1, addr2] = await ethers.getSigners();

    
        Voting= await ethers.getContractFactory("voting");
        HardhatVoting = await Voting.deploy();
        

    });
    it("should set the owner correctly", async function(){
        const ContractOwner = await HardhatVoting.owner();
        expect(ContractOwner).to.equal(owner.address);
    });
    it("should allow user to register and vote", async function(){
        const addr1name ="abc";
        const addr1age=20;
        
        await HardhatVoting.connect(addr1).user(addr1name,addr1age);
        const addrVote =await HardhatVoting.votes(addr1.address);

        expect(addrVote.name).to.equal(addr1name);
        expect(addrVote.age).to.equal(addr1age);
        expect(addrVote.addr).to.equal(addr1.address);
    });
    it("should not allow owner to vote", async function(){
        const addr1name ="abc";
        const addr1age =20;
        await expect(HardhatVoting .user(addr1name, addr1age)).to.revertedWith("you are owner you cant vote");
    });
  it("should not allow user to vote twice", async function(){
    const addr1name ="abc";
    const addr1age=20;
    
    await HardhatVoting.connect(addr1).user(addr1name,addr1age);
    const addrVote =await HardhatVoting.votes(addr1.address);
    await expect(HardhatVoting.connect(addr1).user(addr1name,addr1age)).to.revertedWith('already voted')
  });
  it("should check total no of votes", async function (){
    const addr1name ="abc";
    const addr1age=20;
    const addr2name="xyz";
    const addr2age=25;
    await HardhatVoting.connect(addr1).user(addr1name,addr1age);
    await HardhatVoting.connect(addr2).user(addr2name,addr2age);
    const noOfVotes1= await HardhatVoting.noOfVotes();
    console.log(noOfVotes1);
     expect(noOfVotes1).to.equal(2n);
  })
  it("should not allow less than 18 to vote", async function(){
    await HardhatVoting.connect(addr1).user("addr1name",15);
     expect(await HardhatVoting.connect(addr1).check(addr1.address)).to.be.equal("you are not eligible");
    
  })
  it("should allow 18+ users to vote", async function(){
    await HardhatVoting.connect(addr1).user("addr1name",25);
    expect(await HardhatVoting.connect(addr1).check(addr1.address)).to.be.equal("you are eligible to vote");
  })


});
