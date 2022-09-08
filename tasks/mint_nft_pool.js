const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Task for getting all donater addresses
// Example: npx hardhat deploy --network maticMumbai
// npx hardhat mintNftPool --network maticMumbai --nft-address 0x1eE3F66e73fb595925DebC90d663FB4de3fA6d8c --receiver 0x52A6434213a99B03fE1f0C59B33d8EC088A9FB8D --token-id 2 
task('mintNftPool', 'mint nft')
    .addParam("nftAddress", 'Nft contract address', '', types.string)
    .addParam("receiver", 'Receiver address', '', types.string)
    .addParam("tokenId", 'TokenId to mint', '', types.string)
    //.addParam("nftUrl", 'nft url', '', types.string)
    .setAction(async ({nftAddress, receiver, tokenId},{ ethers }) => {
        const [signer] = await ethers.getSigners();

        const SimplNftPool = await ethers.getContractFactory("SimplNftPool");

        const token = await SimplNftPool.attach(nftAddress);
        var url = web3.utils.asciiToHex(tokenId);
        var mintTx = await token.mint(receiver, tokenId, 1, url);
        var receipt = await mintTx.wait();
        
        for (const event of receipt.events) {
          console.log(`Event ${event.event} with args ${event.args}`);
        }

        console.log("NFT minted!");
    });

module.exports = {};