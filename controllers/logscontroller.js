const express = require('express');
const router = express.Router();
const { Logs } = require('../models');

router.get('/test', (req, res) => res.send('helllo'));

router.post('/createlog', async (req, res)=>{
    try {
        const {location, season, stay, food, rating} = req.body;
        let newLog = await Logs.create({location, season, stay, food, rating});
        res.status(200).json({
            log: newLog,
            message: "Destination Added"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "You will not go to this destination"
        })
    }
})

module.exports = router;