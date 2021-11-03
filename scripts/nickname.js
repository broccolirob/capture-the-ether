const hre = require("hardhat");

async function main() {
  const cte = await hre.ethers.getContractAt(
    "CaptureTheEther",
    "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee"
  );

  const nickname = await hre.ethers.getContractAt(
    "NicknameChallenge",
    "0x78648272799C59Dac17BD23d0fF637210c00E1aF"
  );
  const broccolirob = hre.ethers.utils.formatBytes32String("broccolirob");
  await cte.setNickname(broccolirob).then((tx) => tx.wait());

  console.log("isComplete:", await nickname.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
