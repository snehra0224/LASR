const { DataTypes } = require('sequelize');

module.exports = user_scores;

function user_scores(sequelize) {
    const attributes = {
        idString: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true 
        },
        section1_h: {
            type: DataTypes.INTEGER
        },
        section1_c: {
            type: DataTypes.INTEGER
        },
        section2_h: {
            type: DataTypes.INTEGER
        },
        section2_c: {
            type: DataTypes.INTEGER
        },
        section3_h: {
            type: DataTypes.INTEGER
        },
        section3_c: {
            type: DataTypes.INTEGER
        },
        section4_h: {
            type: DataTypes.INTEGER
        },
        section4_c: {
            type: DataTypes.INTEGER
        },
        section5_h: {
            type: DataTypes.INTEGER
        },
        section5_c: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER
        }
    };

    return sequelize.define('User', attributes);
}