const express = require('express');
const router = express.Router();
const { Logs } = require('../models');

router.get('/test', (req, res) => res.send('hello'));

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

//******************** (PUT) Allow user to update log by id ********************//
router.put("/update/:id", /*validateSession,*/ function (req, res) {

    const updateLogs = {
        location: req.body.location,
        season: req.body.season,
        stay: req.body.stay,
        food: req.body.food,
        rating: req.body.rating
    };

    const query = { where: { id: req.params.id } };
    // const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Logs.update(updateLogs, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err })); 

});

//******************** (DELETE) Allow user to delete an individual log ********************//
router.delete("/delete/:id", /*validateSession,*/ (req, res) => {
    Logs.destroy({
        where: { id: req.params.id }
        // where: { id: req.params.id, owner_id: req.user.id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.json({error: err}))
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