const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { utils } = require("ethers");
  const { ethers } = require("hardhat");

  describe("StakingPoolContract", function () {

  //   let owner;
  //   let user;
  //   let stakingPoolContract;
  //   let token;

  //   // Deploy the contract and set up accounts before each test
  //   beforeEach(async function () {
  //    [owner, user] = await ethers.getSigners();

  //   // Deploy the token contract
  //   const Token = await ethers.getContractFactory("Token"); // Replace with your token contract name
  //   token = await Token.deploy();
  //   await token.waitForDeployment();
  //   await token.connect(user).mintToken(); 
  //   console.log("TOKEN ADDRESS",await token.address);

  //   // Deploy the StakingPoolContract
  //   const StakingPoolContract = await ethers.getContractFactory("StakingPoolContract");
  //   stakingPoolContract = await StakingPoolContract.deploy(
  //     token.address,
  //     10, // Set your desired FIXED_APY
  //     30 // Set your desired MINIMUM_STAKING_TIME
  //   );
  //   await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
  //   await stakingPoolContract.waitForDeployment();

  //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());
       
  // });


  
    // it("should depositStake", async () => {
    //     const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());
       
    //   //   console.log(stakeContract.address);
    //   //  await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //   //  await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //   //  await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //    console.log(await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress()));
       

    // });








    it("Should depositStake", async function () {

      const [owner,acc1,acc2]=await ethers.getSigners();
        const token=await ethers.getContractFactory("Token");
        const tokenContract = await token.deploy();
        await tokenContract.waitForDeployment();
        await tokenContract.connect(acc2).mintToken();
        await tokenContract.connect(acc1).mintToken(); 
        await tokenContract.connect(owner).mintToken(); 
        
        
        console.log("TOKEN ADDRESS",await tokenContract.getAddress());

      //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
       const fixedAPY = 12;
       const minDays = 30;
       const stake = await ethers.getContractFactory("StakingPoolContract");
       const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
       await stakingPoolContract.waitForDeployment();

       await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
       await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
       await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

      console.log("Staking Contract Address",await stakingPoolContract.getAddress());
      

      // it should fail if it does not have enough balance
      // const initialOwnerBalance = await tokenContract.balanceOf(owner.address); //10000
      await tokenContract.transfer(acc1.address, 5555);
      // const addr1Balance = await tokenContract.balanceOf(acc1.address);
      // expect(addr1Balance).to.equal(5);


      await hardhatToken.transfer(addr1.address, 5);
      await hardhatToken.transfer(addr2.address, 10);

     

      await expect(
        tokenContract.connect(acc1).transfer(owner.address, 11) //initially - 0 tokens addr1
      ).to.be.revertedWith("Not enough tokens");
      expect(await tokenContract.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );

     






      await tokenContract.transfer(acc1.address, 5);
      await tokenContract.transfer(acc2.address, 10);

      const myBigInt = BigInt(initialOwnerBalance);
      // const balance = parseInt(myBigInt);
      const balance = Number(myBigInt);
    
      const finalOwnerBalance = await tokenContract.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(balance - 15);

      const addr1Balance = await tokenContract.balanceOf(acc1.address);
      expect(addr1Balance).to.equal(5);
      const addr2Balance = await tokenContract.balanceOf(acc2.address);
      expect(addr2Balance).to.equal(10);


       
      

      // const ownerBalance = await tokenContract.balanceOf(owner.address)
      // console.log("BALANCE:--", ownerBalance);
      // const depositAmount = 10; 
      // // Check the user's balance after the deposit
      // await tokenContract.transfer(acc1.address, 60);
      // const userBalance = await tokenContract.balanceOf(acc1.address);
      // expect(userBalance).to.equal(depositAmount);

     // Set your desired deposit amount
    
      // // Approve the contract to spend tokens on behalf of the user
      // await tokenContract.connect(acc1).approve(stakingPoolContract.getAddress(), 10);
      

      // // // Deposit the stake
      // await stakingPoolContract.connect(acc1).depositStake(depositAmount);
  
      // // Check the contract's balance
      // const contractBalance = await tokenContract.balanceOf(stakingPoolContract.address);
      // expect(contractBalance).to.equal(depositAmount);
    });
  
    // Test withdrawing stakes
    // it("Should allow users to withdraw stakes", async function () {
    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());




    //   const depositAmount = ethers.utils.parseEther("10"); // Set your desired deposit amount
    //   const withdrawalAmount = ethers.utils.parseEther("5"); // Set your desired withdrawal amount
  
    //   // Approve the contract to spend tokens on behalf of the user
    //   await token.connect(user).approve(stakingPoolContract.address, depositAmount);
  
    //   // Deposit the stake
    //   await stakingPoolContract.connect(user).depositStake(depositAmount);
  
    //   // Withdraw the stake
    //   await stakingPoolContract.connect(user).withdrawStake(withdrawalAmount);
  
    //   // Check the user's balance after the withdrawal
    //   const userBalance = await token.balanceOf(user.address);
    //   expect(userBalance).to.equal(depositAmount.sub(withdrawalAmount));
  
    //   // Check the contract's balance
    //   const contractBalance = await token.balanceOf(stakingPoolContract.address);
    //   expect(contractBalance).to.equal(depositAmount.sub(withdrawalAmount));
    // });
  
    // // Test managing rewards
    // it("Should allow users to withdraw rewards", async function () {
    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());




    //   const depositAmount = ethers.utils.parseEther("10"); // Set your desired deposit amount
    //   const rewardAmount = ethers.utils.parseEther("2"); // Set your desired reward amount
  
    //   // Approve the contract to spend tokens on behalf of the user
    //   await token.connect(user).approve(stakingPoolContract.address, depositAmount);
  
    //   // Deposit the stake
    //   await stakingPoolContract.connect(user).depositStake(depositAmount);
  
    //   // Update the user's rewards
    //   await stakingPoolContract.connect(user).transferFromContract(rewardAmount, user.address, true);
  
    //   // Withdraw the rewards
    //   await stakingPoolContract.connect(user).withdrawReward(rewardAmount, user.address);
  
    //   // Check the user's balance after withdrawing rewards
    //   const userBalance = await token.balanceOf(user.address);
    //   expect(userBalance).to.equal(depositAmount.add(rewardAmount));
  
    //   // Check the contract's balance
    //   const contractBalance = await token.balanceOf(stakingPoolContract.address);
    //   expect(contractBalance).to.equal(depositAmount.sub(rewardAmount));
    // });


    // it("Should allow owner to update minimum staking time", async function () {

    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());





    //   const newMinimumStakingTime = 7 * 24 * 60 * 60; // Set the new minimum staking time in seconds
  
    //   // Call the updateMinimumStakingTime function
    //   await stakingPoolContract.connect(owner).updateMinimumStakingTime(newMinimumStakingTime);
  
    //   // Check if the MINIMUM_STAKING_TIME variable has been updated
    //   const updatedMinimumStakingTime = await stakingPoolContract.MINIMUM_STAKING_TIME();
    //   expect(updatedMinimumStakingTime).to.equal(newMinimumStakingTime);
    // });
  
    // it("Should allow owner to toggle withdrawal mode", async function () {

    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());





    //   // Call the toggleWithdrawlInstantOrMonthly function
    //   await stakingPoolContract.connect(owner).toggleWithdrawlInstantOrMonthly();
  
    //   // Check if the instant_withdrawl_allowed variable has been toggled
    //   const updatedWithdrawalMode = await stakingPoolContract.instant_withdrawl_allowed();
    //   expect(updatedWithdrawalMode).to.equal(true); // Assuming it starts as false
    // });
  
    // it("Should allow owner to get contract owner", async function () {
    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());


    //   // Call the getOwner function
    //   const contractOwner = await stakingPoolContract.getOwner();
  
    //   // Check if the returned owner matches the expected owner
    //   expect(contractOwner).to.equal(owner.address);
    // });
  
    // it("Should allow owner to change contract owner", async function () {
    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());


    //   // Call the changeOwner function to change the owner to newOwner
    //   await stakingPoolContract.connect(owner).changeOwner(newOwner.address);
  
    //   // Check if the owner has been successfully changed
    //   const updatedOwner = await stakingPoolContract.getOwner();
    //   expect(updatedOwner).to.equal(newOwner.address);
    // });
  
    // it("Should allow owner to set deviceShareContract address", async function () {
    //   const [owner,acc1,acc2]=await ethers.getSigners();
    //     const token=await ethers.getContractFactory("Token");
    //     const tokenContract = await token.deploy();
    //     await tokenContract.waitForDeployment();
    //     await tokenContract.connect(acc2).mintToken();
    //     await tokenContract.connect(acc1).mintToken(); 
    //     await tokenContract.connect(owner).mintToken(); 
        
    //     console.log("TOKEN ADDRESS",await tokenContract.getAddress());

    //   //  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //    const fixedAPY = 12;
    //    const minDays = 30;
    //    const stake = await ethers.getContractFactory("StakingPoolContract");
    //    const stakingPoolContract=await stake.deploy(tokenContract.getAddress(),fixedAPY,minDays);
    //    await stakingPoolContract.waitForDeployment();

    //    await stakingPoolContract.connect(owner).getTotalStakeByProvider(await owner.getAddress());
    //    await stakingPoolContract.connect(acc1).getTotalStakeByProvider(await acc1.getAddress());
    //    await stakingPoolContract.connect(acc2).getTotalStakeByProvider(await acc2.getAddress());

    //   console.log("Staking Contract Address",await stakingPoolContract.getAddress());


    //   const newDeviceContractAddress = "0x1234567890123456789012345678901234567890"; // Set the new device contract address
  
    //   // Call the setDeviceShareContract function to set the new device contract address
    //   await stakingPoolContract.connect(owner).setDeviceShareContract(newDeviceContractAddress);
  
    //   // Check if the deviceContract variable has been updated
    //   const updatedDeviceContract = await stakingPoolContract.deviceContract();
    //   expect(updatedDeviceContract).to.equal(newDeviceContractAddress);

    // });


    
  });






















