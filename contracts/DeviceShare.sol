// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface IStakingPool {
    function getTotalStakeByProvider(address) external view returns (uint256);

    function withdrawReward(uint256 amount, address _staker) external;

    function deposit(uint, address) external;

    function transferFromContract(
        uint amt,
        address _add,
        bool _reward
    ) external;
}

contract DeviceShare {
    uint256 public FIXED_STAKE;
    uint256 private constant SECONDS_IN_YEAR = 31536000; // Number of seconds in a year (365 days)
    address public owner;
    IStakingPool public poolContract;

    IERC20 private token;

    constructor(
        address tokenAddress,
        uint256 _FIXED_STAKE,
        address _poolContract
    ) {
        token = IERC20(tokenAddress);
        poolContract = IStakingPool(_poolContract);
        owner = msg.sender;
        FIXED_STAKE = _FIXED_STAKE;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    struct Provide {
        string[] name;
        uint256[] totalGPU;
        uint256[] GPURam;
        string[] uri;
        uint256[] hrs;
        uint256[] tokenRate;
        uint256[] devid;
        bool[] engage;
        address payable recipient;
        uint256[] reqDetailsPerDevice;
    }

    struct DeviceDetails {
        string name;
        uint256 totalGPU;
        uint GPURam;
        string uri;
        uint256 hrs;
        uint256 tokenRate;
        uint256 devid;
        bool engage;
        address payable recipient;
        uint256[] requestIDs;
        uint256[] requestHRs;
        uint256 finalRequestID;
        uint256 timestamp;
        // uint256 stakeid;
    }
    mapping(address => Provide) public providers;
    mapping(uint256 => DeviceDetails) public deviceDetails;
    mapping(address => uint256) public rewardEarnedByProvider;
    uint256 public deviceID;

    // uint256 stake_id;

    // struct Stake {
    //     uint256 stakeId;
    //     uint256 amt;
    //     uint256 timeStake;
    // }
    // mapping(address => uint256) private stakes_count;
    // mapping(address => uint256) private rewards_earned;
    // mapping(address => mapping(uint256 => Stake)) private stakes_pool;

    string[] allDevices;
    uint256[] totalGPUDevices;
    uint256[] GPURamDevices;
    string[] uri;
    uint256[] hrsDevices;
    uint256[] tokenrateDevices;
    uint256[] deviceidDevices;

    event DeviceAdded(uint256 indexed idOfDevice);

    mapping(uint => bool) public verifiedProvider;
    mapping(uint => bool) public listedDevices;

    function verifyProvider(uint _devID) external onlyOwner {
        require(!verifiedProvider[_devID], "already Verified");
        verifiedProvider[_devID] = true;
    }

    modifier ifVerified(uint _devID) {
        require(verifiedProvider[_devID], "Wait for Verification");
        _;
    }
    modifier isListed(uint _devID) {
        require(listedDevices[_devID], "Device not Listed");
        _;
    }

    function listDevice(uint _devID) external ifVerified(_devID) {
        require(!listedDevices[_devID], "already Listed");
        DeviceDetails memory device = deviceDetails[_devID];
        address ownerOfDevice = device.recipient;
        require(msg.sender == ownerOfDevice, "Not the owner of device");
        listedDevices[_devID] = true;
    }

    function unlistDevice(uint _devID) public {
        DeviceDetails memory device = deviceDetails[_devID];
        address ownerOfDevice = device.recipient;
        require(msg.sender == ownerOfDevice, "Not the owner of device");
        require(listedDevices[_devID], "already UnListed");
        listedDevices[_devID] = false;
    }

    function addDevice(
        string memory _name,
        uint256 _totalGPU,
        uint _gpuRam,
        string memory _uri,
        uint256 _hrs,
        uint256 _tokenrate
    ) external {
        uint256 stakedAmount = poolContract.getTotalStakeByProvider(msg.sender);
        require(stakedAmount >= FIXED_STAKE, "Insufficient stake");
        Provide storage newProvide = providers[msg.sender];
        newProvide.name.push(_name);
        newProvide.totalGPU.push(_totalGPU);
        newProvide.GPURam.push(_gpuRam);
        newProvide.uri.push(_uri);
        newProvide.hrs.push(_hrs);
        newProvide.engage.push(false);
        newProvide.recipient = payable(msg.sender);
        newProvide.tokenRate.push(_tokenrate);

        allDevices.push(_name);
        totalGPUDevices.push(_totalGPU);
        GPURamDevices.push(_gpuRam);
        uri.push(_uri);
        hrsDevices.push(_hrs);
        tokenrateDevices.push(_tokenrate);
        ++deviceID;
        DeviceDetails storage newDevice = deviceDetails[deviceID];
        newDevice.name = _name;
        newDevice.totalGPU = _totalGPU;
        newDevice.GPURam = _gpuRam;
        newDevice.uri = _uri;
        newDevice.hrs = _hrs;
        newDevice.engage = false;
        newDevice.recipient = payable(msg.sender);
        newDevice.devid = deviceID;
        newDevice.tokenRate = _tokenrate;

        newProvide.devid.push(deviceID);
        deviceidDevices.push(deviceID);

        // stake_id = ++stakes_count[msg.sender];

        // stakes_pool[msg.sender][stake_id] = Stake(
        //     stake_id,
        //     FIXED_STAKE,
        //     block.timestamp
        // );

        // newProvide.stakeids.push(stake_id);
        // newDevice.stakeid = stake_id;

        emit DeviceAdded(deviceID);
    }

    function getAllDevices()
        public
        view
        returns (
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        )
    {
        return (
            allDevices,
            totalGPUDevices,
            GPURamDevices,
            uri,
            hrsDevices,
            tokenrateDevices,
            deviceidDevices
        );
    }

    function getDeviceByProvider()
        public
        view
        returns (
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        )
    {
        Provide storage thisProvide = providers[msg.sender];
        return (
            thisProvide.name,
            thisProvide.totalGPU,
            thisProvide.GPURam,
            thisProvide.uri,
            thisProvide.hrs,
            thisProvide.tokenRate,
            thisProvide.devid
        );
    }

    function getDeviceByDeviceID(
        uint256 _deviceID
    )
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256,
            bool
        )
    {
        DeviceDetails storage thisDevice = deviceDetails[_deviceID];
        return (
            thisDevice.name,
            thisDevice.hrs,
            thisDevice.totalGPU,
            thisDevice.uri,
            thisDevice.GPURam,
            thisDevice.tokenRate,
            thisDevice.engage
        );
    }

    function compare(
        string memory str1,
        string memory str2
    ) public pure returns (bool) {
        if (bytes(str1).length != bytes(str2).length) {
            return false;
        }
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    function removeDevice(uint256 _deviceID) public {
        DeviceDetails storage thisDevice = deviceDetails[_deviceID];
        Provide storage thisProvide = providers[thisDevice.recipient];
        require(thisDevice.engage == false, "The device is already engaged");
        // require(stakes_count[msg.sender] > 0, "No stake found");
        // require(
        //     block.timestamp > stakes_pool[msg.sender][thisDevice.stakeid].timeStake,
        //     "Time period has not elapsed."
        // );
        // require(
        //     stakes_pool[msg.sender][thisDevice.stakeid].amt > 0,
        //     "Reward alredy withdrawn"
        // );
        require(
            thisDevice.recipient == msg.sender,
            "You are not the owner of the device."
        );

        for (uint256 j = 0; j < allDevices.length; j++) {
            bool same = compare(thisDevice.name, allDevices[j]);
            if (same == true) {
                delete allDevices[j];
                delete hrsDevices[j];
                delete totalGPUDevices[j];
                delete uri[j];
                delete GPURamDevices[j];
                delete tokenrateDevices[j];
                delete deviceidDevices[j];
            }
        }

        for (uint256 i = 0; i < (thisProvide.name).length; i++) {
            bool sameName = compare(thisDevice.name, thisProvide.name[i]);
            if (sameName == true) {
                thisProvide.name[i] = " ";
                thisProvide.hrs[i] = 0;
                thisProvide.recipient = payable(address(0));
                thisProvide.totalGPU[i] = 0;
                thisProvide.GPURam[i] = 0;
                thisProvide.uri[i] = " ";
                thisProvide.tokenRate[i] = 0;
            }
        }

        thisDevice.name = " ";
        thisDevice.hrs = 0;
        thisDevice.recipient = payable(address(0));
        thisDevice.totalGPU = 0;
        thisDevice.GPURam = 0;
        thisDevice.uri = " ";
        thisDevice.tokenRate = 0;

        // stakes_pool[msg.sender][thisDevice.stakeid] = Stake(thisDevice.stakeid, 0, block.timestamp);
    }

    struct Request {
        uint256 reqID; //0
        uint256 devID; //1
        address deviceOwner; //2
        uint256 hrsStake; //3
        bool engage; //4
        address reqAddress; //5
        uint256 req_creation_timestamp; //6
        uint256 req_accept_timestamp; //7
        uint256[] paid_tokens_array;
        uint256[] paid_token_timestamps;
        bool request_end; //8
        bool cancelRequest; //9
        string cancelReason; //10
    }
    mapping(uint256 => Request) public requests;
    uint256 public requestID;

    struct Requestor {
        uint256[] reqIDs;
        address requestorAddress;
        uint256 paidTokensTotal;
    }
    mapping(address => Requestor) public requestors;

    event RequestAdded(uint256 indexed idOfRequest);

    function RequestDeviceUse(
        uint256 _deviceID,
        uint256 _hrsToStake
    ) external isListed(_deviceID) {
        uint256 stakedAmountByRequestor = poolContract.getTotalStakeByProvider(
            msg.sender
        );
        DeviceDetails storage thisDevice = deviceDetails[_deviceID];
        uint amt = _hrsToStake * thisDevice.tokenRate;
        console.log(thisDevice.recipient == msg.sender);
        require(
            thisDevice.recipient != msg.sender,
            "Could not request your own device"
        );
        require(
            stakedAmountByRequestor >= amt * 10 ** 18,
            "Insufficient stake"
        );
        require(thisDevice.engage == false, "The device is already engaged");
        ++requestID;
        Request storage newRequest = requests[requestID];
        newRequest.reqID = requestID;
        newRequest.devID = _deviceID;
        newRequest.deviceOwner = thisDevice.recipient;
        newRequest.hrsStake = _hrsToStake;
        newRequest.engage = false;
        newRequest.reqAddress = msg.sender;
        newRequest.req_creation_timestamp = block.timestamp;
        newRequest.request_end = false;
        Requestor storage newRequestor = requestors[msg.sender];
        newRequestor.reqIDs.push(requestID);
        newRequestor.requestorAddress = msg.sender;
        newRequestor.paidTokensTotal = _hrsToStake * thisDevice.tokenRate;

        thisDevice.requestIDs.push(requestID);
        thisDevice.requestHRs.push(_hrsToStake);

        Provide storage thisProvide = providers[thisDevice.recipient];
        thisProvide.reqDetailsPerDevice.push(_deviceID);
        thisProvide.reqDetailsPerDevice.push(requestID);
        thisProvide.reqDetailsPerDevice.push(_hrsToStake);
        emit RequestAdded(requestID);
    }

    function getRequestSent() public view returns (uint[] memory) {
        return requestors[msg.sender].reqIDs;
    }

    uint256[] viewDetailsForProvider;

    function ViewDeviceRequestByRequestor()
        public
        view
        returns (uint256[] memory)
    {
        Provide storage thisProvide = providers[msg.sender];
        return (thisProvide.reqDetailsPerDevice);
    }

    function AcceptDeviceRequestByProvider(
        uint256 _reqID
    ) public isListed(requests[_reqID].devID) {
        Request storage thisRequest = requests[_reqID];
        DeviceDetails storage thisDevice = deviceDetails[thisRequest.devID];
        require(
            msg.sender == thisRequest.deviceOwner,
            "You are not the owner of the device"
        );
        require(
            thisDevice.engage == false,
            "The provider is already busy, no resources available."
        );
        require(!thisRequest.cancelRequest, "Request is already rejected");
        thisDevice.engage = true;
        thisRequest.engage = true;
        thisRequest.paid_tokens_array.push(0);
        thisRequest.paid_token_timestamps.push(block.timestamp);

        thisDevice.finalRequestID = _reqID;
        thisDevice.timestamp = block.timestamp;
        thisDevice.engage = true;
        thisRequest.req_accept_timestamp = block.timestamp;
        uint amt = thisRequest.hrsStake * thisDevice.tokenRate;
        poolContract.deposit(amt, thisRequest.reqAddress);
    }

    function rejectRequestByProvider(
        uint256 _reqID,
        string memory reason
    ) public isListed(requests[_reqID].devID) {
        Request storage thisRequest = requests[_reqID];
        DeviceDetails storage thisDevice = deviceDetails[thisRequest.devID];
        require(
            msg.sender == thisRequest.deviceOwner,
            "You are not the owner of the device"
        );
        require(
            thisDevice.engage == false,
            "The provider is already busy, no resources available."
        );
        require(!thisRequest.request_end, "Request successfully completed ");
        thisRequest.cancelRequest = true;
        thisRequest.cancelReason = reason;
    }

    function cancelRequest(uint _requestID) external {
        Request storage thisRequest = requests[_requestID];
        require(
            thisRequest.reqAddress == msg.sender,
            "You are not the requestor"
        );
        require(!thisRequest.cancelRequest, "Request Already Cancled");
        thisRequest.cancelRequest = true;
    }

    event EarnedRewardByProvider(uint256 indexed Reward);

    function TransferEarnedTokenToProvider(
        uint256 _deviceid,
        uint256 _requestID
    ) external {
        Request storage thisRequest = requests[_requestID];
        DeviceDetails storage thisDevice = deviceDetails[_deviceid];
        bool requestStatus = thisRequest.engage;
        require(!requestStatus, "Device still in use");
        require(
            thisDevice.recipient == msg.sender,
            "You are not the owner of the devce"
        );
        uint256 lastOfTimestampArry = (thisRequest.paid_token_timestamps)
            .length - 1;
        uint256 timeElapsed = block.timestamp -
            thisRequest.paid_token_timestamps[lastOfTimestampArry];
        uint256 reward = (timeElapsed * thisDevice.tokenRate) / 3600;

        uint rewardProvider = rewardEarnedByProvider[msg.sender];
        require(rewardProvider > 0, "Reward already withdrawn or not earned");
        rewardEarnedByProvider[msg.sender] = 0;
        poolContract.transferFromContract(rewardProvider, msg.sender, true);
        thisRequest.paid_tokens_array.push(reward);
        thisRequest.paid_token_timestamps.push(block.timestamp);
        Requestor storage thisRequestor = requestors[thisRequest.reqAddress];
        thisRequestor.paidTokensTotal = thisRequestor.paidTokensTotal - reward;
        emit EarnedRewardByProvider(reward);
    }

    function claculateReward(
        uint256 _deviceid,
        uint256 _requestid
    ) internal returns (uint) {
        DeviceDetails storage thisDevice = deviceDetails[_deviceid];
        address provider = thisDevice.recipient;
        Request storage thisRequest = requests[_requestid];
        uint256 lastOfTimestampArry = (thisRequest.paid_token_timestamps)
            .length - 1;
        uint256 timeElapsed = block.timestamp -
            thisRequest.paid_token_timestamps[lastOfTimestampArry];
        uint256 reward = (timeElapsed * thisDevice.tokenRate) / 3600;

        rewardEarnedByProvider[provider] =
            rewardEarnedByProvider[provider] +
            reward;
        console.log("reward=", reward);
        return reward;
    }

    function TransferTokenFromRequestorInternal(
        uint256 _requestorID
    ) public view returns (uint256) {
        Request storage thisRequest = requests[_requestorID];
        DeviceDetails storage thisDevice = deviceDetails[thisRequest.devID];
        uint256 timeElapsed = block.timestamp -
            thisRequest.req_accept_timestamp;
        uint256 noOfHours = timeElapsed / 3600;
        uint256 leftHours = thisRequest.hrsStake - noOfHours;
        uint256 refund = leftHours * thisDevice.tokenRate;

        return (refund);
    }

    event RewardEarned(
        uint256 indexed tokensByProvider,
        uint256 indexed tokenByRequestor
    );

    function WithdrawDeviceUsebyRequestor(
        uint256 _deviceID,
        uint256 _reqID
    ) public {
        Request storage thisRequest = requests[_reqID];
        require(
            msg.sender == thisRequest.reqAddress,
            "You are not the requestor of this device"
        );
        DeviceDetails storage thisDevice = deviceDetails[_deviceID];
        Provide storage newProvide = providers[thisDevice.recipient];

        require(
            thisRequest.devID == _deviceID,
            "This device doesn't belong to you."
        );
        // uint256 providerToken = TransferTokenToProviderInternal(
        //     _deviceID,
        //     _reqID
        // );
        // uint256 requestorToken = TransferTokenFromRequestorInternal(_reqID);

        thisRequest.engage = false;
        thisRequest.request_end = true;
        thisDevice.engage = false;
        uint reward = claculateReward(_deviceID, _reqID);
        uint amt = thisRequest.hrsStake * thisDevice.tokenRate;
        if (amt > reward) {
            console.log("true");
            poolContract.transferFromContract(
                amt - reward,
                thisRequest.reqAddress,
                false
            );
        }
        for (uint i = 0; i < newProvide.reqDetailsPerDevice.length; i = i + 3) {
            uint devid = newProvide.reqDetailsPerDevice[i];
            uint reqid = newProvide.reqDetailsPerDevice[i + 1];
            if (devid == _deviceID && reqid == _reqID) {
                newProvide.reqDetailsPerDevice[i] = 0;
                newProvide.reqDetailsPerDevice[i + 1] = 0;
                newProvide.reqDetailsPerDevice[i + 2] = 0;
            }
        }
    }

    function TransferTokenToRequestor(uint256 _reqID) public {
        Requestor storage thisRequestor = requestors[msg.sender];
        Request storage thisRequest = requests[_reqID];
        require(
            thisRequest.request_end == true,
            "The device of the this request has not ended"
        );
        thisRequestor.paidTokensTotal = 0;
    }

    function changeOwner(address _owner) external onlyOwner {
        owner = _owner;
    }
}
