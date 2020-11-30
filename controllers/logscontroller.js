const express = require('express');
const router = express.Router();
const { Logs } = require('../models');

router.get('/test', (req, res) => res.send('hello'));

//******************** (GET) Get all logs ********************//
router.get('/getlogs', (req, res)=>{
    // ADDED to view only logged in user's logs
    let userId = req.user.id
    Logs.findAll({
        //ADDED to view only logged in user's logs
        where: {owner_id: userId}
    })
    .then(logs => res.status(200).json({
        logs: logs,
        message: 'All of Logged in Users Logs Retrieved'
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//******************** (POST) Create a log ********************//
router.post('/createlog', async (req, res)=>{
    try {
        const {location, season, stay, food, rating} = req.body;
                                                                        // ADDED to add owner_id to logs
        let newLog = await Logs.create({location, season, stay, food, rating, owner_id: req.user.id});
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