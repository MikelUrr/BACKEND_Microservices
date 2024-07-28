import { DataTypes } from "sequelize";
import sequelize from "./../config/database.js";

const ContractType = sequelize.define('ContractType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'contract_types',
    timestamps: false
});

export default ContractType;
