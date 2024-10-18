import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: "user_uuid",
        onDelete: "CASCADE", // Ensure the UserRole is deleted if the associated user is deleted
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: "role_uuid",
        onDelete: "CASCADE", // Ensure the UserRole is deleted if the associated role is deleted
      });
      UserRole.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator", // Alias for the created_by relationship
      });
      UserRole.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updater", // Alias for the updated_by relationship
      });
    }
  }

  UserRole.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", // Name of the User table
          key: "uuid", // Primary key in the User table
        },
        onDelete: "CASCADE",
      },
      role_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "roles", // Name of the Role table
          key: "uuid", // Primary key in the Role table
        },
        onDelete: "CASCADE",
      },
      created_by: {
        type: DataTypes.UUID,
        references: {
          model: "users", // Name of the User table
          key: "uuid", // Primary key in the User table
        },
      },
      updated_by: {
        type: DataTypes.UUID,
        references: {
          model: "users", // Name of the User table
          key: "uuid", // Primary key in the User table
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: true, // Automatically adds createdAt and updatedAt
      createdAt: "created_at", // Custom name for createdAt
      updatedAt: "updated_at", // Custom name for updatedAt
      paranoid: true, // enables soft deletion with deletedAt
      deletedAt: "deleted_at", // custom name for deletedAt
    }
  );
  return UserRole;
};
