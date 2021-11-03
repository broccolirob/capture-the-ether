const hre = require("hardhat");

async function main() {
  const callme = await hre.ethers.getContractAt(
    "CallMeChallenge",
    "0xe2d78CD503847426BEF563aFC9A8b80231a4c4De"
  );

  await callme.callme().then((tx) => tx.wait());

  console.log("isComplete:", await callme.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
