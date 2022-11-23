const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Task for getting all donater addresses
// Example: npx hardhat deploy --network maticMumbai
// npx hardhat mintNft --network maticMumbai --nft-address 0x294C79F1e431923917EecE75283F473a6CAbCC40 --receiver 0x0148908207510E98b9DAEeBf6DC6757baC259Fc1 --nft-url lol-url.com 
task('mintNft', 'mint nft')
    .addParam("nftAddress", 'Nft contract address', '', types.string)
    .addParam("receiver", 'Receiver address', '', types.string)
    .addParam("nftUrl", 'nft url', '', types.string)
    .setAction(async ({nftAddress, receiver, nftUrl},{ ethers }) => {
        const [signer] = await ethers.getSigners();

        const SimplNft = await ethers.getContractFactory("SimplNft");

        const token = await SimplNft.attach(nftAddress);
        var transferTx = await token.mintToken(receiver, nftUrl);
        var receipt = await transferTx.wait();
        
        for (const event of receipt.events) {
          console.log(`Event ${event.event} with args ${event.args}`);
        }

        console.log("NFT minted!");
    });

module.exports = {};