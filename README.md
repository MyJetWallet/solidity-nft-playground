# Basic Sample Hardhat Project

ENV variables:

```
POLYGON_PRIVATE_KEY - private key for deployer on both networks
INFURA_API_KEY - infura api key for both goerli and mainnet
ALCHEMY_POLYGON_API_KEY - alchemy polygon api key
ALCHEMY_MUMBAI_API_KEY - alchemy mumbai api key
ETHERSCAN_API_KEY - etherscan api key
POLYGONSCAN_API_KEY - polygon scan api key
```

Try running some of the following tasks:

```shell
npm install

// Deploy child erc20 contract (maticMumbai)
npx hardhat deployChild --network maticMumbai --child-manager {childManagerAddress}

npx hardhat verify --network maticMumbai {contractAddress} "SimplToken" "SMPLT" {childManagerAddress}

```

Examples: TODO
