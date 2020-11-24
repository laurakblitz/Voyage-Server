const {DataTypes} = require('sequelize');
const db = require('../db');


const editLog = db.define('editlog', {
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
    }
});

module.exports = editLog