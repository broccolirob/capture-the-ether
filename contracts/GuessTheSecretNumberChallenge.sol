pragma solidity ^0.4.21;

/**
@title Guess The Secret Number
@notice Deployed to "0x5cF2092aD19e457a036Ecb06e077d28313f256BD", task 
completed in scripts/guess-random-number.js
 */
contract GuessTheSecretNumberChallenge {
    bytes32 answerHash =
        0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;

    function GuessTheSecretNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (keccak256(n) == answerHash) {
            msg.sender.transfer(2 ether);
        }
    }
}