// describe("StakingPoolContract", function () {
//   let stakingPoolContract;
//   let owner;
//   let user1;
//   let token;

//   before(async () => {
//     // Deploy the token contract
//     // const Token = await ethers.getContractFactory("Token");
//     // const token = await Token.deploy();
//     // await token.deployed();

//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//        const APYContract=await hre.ethers.getContractFactory("StakingPoolContract");
 
//        const tokenAddress = "0x30233906DF257f6E712094C4961E9f375ea9FCbD";
//        const fixedAPY = 12;
//        const minDays = 30;
//        const contract=await APYContract.deploy(tokenAddress,fixedAPY,minDays);
//       //  await contract.deployed();

//       console.log("Contract Address", contract.address)

//     // Deploy the StakingPoolContract
//     // const StakingPoolContract = await ethers.getContractFactory("StakingPoolContract");
//     // stakingPoolContract = await StakingPoolContract.deploy(
//     //   await token.address,
//     //   10, 
//     //   30 
//     // );
//     // await stakingPoolContract.deployed();

//     // Get the owner and a user account for testing
//     [owner, user1] = await ethers.getSigners();
//   });

//   it("Should allow users to deposit stakes", async function () {
//     const initialBalance = await token.balanceOf(user1.address);
//     const depositAmount = ethers.utils.parseEther("10"); // Set your desired deposit amount

//     // Approve the contract to spend tokens on behalf of the user
//     await token.connect(user1).approve(stakingPoolContract.address, depositAmount);

//     // Deposit the stake
//     await stakingPoolContract.connect(user1).depositStake(depositAmount);

//     const finalBalance = await token.balanceOf(user1.address);
//     expect(finalBalance).to.equal(initialBalance.sub(depositAmount));
//   });

//   // it("Should allow users to withdraw stakes", async function () {
//   //   const withdrawalAmount = ethers.utils.parseEther("5"); // Set your desired withdrawal amount

//   //   // Withdraw the stake
//   //   await stakingPoolContract.connect(user1).withdrawStake(withdrawalAmount);

//   //   const finalBalance = await token.balanceOf(user1.address);
//   //   expect(finalBalance).to.equal(initialBalance.sub(depositAmount).add(withdrawalAmount));
//   // });

//   // // Add more test cases for other functions as needed

//   // it("Should not allow withdrawal before minimum staking time", async function () {
//   //   // Implement this test case to check if withdrawal before MINIMUM_STAKING_TIME fails as expected
//   // });
// });





















