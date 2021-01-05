const { DataTypes } = require('sequelize');

module.exports = user_behaviors;

function user_behaviors(sequelize) {
    const attributes = {
        idString: {
            type: DataTypes.STRING, 
            primaryKey: true
        },
        aggression: {
            type: DataTypes.STRING
        },
        violence: {
            type: DataTypes.STRING
        },
        cruelty: {
            type: DataTypes.STRING
        },
        bullying: {
            type: DataTypes.STRING
        },
        intimidation: {
            type: DataTypes.STRING
        },
        destruction_of_property: {
            type: DataTypes.STRING
        },
        lying: {
            type: DataTypes.STRING
        },
        theft: {
            type: DataTypes.STRING
        },
        assault: {
            type: DataTypes.STRING
        },
        battery: {
            type: DataTypes.STRING
        },
        drug_use: {
            type: DataTypes.STRING
        },
        possession_drugs_sell: {
            type: DataTypes.STRING
        },
        breaking_entering: {
            type: DataTypes.STRING
        },
        forgery: {
            type: DataTypes.STRING
        },
        counterfeit_bills: {
            type: DataTypes.STRING
        },
        extortion: {
            type: DataTypes.STRING
        },
        purse_snatching: {
            type: DataTypes.STRING
        },
        physical_fights: {
            type: DataTypes.STRING
        },
        assault_deadly_weapon: {
            type: DataTypes.STRING
        },
        truancy_breaking_curfew: {
            type: DataTypes.STRING
        },
        running_from_home: {
            type: DataTypes.STRING
        },
        cruelty_animals: {
            type: DataTypes.STRING
        },
        forcing_sexual_activity: {
            type: DataTypes.STRING
        },
    };

    return sequelize.define('user_behaviors', attributes);
}