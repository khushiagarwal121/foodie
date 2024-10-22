import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class DeliveryPartnerDocument extends Model {
    static associate(models) {
      // Define associations here if needed
      DeliveryPartnerDocument.belongsTo(models.DeliveryPartner, {
        foreignKey: "delivery_partner_document_uuid", // Foreign key in this model
        as: "deliveryPartner", // Alias for association
      });
      DeliveryPartnerDocument.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator",
      });
      DeliveryPartnerDocument.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updater",
      });
    }
  }

  DeliveryPartnerDocument.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      // delivery_partner_uuid: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   references: {
      //     model: "delivery_partners", // Foreign key reference
      //     key: "uuid",
      //   },
      // },
      license_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      license_image: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      license_expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      vehicle_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vehicle_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_type: {
        type: DataTypes.STRING, // Using string for flexibility
        allowNull: false,
        validate: {
          isIn: [["PAN Number", "Aadhar Card"]], // Enum-like validation
        },
      },
      document_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document_image: {
        type: DataTypes.UUID,
        allowNull: false, // Store file paths or URLs to the document
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "delivery_partners",
          key: "uuid",
        },
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "delivery_partners",
          key: "uuid",
        },
      },
    },
    {
      sequelize,
      modelName: "DeliveryPartnerDocument",
      tableName: "delivery_partner_documents",
      timestamps: true, // Automatically handle created_at and updated_at
      createdAt: "created_at", // Custom name for createdAt
      updatedAt: "updated_at", // Custom name for updatedAt
      paranoid: true, // Enable soft deletes
      deletedAt: "deleted_at", // Custom name for deletedAt
    }
  );

  return DeliveryPartnerDocument;
};
