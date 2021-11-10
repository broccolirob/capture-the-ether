pragma solidity ^0.4.21;

/**
@title Guess the number - Capture the Ether - Lotteries 1
@author broccolirob (solver, not author)
@notice Deployed to "0xCE6159d0A4789Bf0d5B9b7aEbFC911963C246ef9", task 
completed in scripts/guess-number.js
 */
contract GuessTheNumberChallenge {
    uint8 answer = 42;

    function GuessTheNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
