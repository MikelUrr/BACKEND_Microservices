import { DataTypes } from "sequelize";
import sequelize from "./../config/database.js";


const Permission = sequelize.define('Permission', {
    d: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      timestamps: false
    });
  
    Permission.associate = models => {
      Permission.belongsToMany(models.Role, {
        through: 'RolePermissions',
        as: 'roles',
        foreignKey: 'permission_id'
      });
    };

export default Permission;
    