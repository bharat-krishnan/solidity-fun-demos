// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')
const recovery = require('../private')
const provider = new HDWalletProvider(
    recovery,
    'https://rinkeby.infura.io/v3/82e33adad1ff426989a8ac8dc0e499fd',
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['hello']})
        .send({gas: '1000000', from: accounts[0]})
    
    console.log("contract deployed to ", result.options.address)
    
    provider.engine.stop()
}

deploy();