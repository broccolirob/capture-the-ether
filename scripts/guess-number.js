const { ethers } = require("hardhat");

async function main() {
  const guessNum = await ethers.getContractAt(
    "GuessTheNumberChallenge",
    "0xCE6159d0A4789Bf0d5B9b7aEbFC911963C246ef9"
  );

  await guessNum
    .guess(42, { value: ethers.utils.parseEther("1") })
    .then((tx) => tx.wait());

  console.log("isComplete:", await guessNum.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
