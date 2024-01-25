// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract StakingPoolContract is ReentrancyGuard {
    uint256 private FIXED_APY;
    uint256 private constant SECONDS_IN_YEAR = 31536000; // Number of seconds in a year (365 days)
    uint256 public MINIMUM_STAKING_TIME; // seconds in a month (30 days)
    bool public instant_withdrawl_allowed = false;
    address private owner;
    address deviceContract;
  
    mapping(address=>Stake) private stake;
   
    mapping(address => uint256) private rewards_ewarned;
    
    struct Stake {
        // uint256 id;
        uint256 amount;
        uint256 timestamp;
    }
    struct StakeProvide {
        uint256[] stakeids;
        uint256[] stakeamount;
    }
    mapping(address => StakeProvide) private providers;
    IERC20 private token;
    event StakeDeposited(
        address indexed staker,
        uint256 amount,
        uint256 timestamp
    );
    
       event StakeWithdrawn(
        address indexed staker,
        uint256 amount,
        uint256 timestamp
    );
    
    event RewardsWithdrawn(address indexed staker, uint256 amount,uint256 timestamp);
    constructor(
        address tokenAddress,
        uint256 _FIXED_APY,
        uint256 minmum_staking_time_in_days
    ) {
        token = IERC20(tokenAddress);
        MINIMUM_STAKING_TIME = minmum_staking_time_in_days * 24 * 60 * 60;
        FIXED_APY = _FIXED_APY;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }


    function depositStake(
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "Invalid stake amount");

        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Stake transfer failed"
        );

       
       stake[msg.sender].amount=stake[msg.sender].amount+amount;
       

        emit StakeDeposited(msg.sender, amount, block.timestamp);
    }

   

    function getTotalStakeByProvider(address staker) public view returns (uint256) {
       
        return stake[staker].amount;
    }

    function withdrawStake(
        uint256 amount
        // uint256 stake_id
    ) external nonReentrant {
        // require(stakes_count[msg.sender] > 0, "No stake found");
        require(
            amount <= stake[msg.sender].amount,
            "Withdraw amount is more than balance of stake."
        );
        require(
            (block.timestamp - stake[msg.sender].timestamp >=
                MINIMUM_STAKING_TIME) || instant_withdrawl_allowed,
            "MINIMUM STAKING TIME is not passed"
        );

       
        uint256 newAmount = stake[msg.sender].amount - amount;
        stake[msg.sender].amount= newAmount;
        

        require(token.transfer(msg.sender, amount), "Stake withdrawal failed");
        emit StakeWithdrawn(
            msg.sender,
            amount,
            block.timestamp
        );
    }

    function withdrawReward(
        uint256 amount,
        address _staker
    ) external nonReentrant {
        require(rewards_ewarned[_staker] > 0, "No Rewards Earned");
        require(
            amount <= rewards_ewarned[_staker],
            "It is more than current reward earned."
        );
        rewards_ewarned[_staker] -= amount;
        require(token.transfer(_staker, amount), "Rewards withdrawal failed");
        emit RewardsWithdrawn(_staker, amount,block.timestamp);
    }
    

    function getRewardsWithdrawable(
        address staker
    ) external view returns (uint256) {
        return rewards_ewarned[staker];
    }

    function updateMinimumStakingTime(uint256 _days) external onlyOwner {
        MINIMUM_STAKING_TIME = _days * 24 * 60 * 60;
    }

    function toggleWithdrawlInstantOrMonthly() external onlyOwner {
        instant_withdrawl_allowed = !instant_withdrawl_allowed;
    }

   

    function getOwner() external view returns (address) {
        return owner;
    }


    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    
    function setDeviceShareContract(address _deviceContract)external onlyOwner{
    deviceContract=_deviceContract;
}



    function deposit(uint amount,address requestor)external{
        require(msg.sender==deviceContract,"Can only be called from deviceShare Contract");
        require(stake[requestor].amount>=amount,"Insufficient Balance");
        stake[requestor].amount=stake[requestor].amount-amount;

        
    }

    function transferFromContract(uint amt,address _add,bool _reward)external{
        require(msg.sender==deviceContract,"Can only be called from deviceShare Contract");
        if(_reward)
        rewards_ewarned[_add]=rewards_ewarned[_add]+amt;
        else{
        
        stake[_add].amount=stake[_add].amount+amt;
        }
    }
    
}

