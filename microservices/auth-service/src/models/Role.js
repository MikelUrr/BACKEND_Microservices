import { DataTypes } from "sequelize";
import sequelize from "./../config/database.js";

const Role = sequelize.define('Role', {
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
        allowNull: false,
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
    }
});
Role.associate = models => {
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      as: 'permissions',
      foreignKey: 'role_id'
    });
  };


export default Role;