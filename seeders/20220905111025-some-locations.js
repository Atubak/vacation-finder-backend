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

    await queryInterface.bulkInsert("locations", [
      {
        closestTown: "Amsterdam",
        region: "North-Holland",
        country: "The Netherlands",
        yCoordinate: 52.3681531,
        xCoordinate: 4.9125935,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        closestTown: "London",
        region: "",
        country: "United Kingdom",
        yCoordinate: 51.5080989,
        xCoordinate: -0.0759211,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        closestTown: "Vasco da Gama",
        region: "Goa",
        country: "India",
        yCoordinate: 15.4014241,
        xCoordinate: 73.814987,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        closestTown: "Freetown",
        region: "Western Area",
        country: "Sierra Leone",
        yCoordinate: 8.4972574,
        xCoordinate: -13.2856258,
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
