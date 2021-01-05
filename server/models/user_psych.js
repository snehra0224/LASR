const { DataTypes } = require('sequelize');

module.exports = user_psych;

function user_psych(sequelize) {
    const attributes = {
        idString: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true 
        },
        anxiety: {
            type: DataTypes.STRING
        },
        depression: {
            type: DataTypes.STRING
        },
        conduct_disorder: {
            type: DataTypes.STRING
        },
        IED: {
            type: DataTypes.STRING
        },
        ICD: {
            type: DataTypes.STRING
        },
        PTSD: {
            type: DataTypes.STRING
        },
        MJD: {
            type: DataTypes.STRING
        },
        BD: {
            type: DataTypes.STRING
        },
        PD: {
            type: DataTypes.STRING
        },
        substance: {
            type: DataTypes.STRING
        },
        ADHD: {
            type: DataTypes.STRING
        },
        autism: {
            type: DataTypes.STRING
        },
        insomnia: {
            type: DataTypes.STRING
        },
    };

    return sequelize.define('user_psych', attributes);
}