import { DataTypes } from "sequelize";
import sequelize from "./../config/database.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    profileId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    contractTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'contract_types',
            key: 'id'
        }
    },
    activeUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            if (!user.userName) {
                user.userName = user.email;
            }
        },
        beforeUpdate: (user) => {
            if (!user.userName) {
                user.userName = user.email;
            }
        },
    },
});

User.associate = models => {
    User.belongsTo(models.ContractType, {
        foreignKey: 'contractTypeId',
        as: 'contractType'
    });
    User.belongsToMany(models.Role, {
        through: 'UserRoles',
        as: 'roles',
        foreignKey: 'userId'
    });
};

export default User;
