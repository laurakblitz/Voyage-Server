const {DataTypes} = require('sequelize');
const db = require('../db');

const Logs = db.define("logs", {
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    season: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stay: {
        type: DataTypes.STRING,
        allowNull: true
    },
    food: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // ADDED to view only logged in user's logs
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Logs