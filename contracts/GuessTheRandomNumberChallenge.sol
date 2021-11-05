pragma solidity ^0.4.21;

/**
@title Guess the random number - Capture the Ether - Lotteries 3
@author broccolirob (solver, not author)
@notice Deployed to "0x67efAE83aE60607AF787e53915fBB05AcD5A8d9E", task 
completed in scripts/guess-random-number.js
 */
contract GuessTheRandomNumberChallenge {
    uint8 answer;

    function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
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
