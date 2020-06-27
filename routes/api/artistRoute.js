const express = require("express");
const router = express.Router();

const Artist = require("../../models/Artist");


// @route GET api/artists
// @desc get all items
// @access Public
router.get("/", (req,res)=>{
    Artist.find()
        .sort({name: -1})
        .then(items => res.json(items))
})

router.get("/:id", (req,res)=>{
    Artist.find({_id: req.params.id})
        .then(items => res.json(items))
})


// @route POST api/artists
// @desc add item
// @access Public
router.post("/", (req,res)=>{
    const newItem = new Artist({
        name:req.body.name,
        img:req.body.img,
        contract:req.body.contract,
        desc:req.body.desc,
        lastfmId:req.body.lastfmId
    });

    newItem.save().then(item => res.json(item))
})



module.exports = router;