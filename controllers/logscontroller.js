const express = require('express');
const router = express.Router();
const { Logs } = require('../models');

router.get('/test', (req, res) => res.send('hello'));

//******************** (POST) Create a log ********************//
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

//******************** (GET) Get all logs ********************//
router.get('/getlogs', (req, res)=>{
    Logs.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({
        error: err
    }))
})

// BRAINSTORMING IDEAS FOR ADDITIONAL ENDPOINTS
// //******************** (GET) Get individual logs by id for individual user ********************//
// router.get('/:id', validateSession, (req, res) => {

//     Logs.findOne({
//         where: { id: req.params.id, owner_id: req.user.id }
//     })
//     .then((logs) => res.status(200).json(logs))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //******************** (GET) Get logs by location for an individual user ********************//
// router.get('/location', validateSession, (req, res) => {

//     Logs.findOne({
//         where: { location: req.params.location, owner_id: req.user.id }
//     })
//     .then((logs) => res.status(200).json(logs))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //******************** (GET) Get logs by rating for an individual user ********************//
// router.get('/rating', validateSession, (req, res) => {

//     Logs.findOne({
//         where: { rating: req.params.rating, owner_id: req.user.id }
//     })
//     .then((logs) => res.status(200).json(logs))
//     .catch((err) => res.status(500).json({ error: err }));
// });

module.exports = router;