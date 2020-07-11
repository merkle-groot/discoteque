const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get("/",async(req,res)=>{

    let TopArtistRank=0;
    let TopArtistWeeklyRank=0;
    let points;
    let Data = null;
    let name = req.query.user;
    let jsonData = null;
    Data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=nar-d_d-awg&api_key=d83142322b6ff9b66fb411b8cde07431&format=json&limit=10`);
    jsonData = await Data.json();
    
    jsonData["topartists"]["artist"].forEach(artist => {
        if(artist.name==name)
            TopArtistRank = artist["@attr"].rank;
    }); 

    if(TopArtistRank == 0){
        TopArtistRank = 11;
    }

    Data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=nar-d_d-awg&api_key=d83142322b6ff9b66fb411b8cde07431&format=json&limit=10`);
    jsonData = await Data.json();
    // const pretty = await JSON.stringify(jsonData, null, 2);
    
    jsonData["weeklyartistchart"]["artist"].forEach(artist => {
        if(artist.name==name)
            TopArtistWeeklyRank = artist["@attr"].rank;
    });

    if(TopArtistWeeklyRank == 0){
        TopArtistWeeklyRank = 11;
    }

    points = 100 - (parseInt(TopArtistWeeklyRank)+parseInt(TopArtistRank) - 2) * 4;
    res.json(points);
})


module.exports = router;