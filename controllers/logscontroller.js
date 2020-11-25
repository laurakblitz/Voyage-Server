const express = require('express');
const router = express.Router();
const { Logs } = require('../models');

router.get('/test', (req, res) => res.send('helllo'));

router.get('/getlogs', (req, res)=>{
    Logs.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({
        error: err
    }))
})

router.post('/createlog', async (req, res)=>{
    try {
        const {location, season, stay, food, rating} = req.body;
        let newLog = await Logs.create({location, season, stay, food, rating});
        res.status(200).json({
            log: newLog,
            message: "Voyage Added!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "You will not go to this destination"
        })
    }
})

module.exports = router;