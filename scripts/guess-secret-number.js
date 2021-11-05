const { ethers } = require("hardhat");

async function main() {
  const guessSecret = await ethers.getContractAt(
    "GuessTheSecretNumberChallenge",
    "0x5cF2092aD19e457a036Ecb06e077d28313f256BD"
  );

  const completeCheck = await guessSecret.isComplete();

  if (!completeCheck) {
    const answerHash =
      "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";
    const guess = findUint8Hash(answerHash);
    await guessSecret
      .guess(guess, { value: ethers.utils.parseEther("1") })
      .then((tx) => tx.wait());
  }

  console.log("isComplete:", await guessSecret.isComplete());
}

function findUint8Hash(byte32String) {
  const maxUint8 = 2 ** 8 - 1;
  for (let i = 0; i <= maxUint8; i++) {
    const iHash = ethers.utils.keccak256([i]);
    if (iHash === byte32String) return i;
  }
  throw new Error("No hash found");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
