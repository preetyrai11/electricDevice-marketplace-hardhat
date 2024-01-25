// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Token is ERC20 {
    constructor() ERC20("shareToken", "STK") {
        _mint(msg.sender, 5000 * 10 ** decimals());
    }
    function mintToken() external {
        _mint(msg.sender, 5000 * 10 ** decimals());
    }
}




