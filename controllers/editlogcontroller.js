const express = require('express');
const validateSession = require('../middleware/validateSession');
const router = express.Router();
const {editLog} = require('../models');


//******************** (PUT) log/update/:id => Allow user to update log by id ********************//
router.put("/update/:id", validateSession, function (req, res) {

    const updateEditLog = {
        location: req.body.location,
        season: req.body.season,
        stay: req.body.stay,
        food: req.body.food,
        rating: req.body.rating
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    editLog.update(updateEditLog, query)
    .then((editlogs) => res.status(200).json(editlogs))
    .catch((err) => res.status(500).json({ error: err })); 

});

//******************** (DELETE) log/delete/:id => Allow user to delete an individual log ********************//
router.delete("/delete/:id", validateSession, (req, res) => {
    editLog.destroy({
        where: { id: req.params.id, owner_id: req.user.id }
    })
    .then(editlog => res.status(200).json(editlog))
    .catch(err => res.json({error: err}))
})

module.exports = router;