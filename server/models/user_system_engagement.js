const { DataTypes } = require('sequelize');

module.exports = user_system_engagement;

function user_system_engagement(sequelize) {
    const attributes = {
        idString: {
            type: DataTypes.STRING, 
            primaryKey: true
        },
        foodAssist: {
            type: DataTypes.STRING
        },
        houseAssist: {
            type: DataTypes.STRING
        },
        childWelfare: {
            type: DataTypes.STRING
        },
        foster: {
            type: DataTypes.STRING
        },
        foster_num: {
            type: DataTypes.INTEGER
        },
        j_div: {
            type: DataTypes.STRING
        },
        j_div_num: {
            type: DataTypes.INTEGER
        },
        j_p: {
            type: DataTypes.STRING
        },
        j_p_num: {
            type: DataTypes.INTEGER
        },
        j_short_term: {
            type: DataTypes.STRING
        },
        j_short_term_num: {
            type: DataTypes.INTEGER
        },
        j_long_term: {
            type: DataTypes.STRING
        },
        j_long_term_num: {
            type: DataTypes.INTEGER
        },
        a_div: {
            type: DataTypes.STRING
        },
        a_div_num: {
            type: DataTypes.INTEGER
        },
        a_p: {
            type: DataTypes.STRING
        },
        a_p_num: {
            type: DataTypes.INTEGER
        },
        a_short_term: {
            type: DataTypes.STRING
        },
        a_short_term_num: {
            type: DataTypes.INTEGER
        },
        a_long_term: {
            type: DataTypes.STRING
        },
        a_long_term_num: {
            type: DataTypes.INTEGER
        }
    };
    
    return sequelize.define('user_system_engagement', attributes, {freezeTableName: true});
}