pragma solidity ^0.4.21;

/**
@title Nickname Challenge - Capture the Ether - Warmup 3
@notice Deployed to "0x78648272799C59Dac17BD23d0fF637210c00E1aF", this contract 
is used for verification. The Contract that holds the nicknameOf mapping is 
located at "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee", the task is completed 
via scripts/nickname.js
 */

// Relevant part of the CaptureTheEther contract.
contract CaptureTheEther {
    mapping(address => bytes32) public nicknameOf;

    function setNickname(bytes32 nickname) public {
        nicknameOf[msg.sender] = nickname;
    }
}

// Challenge contract. You don't need to do anything with this; it just verifies
// that you set a nickname for yourself.
contract NicknameChallenge {
    CaptureTheEther cte = CaptureTheEther(msg.sender);
    address player;

    // Your address gets passed in as a constructor parameter.
    function NicknameChallenge(address _player) public {
        player = _player;
    }

    // Check that the first character is not null.
    function isComplete() public view returns (bool) {
        return cte.nicknameOf(player)[0] != 0;
    }
}
