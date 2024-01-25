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
















// Learning hardhat 

// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// const { expect } = require("chai");
// const { utils } = require("ethers");

// describe("FileShare", function () {

 
//   it("should add device", async () => {
//      const [owner,acc1,acc2]=await ethers.getSigners();
//  const token=await ethers.getContractFactory("Token");
//     const tokenContract = await token.deploy();
//     const stake = await ethers.getContractFactory("StakingPoolContract");
// const stakeContract = await stake.deploy(tokenContract.address,12,30);
//     const file = await ethers.getContractFactory("DeviceShare");
//     const fixedStake = utils.parseUnits("1");
//     const fileContract = await file.deploy(await tokenContract.address,fixedStake,stakeContract.address);
//     const contractAddress = fileContract.address;
//     const amtDeposite = utils.parseUnits("10");
//     await tokenContract.approve(stakeContract.address, (utils.parseUnits("10")).toString());
//     await stakeContract.depositStake(amtDeposite);
//     console.log(await stakeContract.getTotalStakeByProvider(await owner.getAddress()))
//     // await tokenContract.transfer(await acc1.getAddress(), utils.parseUnits("5"));
//     // await tokenContract.transfer(await acc2.getAddress(), utils.parseUnits("5"));
//     // await tokenContract.approve(contractAddress, (utils.parseUnits("5")).toString());
//     // await tokenContract.connect(acc1).approve(contractAddress,(utils.parseUnits("5")).toString());
//     //  await tokenContract.connect(acc2).approve(contractAddress,(utils.parseUnits("5")).toString());
//     await fileContract.addDevice("Intel", 30,30, 10, 1);
//     // await fileContract.connect(acc1).addDevice("AMD Ryzen 9", 30, 10, 1);
//     // await fileContract.connect(acc2).addDevice("AMD Ryzen GPU", 30, 10, 1);
//     // const tx = await fileContract.addDevice("Intel i9", 30, 10, 1);
//      let allDevices = await fileContract.getAllDevices();
//     console.log(allDevices);
//   });
   
//   it("should rmove device", async () => {
//      const [owner,acc1,acc2]=await ethers.getSigners();
//  const token=await ethers.getContractFactory("Token");
//     const tokenContract = await token.deploy();
//     const stake = await ethers.getContractFactory("StakingPoolContract");
// const stakeContract = await stake.deploy(tokenContract.address,12,30);
//     const file = await ethers.getContractFactory("DeviceShare");
//     const fixedStake = utils.parseUnits("1");
//     const fileContract = await file.deploy(await tokenContract.address,fixedStake,stakeContract.address);
//     const contractAddress = fileContract.address;
//     const amtDeposite = utils.parseUnits("10");
//     await tokenContract.approve(stakeContract.address, (utils.parseUnits("10")).toString());
//     await stakeContract.depositStake(amtDeposite);
//     console.log(await stakeContract.getTotalStakeByProvider(await owner.getAddress()))
//     // await tokenContract.transfer(await acc1.getAddress(), utils.parseUnits("5"));
//     // await tokenContract.transfer(await acc2.getAddress(), utils.parseUnits("5"));
//     // await tokenContract.approve(contractAddress, (utils.parseUnits("5")).toString());
//     // await tokenContract.connect(acc1).approve(contractAddress,(utils.parseUnits("5")).toString());
//     //  await tokenContract.connect(acc2).approve(contractAddress,(utils.parseUnits("5")).toString());
//     await fileContract.addDevice("Intel", 30,30, 10, 1);
//         await fileContract.addDevice("AMD Ryzen 9", 30,30, 10, 1);

//     // await fileContract.connect(acc1).addDevice("AMD Ryzen 9", 30, 10, 1);
//     // await fileContract.connect(acc2).addDevice("AMD Ryzen GPU", 30, 10, 1);
//     // const tx = await fileContract.addDevice("Intel i9", 30, 10, 1);
//      let allDevices = await fileContract.getAllDevices();
//     console.log(allDevices);
//     await fileContract.removeDevice(1)
//        allDevices = await fileContract.getAllDevices();
//     console.log(allDevices);
//   });

    // it("should Request device", async () => {
    //    function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
//      const [owner,acc1,acc2]=await ethers.getSigners();
//  const token=await ethers.getContractFactory("Token");
//     const tokenContract = await token.deploy();
//     const stake = await ethers.getContractFactory("StakingPoolContract");
// const stakeContract = await stake.deploy(tokenContract.address,12,30);
//     const file = await ethers.getContractFactory("DeviceShare");
//     const fixedStake = utils.parseUnits("1");
//     const fileContract = await file.deploy(await tokenContract.address,fixedStake,stakeContract.address);
//     const contractAddress = fileContract.address;
//     await stakeContract.setDeviceShareContract(contractAddress);
//     const amtDeposite = utils.parseUnits("10");
//     await tokenContract.approve(stakeContract.address, (utils.parseUnits("10")).toString());
//       await stakeContract.depositStake(amtDeposite);
//               console.log(await stakeContract.getTotalStakeByProvider(await owner.getAddress()));
    // console.log(await stakeContract.getTotalStakeByProvider(await owner.getAddress()))
    // await tokenContract.transfer(await acc1.getAddress(), utils.parseUnits("5"));
    // await tokenContract.transfer(await acc2.getAddress(), utils.parseUnits("5"));
    // await tokenContract.approve(contractAddress, (utils.parseUnits("5")).toString());
    // await tokenContract.connect(acc1).approve(contractAddress,(utils.parseUnits("5")).toString());
    //  await tokenContract.connect(acc2).approve(contractAddress,(utils.parseUnits("5")).toString());
    await fileContract.addDevice("Intel", 30, 10, utils.parseUnits("1"));
    // await fileContract.connect(acc1).addDevice("AMD Ryzen 9", 30, 10, 1);
    // await fileContract.connect(acc2).addDevice("AMD Ryzen GPU", 30, 10, 1);
    // const tx = await fileContract.addDevice("Intel i9", 30, 10, 1);
//  await tokenContract.transfer(await acc1.getAddress(),utils.parseUnits("100"));
//  await tokenContract.connect(acc1).approve(stakeContract.address, (utils.parseUnits("10")).toString());
//   await stakeContract.connect(acc1).depositStake(amtDeposite);
//   console.log(await stakeContract.getTotalStakeByProvider(await acc1.getAddress()));
//   await fileContract.connect(acc1).RequestDeviceUse(1,2);
//    console.log(await stakeContract.getTotalStakeByProvider(await acc1.getAddress()));
//    await fileContract.AcceptDeviceRequestByProvider(1);
//    await sleep(2000);
//    await fileContract.connect(acc1).WithdrawDeviceUsebyRequestor(1,1);
//     console.log(await stakeContract.getTotalStakeByProvider(await acc1.getAddress()));
//    console.log('------------------------------------');
//    console.log("reward",await fileContract.rewardEarnedByProvider(await owner.getAddress()));
//       console.log('------------------------------------');
//       console.log(await tokenContract.balanceOf(await owner.getAddress()));
//       await fileContract.TransferEarnedTokenToProvider(1, 1);
//       console.log(await tokenContract.balanceOf(await owner.getAddress()));
//         console.log(await stakeContract.getTotalStakeByProvider(await owner.getAddress()));
//       await fileContract.connect(acc1).RequestDeviceUse(1, 2);
//       await fileContract.AcceptDeviceRequestByProvider(2);
//       console.log(await fileContract.ViewDeviceRequestByRequestor());
//   });

  
 
  
 
});

































































































  
  
  