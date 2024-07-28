import { DataTypes } from "sequelize";
import sequelize from "./../config/database.js";

const UserRoles = sequelize.define('UserRoles', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

export default UserRoles;
