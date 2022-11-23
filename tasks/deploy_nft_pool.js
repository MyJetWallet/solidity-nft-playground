const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Old address: 0x1eE3F66e73fb595925DebC90d663FB4de3fA6d8c
// Example: npx hardhat deployNftPool --network maticMumbai
// npx hardhat deployNftPool --network maticMumbai --url https://wallet-api-uat.simple-spot.biz/api/v1/public/nft-market/ --name TestCollection
// npx hardhat verify --network maticMumbai 0xD66c9fCBb9e4458c0670eF4B8258D7A4F73ee63F "https://wallet-api-uat.simple-spot.biz/api/v1/public/nft-market/" "TestCollection"
task('deployNftPool', 'deploy nft')
    .addParam("url", 'Base url', '', types.string)
    .addParam("name", 'Name', '', types.string)
    .setAction(async ({url, name},{ ethers }) => {
        const [signer] = await ethers.getSigners();

        const SimplNftPool = await ethers.getContractFactory("SimplNftPool");
        const token = await SimplNftPool.deploy(url, name);

        console.log("Signer!");
        console.log(signer.address);
        console.log("NFT Pool deployed!");
        console.log(token.address);
        console.log("Transaction hash!");
        console.log(token.deployTransaction);
    });

module.exports = {};