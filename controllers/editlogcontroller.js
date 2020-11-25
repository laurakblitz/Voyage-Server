const express = require('express');
const validateSession = require('../middleware/validateSession');
const router = express.Router();
const {Logs} = require('../models');

//******************** (PUT) Allow user to update log by id ********************//
router.put("/update/:id", validateSession, function (req, res) {

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
router.delete("/delete/:id", validateSession, (req, res) => {
    Logs.destroy({
        where: { id: req.params.id }
        // where: { id: req.params.id, owner_id: req.user.id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.json({error: err}))
})

module.exports = router;