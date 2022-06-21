const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledSimpleCollectibleFactory = require("./build/SimpleCollectibleFactory.json");

const provider = new HDWalletProvider(
    "PRIVATE KEY",
    "PROVIDER LINK"
);

const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledSimpleCollectibleFactory.abi)
    .deploy({
        data: compiledSimpleCollectibleFactory.bytecode
    })
    .send({from: accounts[0], gas: "4000000"});

    console.log("Contract deployed to:", result.options.address);
    provider.engine.stop();

    return result.options.address;
};

export default deploy;
