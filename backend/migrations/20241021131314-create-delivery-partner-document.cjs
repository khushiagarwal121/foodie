"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("delivery_partner_documents", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      license_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license_image: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      license_expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      vehicle_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vehicle_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      document_type: {
        type: Sequelize.STRING, // Flexible string type
        allowNull: false,
        validate: {
          isIn: [["PAN Number", "Aadhar Card"]], // Enum-like validation
        },
      },
      document_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_image: {
        type: Sequelize.UUID,
        allowNull: false, // Store file paths or UUIDs to the document images
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "uuid",
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "uuid",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("delivery_partner_documents");
  },
};
