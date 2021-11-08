const { ethers } = require("hardhat");

async function main() {
  // const GUESS_BLOCK_NUMBER = 0; // <- REPLACE THIS NUMBER AFTER FIRST RUN!!!
  const GUESS_BLOCK_NUMBER = 11383950;

  const challenge = await ethers.getContractAt(
    "PredictTheBlockHashChallenge",
    "0x5071BE59B0163fDc123063bc7110736f1eC08888"
  );

  if (GUESS_BLOCK_NUMBER === 0) {
    const guess = ethers.constants.HashZero;
    const receipt = await challenge
      .lockInGuess(guess, { value: ethers.utils.parseEther("1") })
      .then((tx) => tx.wait());

    console.log("Replace 'GUESS_BLOCK_NUMBER' with:", receipt.blockNumber);
  } else {
    const currentBlock = await ethers.provider.getBlockNumber();
    const diff = currentBlock - GUESS_BLOCK_NUMBER;
    if (diff >= 256) await challenge.settle().then((tx) => tx.wait());
    else console.log(`You need to wait ${256 - diff} more blocks`);
    console.log("isComplete:", await challenge.isComplete());
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
