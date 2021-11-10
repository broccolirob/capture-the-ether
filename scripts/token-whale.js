const { ethers } = require("hardhat");

async function main() {
  const tokenWhale = await ethers.getContractAt(
    "TokenWhaleChallege",
    "0x8CdaB90dE2a1D30047c6Ecc57A9e934262A1a0Ce"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
