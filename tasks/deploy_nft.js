const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Example: npx hardhat deployNft --network maticMumbai
// npx hardhat deployNft --network maticMumbai
// npx hardhat verify --network maticMumbai {address} "SimplNft" "SMPLT"
task('deployNft', 'deploy nft')
    .setAction(async ({},{ ethers }) => {
        const [signer] = await ethers.getSigners();

        const SimplToken = await ethers.getContractFactory("SimplNft");
        const token = await SimplToken.deploy("SimplNft", "SMPLT");

        console.log("NFT Token deployed!");
        console.log(token.address);
    });

module.exports = {};