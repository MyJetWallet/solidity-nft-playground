const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber, Contract } = require('ethers');
const { SignerWithAddress } = require('@nomiclabs/hardhat-ethers/dist/src/signer-with-address');
const { solidity } = require('ethereum-waffle');

describe("Deploy token and check ", function () {
  it("Should deploy token with constructor args", async function () {
    const [signer, receiver] = await ethers.getSigners();
    const SimplNftPool = await ethers.getContractFactory("SimplNftPool");
    const token = await SimplNftPool.deploy("https://lol.com/");

    await token.deployed();

    var expectedId = BigNumber.from("1");
    var oneNft = BigNumber.from("1");
    var url = web3.utils.asciiToHex(expectedId.toString());
    var transferTx = await token.mint(receiver.address, expectedId, oneNft, url);
    var receipt = await transferTx.wait();

    const event = receipt.events[0]
    console.log(`Event ${event.event} with args ${event.args}`);
    expect(event.args[0]).to.equal(signer.address);
    expect(event.args[2]).to.equal(receiver.address);
    expect(event.args[3].eq(expectedId)).to.equal(true);
    expect(event.args[4].eq(oneNft)).to.equal(true);

    var uri = await token.uri(expectedId);

    console.log(uri);

    expect(uri).to.equal("https://lol.com/1");
  });

  it("Should transfer token", async function () {
    const [signer, receiver] = await ethers.getSigners();
    const SimplNftPool = await ethers.getContractFactory("SimplNftPool");
    const token = await SimplNftPool.deploy("https://lol.com/");

    await token.deployed();

    var expectedId = BigNumber.from("1");
    var oneNft = BigNumber.from("1");
    var url = web3.utils.asciiToHex(expectedId.toString());
    var transferTx = await token.mint(signer.address, expectedId, oneNft, url);
    var receipt = await transferTx.wait();

    var transferTx = await token.safeTransferFrom(signer.address, receiver.address, expectedId, oneNft, 0x0);
    console.log(transferTx);
    var receipt = await transferTx.wait();
    console.log(receipt);

    var balance = await token.balanceOf(receiver.address, expectedId);

    expect(balance.eq(oneNft)).to.equal(true);
  });
});

