const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Example: npx hardhat deployNftPool --network maticMumbai
// npx hardhat deployNftPool --network maticMumbai --url https://wallet-api-uat.simple-spot.biz/api/v1/public/nft-market/
// npx hardhat verify --network maticMumbai 0x1eE3F66e73fb595925DebC90d663FB4de3fA6d8c "https://wallet-api-uat.simple-spot.biz/api/v1/public/nft-market/"
task('deployNftPool', 'deploy nft')
    .addParam("url", 'Base url', '', types.string)
    .setAction(async ({url},{ ethers }) => {
        const [signer] = await ethers.getSigners();

        const SimplNftPool = await ethers.getContractFactory("SimplNftPool");
        const token = await SimplNftPool.deploy(url);

        console.log("NFT Pool deployed!");
        console.log(token.address);
    });

module.exports = {};