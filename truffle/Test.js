var Web3 = require('web3')
const Tx = require('ethereumjs-tx');
var jInterface = require("./build/contracts/Factory.json");
var Accounts = require('web3-eth-accounts');
const rpcURL = "https://goerli.infura.io/v3/3807691b19f247bf8de7b5822c31fb24"
var web3 = new Web3(rpcURL);

let contractAddress = "0x482829Ba989fBC368F9A89dFf56cdF4036F39F28";
let abi = jInterface["abi"];

getAccount = async() => {
    account = await web3.eth.accounts.privateKeyToAccount("3d1e49923912999811b49cde8862dc701d7493878ecd9c4e5937c5cb57444843", [ignoreLength = true]);
    var contract = new web3.eth.Contract(abi,contractAddress);
    let add = await contract.methods.owner().call();
    console.log(add);

    web3.eth.getTransactionCount(account.address).then(function(v){
        console.log("Count: "+v);
    })

    const rawTx ={
        // nonce: _hex_nonce,
        // from: account.address,
        // to: contractAddress,
        // gasPrice: _hex_gasPrice,
        gasLimit: web3.utils.toHex(56728),
        to: account.address,
        // gas: _hex_Gas,
        // value: '0x0',
        data: contract.methods.createTokens(2100000000,"Peaches Token","DAD","Peach Pit").encodeABI()
    };

    const tx = new Tx.Transaction(rawTx)
    web3.eth.sendSignedTransaction('0x'+tx.serialize().toString('hex'))
    .on('transactionHash',console.log);
    // let sign = await web3.eth.accounts.signTransaction(rawTx, "3d1e49923912999811b49cde8862dc701d7493878ecd9c4e5937c5cb57444843");
    // console.log(sign);

    // var serializedTx = '0x' + tx.serialize().toString('hex');
    // let transaction = await web3.eth.sendSignedTransaction(serializedTx.toString('hex'))

    // let peaches = await contract.methods.createTokens(2100000000,"Peaches Token","DAD","Peach Pit").send({from:account.address});
    // console.log(peaches)
    // let newaddress = await contract.methods.artistToERC("Peach Pit").call();
    // console.log(newaddress);
}

getAccount();