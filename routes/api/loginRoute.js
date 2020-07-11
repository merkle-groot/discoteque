const express = require("express");
const fetch = require('node-fetch');
var Web3 = require('web3')
var Contract = require('web3-eth-contract');
var Tx = require('ethereumjs-tx');
var md5 = require('md5');
const User = require("../../models/User");

// infura config
const rpcURL = "https://goerli.infura.io/v3/3807691b19f247bf8de7b5822c31fb24";
var web3 = new Web3(rpcURL);
Contract.setProvider(rpcURL);
let secret = "fd256cc4d94d265f586e54d32d3edf9f";
let key = "c0f9dd56d9162c4cc8ff1e8351596806";



const router = express.Router();

router.get("/", async(req,res)=>{
    // res.json("loading");
    let token = req.query.token;
    let hash = await md5(`api_key${key}methodauth.getSessiontoken${token}${secret}`);
    let result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${key}&api_sig=${hash}&format=json`);
    let jsonData = await result.json();
    console.log(jsonData["session"]);
    const newUser = new User({
        name:jsonData["session"]["name"],
        sessionToken:jsonData["session"]["key"]
    });
    newUser.save()
    res.redirect(`http://localhost:3000/loginStepper/${jsonData["session"]["name"]}/${jsonData["session"]["key"]}`);
})


router.get("/user/", (req,res)=>{
        User.find({name: req.query.user})
            .then(items => res.json(items[0]["sessionToken"]))
})

router.get("/verify/", async(req,res)=>{
    //decrypt account
    const account = "0x53f662093C014EC343480438e161bb33Beae0952";
    const contractABI = [{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressLUT","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sizeOfLUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"string","name":"username","type":"string"},{"internalType":"uint256","name":"coolOffTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"verifiedUser","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_userAddress","type":"address"}],"name":"verifyUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    const contractAddress = "0x16163eA3B90c575f284c7358e79739478a4c9b2A";

    //init contract
    var contract = new Contract(contractABI,contractAddress);

    //vote2 function ABI
    const myData = contract.methods.verifyUser(req.query.user,req.query.account).encodeABI();
    console.log(myData)

    // transaction count
    const transactionCount = await web3.eth.getTransactionCount(account);
    console.log(transactionCount);

    // Transaction Object
    const txObject = {
        nonce:    web3.utils.toHex(transactionCount),
        to:       contractAddress,
        value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        data: myData  
    }

    // sign
    const tx = new Tx.Transaction(txObject, {chain:'goerli', hardfork: 'petersburg'});
    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
    console.log(raw);

    // Broadcast the transaction
    res.json(raw);

})

module.exports = router;