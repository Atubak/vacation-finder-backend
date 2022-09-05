"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("datapoints", [
      {
        locationId: 1,
        yCoordinate: 51.5070989,
        xCoordinate: -0.0799211,
        name: "Fake Museum",
        category: "museum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        yCoordinate: 51.5090989,
        xCoordinate: -0.0799211,
        name: "Fake Museum",
        category: "museum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        yCoordinate: 51.5100989,
        xCoordinate: -0.0799211,
        name: "Fake Museum",
        category: "museum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        yCoordinate: 51.5060989,
        xCoordinate: -0.0799211,
        name: "Fake Museum",
        category: "museum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
