const { DataTypes } = require('sequelize');

module.exports = user_phys;

function user_phys(sequelize) {
    const attributes = {
        idString: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true 
        },
        high_bp: {
            type: DataTypes.STRING
        },
        insulin_res: {
            type: DataTypes.STRING
        },
        diabetes: {
            type: DataTypes.STRING
        },
        obesity: {
            type: DataTypes.STRING
        },
        stroke: {
            type: DataTypes.STRING
        },
        cardio: {
            type: DataTypes.STRING
        },
        heart_attack: {
            type: DataTypes.STRING
        },
        preeclampsia: {
            type: DataTypes.STRING
        },
        premature: {
            type: DataTypes.STRING
        },
        low_birth_weight: {
            type: DataTypes.STRING
        }
    };

    return sequelize.define('user_phys', attributes);
}