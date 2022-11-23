const { task, types } = require('hardhat/config');
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const fs = require("fs");
const { parse } = require("csv-parse");

require("@nomiclabs/hardhat-web3");
// install web3 plugin
use(Web3ClientPlugin);

// Task for getting all donater addresses
// Example: npx hardhat deploy --network maticMumbai
// npx hardhat mintNftPoolBatch --network maticMumbai --file-path "C:\Git\MyJetWallet\Service.Nft.Manager\test\NftConsole\bin\Debug\net6.0\file.csv"
task('mintNftPoolBatch', 'mint nft')
  .addParam("filePath", 'FilePath', '', types.string)
  .setAction(async ({ filePath }, { ethers }) => {
    const [signer] = await ethers.getSigners();
    const data = [];

    let x = fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ",",
          columns: true,
          ltrim: true,
        })
      )
      .on("data", function (row) {
        // 👇 push the object row into the array
        //console.log(row);
        data.push(row);
      })
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("end", function () {
        // 👇 log the result array
        console.log("parsed csv data:");
        console.log(data);
      });

    //await x.Promise;
    await sleep(5000);
    console.log(data);

    for (let index = 0; index < data.length; ++index) {
      const item = data[index];
      console.log(`Processing ${item.ContractAddress} ${item.TokenId}`);

      try {
        const SimplNftPool = await ethers.getContractFactory("SimplNftPool");
        const token = await SimplNftPool.attach(item.ContractAddress);
        //var url = web3.utils.asciiToHex(tokenId);
        var url = web3.utils.asciiToHex(item.JsonUrl);
        var mintTx = await token.mint(item.ReceiverAddress, item.TokenId, 1, url);
        var receipt = await mintTx.wait();

        for (const event of receipt.events) {
          console.log(`Event ${event.event} with args ${event.args}`);
        }

        console.log("NFT minted!");
      } catch (error) {
        console.log(error);
        console.log("NFT Failed!");
      }
    }
  });


async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}
module.exports = {};