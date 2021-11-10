pragma solidity ^0.4.21;

/**
@title Call me - Capture the Ether - Warmup 2
@author broccolirob (solver, not author)
@notice Deployed to "0xe2d78CD503847426BEF563aFC9A8b80231a4c4De", task 
completed in scripts/callme.js
 */

contract CallMeChallenge {
    bool public isComplete = false;

    function callme() public {
        isComplete = true;
    }
}
