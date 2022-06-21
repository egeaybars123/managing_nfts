// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./SimpleCollectible.sol";

contract SimpleCollectibleFactory {

    event SimpleCollectibleCreated(address contract_address);

    function createCollectibleContract (string memory name, string memory symbol) public {
        SimpleCollectible simpleCollectible = new SimpleCollectible(name, symbol);
        emit SimpleCollectibleCreated(address(simpleCollectible));
    }
}