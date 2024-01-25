const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { utils } = require("ethers");
  
  describe("Token", function () {
  
   
    it("should mintToken", async () => {
       const [owner,acc1,acc2]=await ethers.getSigners();
       const token=await ethers.getContractFactory("Token");
       const tokenContract = await token.deploy();
       await tokenContract.connect(acc2).mintToken();
       await tokenContract.connect(acc1).mintToken(); 
       await tokenContract.connect(owner).mintToken(); 

       console.log(await tokenContract.getAddress());
    //    console.log(await tokenContract.connect(acc1).balanceOf(await tokenContract.getAddress()));

    //    const [owner] = await ethers.getSigners();

    //    const hardhatToken = await ethers.deployContract("Token");

        const ownerBalance = await tokenContract.balanceOf(owner.address);
        // expect(await tokenContract.totalSupply()).to.equal(ownerBalance);
        console.log(ownerBalance);
       
    });
     
});

































































































  
  
  