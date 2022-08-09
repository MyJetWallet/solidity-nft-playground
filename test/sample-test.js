const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber, Contract } = require('ethers');
const { SignerWithAddress } = require('@nomiclabs/hardhat-ethers/dist/src/signer-with-address');
const { solidity } = require('ethereum-waffle');

describe("Deploy token and check ", function () {
  it("Should deploy token with constructor args", async function () {
    const [signer, receiver] = await ethers.getSigners();
    const SimplToken = await ethers.getContractFactory("SimplNft");
    const token = await SimplToken.deploy("SimplNft", "SMPLT");
    
    await token.deployed();

    const name = await token.name();
    const symbol = await token.symbol();

    var transferTx = await token.mintToken(receiver.address, "some-address-uri.com");
    var receipt = await transferTx.wait();
    var expectedId = BigNumber.from("1");
    for (const event of receipt.events) {
      console.log(`Event ${event.event} with args ${event.args}`);
      expect(event.args[1]).to.equal(receiver.address);
      expect(event.args[2].eq(expectedId)).to.equal(true)
    }


    var tokenUri = await token.tokenURI(expectedId);
    console.log(tokenUri);

    expect(tokenUri).to.equal("ipfs://some-address-uri.com");
    expect(name).to.equal("SimplNft");
    expect(symbol).to.equal("SMPLT");
  });
});

