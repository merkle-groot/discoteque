const { Keccak } = require('sha3');
const web3 = require('web3');
const { ethers } = require("ethers");

const hash = new Keccak(256);

let secret = "Vishnu";
let nonce = 23;


// hash.update(secret+nonce);

// console.log(hash.digest('hex'));


// let string = secret+nonce;
// let stringHex = parseInt(string,16);
// console.log(stringHex);
hash.update(secret+nonce);
let hashy = web3.utils.sha3(secret+nonce);
console.log(hashy)
// let num = parseInt(hashy);
// console.log(num);
// console.log(web3.utils.toAscii(hashy))

// const fetch = require('node-fetch');
// var fs = require('fs');

// name="The Parcels";
// let userName="nar-d_d-awg";
// let api_key="d83142322b6ff9b66fb411b8cde07431";
// let overallPoints = 0;
// let TopArtistRank = 0;
// let TopArtistWeeklyRank =0;


// getTopArtist= async() => {
//     const Data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=nar-d_d-awg&api_key=d83142322b6ff9b66fb411b8cde07431&format=json&limit=10`);
//     const jsonData = await Data.json();
    
//     jsonData["topartists"]["artist"].forEach(artist => {
//         if(artist.name==name)
//             TopArtistRank = artist["@attr"].rank;
//     }); 

//     if(TopArtistRank == 0){
//         TopArtistRank = 11;
//     }
// }

// getWeeklyArtist = async() => {
//     const Data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=nar-d_d-awg&api_key=d83142322b6ff9b66fb411b8cde07431&format=json&limit=10`);
//     const jsonData = await Data.json();
//     const pretty = await JSON.stringify(jsonData, null, 2);
    
//     jsonData["weeklyartistchart"]["artist"].forEach(artist => {
//         if(artist.name==name)
//             TopArtistWeeklyRank = artist["@attr"].rank;
//     });

//     if(TopArtistWeeklyRank == 0){
//         TopArtistWeeklyRank = 11;
//     }

// }

// getPoints = async() => {
//     await getTopArtist();
//     await getWeeklyArtist();
//     console.log(TopArtistRank, TopArtistWeeklyRank);
//     points = 100 - (parseInt(TopArtistWeeklyRank)+parseInt(TopArtistRank) - 2) * 4;
//     console.log(points);
    

// }

// getPoints();
