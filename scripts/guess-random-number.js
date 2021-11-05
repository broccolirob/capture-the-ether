const hre = require("hardhat");

async function main() {
  const randomNumber = await hre.ethers.getContractAt(
    "GuessTheRandomNumberChallenge",
    "0x67efAE83aE60607AF787e53915fBB05AcD5A8d9E"
  );

  console.log("isComplete:", await randomNumber.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
